import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || 'apex-secret-change-in-production';

let prisma: PrismaClient | null = null;
function getPrisma(): PrismaClient {
  if (!prisma) prisma = new PrismaClient();
  return prisma;
}

function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = (req as any).cookies?.admin_token || req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    (req as any).admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json());
  app.use(cookieParser());

  // www → non-www canonical redirect
  app.use((req, res, next) => {
    const host = req.headers.host || '';
    if (host.startsWith('www.')) {
      const newHost = host.replace(/^www\./, '');
      return res.redirect(301, `https://${newHost}${req.originalUrl}`);
    }
    next();
  });

  // Security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

    // Serve favicon and manifest from public directory
  app.use(express.static(path.join(__dirname, 'public')));

  // PUBLIC: Blog
  app.get('/api/blog', async (req, res) => {
    try {
      const db = getPrisma();
      const posts = await db.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        select: { id: true, title: true, slug: true, excerpt: true, coverImage: true, createdAt: true },
      });
      res.json(posts);
    } catch { res.json([]); }
  });

  app.get('/api/blog/:slug', async (req, res) => {
    try {
      const db = getPrisma();
      const post = await db.blogPost.findFirst({ where: { slug: req.params.slug, published: true } });
      if (!post) return res.status(404).json({ error: 'Not found' });
      res.json(post);
    } catch { res.status(500).json({ error: 'Server error' }); }
  });

  // PUBLIC: Case Studies
  app.get('/api/case-studies', async (req, res) => {
    try {
      const db = getPrisma();
      const items = await db.caseStudy.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        select: { id: true, title: true, slug: true, industry: true, metrics: true, coverImage: true, createdAt: true },
      });
      res.json(items);
    } catch { res.json([]); }
  });

  app.get('/api/case-studies/:slug', async (req, res) => {
    try {
      const db = getPrisma();
      const item = await db.caseStudy.findFirst({ where: { slug: req.params.slug, published: true } });
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    } catch { res.status(500).json({ error: 'Server error' }); }
  });


  // PUBLIC: Newsletter subscribe
  app.post('/api/newsletter', async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || typeof email !== 'string' || !email.trim()) {
        return res.status(400).json({ error: 'Email is required' });
      }
      const db = getPrisma();
      try {
        await db.newsletterSubscriber.create({ data: { email: email.trim().toLowerCase() } });
        res.json({ success: true });
      } catch (e: any) {
        // Unique constraint = already subscribed — treat as success
        if (e.code === 'P2002') {
          return res.json({ success: true, message: 'Already subscribed' });
        }
        throw e;
      }
    } catch (err) {
      console.error('Newsletter error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // ADMIN: Auth
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const db = getPrisma();
      const admin = await db.adminUser.findUnique({ where: { email } });
      if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
      const valid = await bcrypt.compare(password, admin.passwordHash);
      if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
      const token = jwt.sign({ email: admin.email, id: admin.id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('admin_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'lax' });
      res.json({ success: true, token });
    } catch { res.status(500).json({ error: 'Server error' }); }
  });

  app.post('/api/admin/logout', (req, res) => {
    res.clearCookie('admin_token');
    res.json({ success: true });
  });

  app.get('/api/admin/me', requireAuth, (req, res) => {
    res.json({ admin: (req as any).admin });
  });

  // ADMIN: Blog CRUD
  app.get('/api/admin/blog', requireAuth, async (req, res) => {
    const db = getPrisma();
    const posts = await db.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(posts);
  });

  app.post('/api/admin/blog', requireAuth, async (req, res) => {
    try {
      const db = getPrisma();
      const post = await db.blogPost.create({ data: req.body });
      res.json(post);
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  });

  app.put('/api/admin/blog/:id', requireAuth, async (req, res) => {
    try {
      const db = getPrisma();
      const post = await db.blogPost.update({ where: { id: req.params.id }, data: req.body });
      res.json(post);
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  });

  app.delete('/api/admin/blog/:id', requireAuth, async (req, res) => {
    const db = getPrisma();
    await db.blogPost.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  });

  // ADMIN: Case Studies CRUD
  app.get('/api/admin/case-studies', requireAuth, async (req, res) => {
    const db = getPrisma();
    const items = await db.caseStudy.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(items);
  });

  app.post('/api/admin/case-studies', requireAuth, async (req, res) => {
    try {
      const db = getPrisma();
      const item = await db.caseStudy.create({ data: req.body });
      res.json(item);
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  });

  app.put('/api/admin/case-studies/:id', requireAuth, async (req, res) => {
    try {
      const db = getPrisma();
      const item = await db.caseStudy.update({ where: { id: req.params.id }, data: req.body });
      res.json(item);
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  });

  app.delete('/api/admin/case-studies/:id', requireAuth, async (req, res) => {
    const db = getPrisma();
    await db.caseStudy.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  });

  // Vite / static
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));

    // Dynamic sitemap — includes all published blog posts and case studies from DB
    app.get('/sitemap.xml', async (req, res) => {
      try {
        const db = getPrisma();
        const [blogPosts, caseStudies] = await Promise.all([
          db.blogPost.findMany({ where: { published: true }, select: { slug: true, updatedAt: true }, orderBy: { createdAt: 'desc' } }),
          db.caseStudy.findMany({ where: { published: true }, select: { slug: true, updatedAt: true }, orderBy: { createdAt: 'desc' } }),
        ]);

        const BASE = 'https://theblackapexconsultancy.in';
        const MARKET_SLUGS = ['rise-of-zerodha','rise-of-boat','rise-of-dmart','rise-of-amul','rise-of-fevicol','rise-of-lifebuoy','rise-of-maggi'];

        const staticPages = [
          { loc: BASE + '/',             changefreq: 'weekly',  priority: '1.0' },
          { loc: BASE + '/solutions',    changefreq: 'monthly', priority: '0.8' },
          { loc: BASE + '/about',        changefreq: 'monthly', priority: '0.8' },
          { loc: BASE + '/blog',         changefreq: 'weekly',  priority: '0.7' },
          { loc: BASE + '/case-studies', changefreq: 'weekly',  priority: '0.7' },
          { loc: BASE + '/contact',      changefreq: 'monthly', priority: '0.6' },
        ];

        const blogUrls = blogPosts.map((p: any) => ({
          loc: BASE + '/blog/' + p.slug,
          changefreq: 'monthly',
          priority: '0.6',
          lastmod: p.updatedAt.toISOString().split('T')[0],
        }));

        const marketCaseUrls = MARKET_SLUGS.map((slug: string) => ({
          loc: BASE + '/case-studies/' + slug,
          changefreq: 'monthly',
          priority: '0.7',
        }));

        const clientCaseUrls = caseStudies.map((cs: any) => ({
          loc: BASE + '/case-studies/' + cs.slug,
          changefreq: 'monthly',
          priority: '0.6',
          lastmod: cs.updatedAt.toISOString().split('T')[0],
        }));

        const allUrls: any[] = [...staticPages, ...blogUrls, ...marketCaseUrls, ...clientCaseUrls];

        const urlEntries = allUrls.map((u: any) => {
          const lastmod = u.lastmod ? '\n    <lastmod>' + u.lastmod + '</lastmod>' : '';
          return '  <url>\n    <loc>' + u.loc + '</loc>\n    <changefreq>' + u.changefreq + '</changefreq>\n    <priority>' + u.priority + '</priority>' + lastmod + '\n  </url>';
        }).join('\n');

        const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urlEntries + '\n</urlset>';

        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.send(xml);
      } catch (err) {
        console.error('Sitemap generation error:', err);
        // Fall back to static file if DB unavailable
        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.sendFile(path.join(distPath, 'robots.txt').replace('robots.txt', 'sitemap.xml'));
      }
    });

    // Explicit static routes — safety net so these never hit the SPA fallback
    app.get('/robots.txt', (req, res) => {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.sendFile(path.join(distPath, 'robots.txt'));
    });

    app.get('/og-image.svg', (req, res) => {
      res.setHeader('Content-Type', 'image/svg+xml');
      res.setHeader('Cache-Control', 'public, max-age=604800');
      res.sendFile(path.join(distPath, 'og-image.svg'));
    });

    // SPA fallback — must be last
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log('Server running at http://localhost:' + PORT);
    console.log('Admin panel at http://localhost:' + PORT + '/admin');
  });
}

startServer().catch((err) => { console.error('Error starting server:', err); });
