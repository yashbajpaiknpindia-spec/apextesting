# The Black Apex Consultancy — Website

A modern consulting website built with React + Vite + Express + PostgreSQL.

## Features

- **Frontend**: React 19, Vite, Tailwind CSS v4, Framer Motion, React Router
- **Database**: PostgreSQL via Prisma ORM
- **Admin Panel**: Password-protected CMS at `/admin`
- **Blog**: Dynamic blog posts with markdown content
- **Case Studies**: Portfolio of client transformations
- **SEO**: Full meta tags, favicon set (Google search compatible)
- **Fallback**: Static placeholder content when DB is empty

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment
```bash
cp .env.example .env
# Edit .env with your PostgreSQL credentials
```

### 3. Set up the database
```bash
# Push schema to your PostgreSQL database
npm run db:push

# Generate Prisma client
npm run db:generate

# Seed initial admin user and sample content
npm run db:seed
```

### 4. Run development server
```bash
npm run dev
```

Visit:
- **Site**: http://localhost:3000
- **Blog**: http://localhost:3000/blog
- **Case Studies**: http://localhost:3000/case-studies
- **Admin**: http://localhost:3000/admin

## Admin Panel

Login at `/admin` with the credentials set in your `.env`:
- Default email: `admin@theblackapexconsultancy.com`
- Default password: `changeme123` (change this!)

### Admin Features
- Create / edit / delete blog posts
- Publish / unpublish content
- Create / edit / delete case studies
- Markdown support for blog content
- SEO title + description per post

## Database Schema

```
AdminUser    → id, email, passwordHash, createdAt
BlogPost     → id, title, slug, excerpt, content, coverImage, seoTitle, seoDescription, published, createdAt
CaseStudy    → id, title, slug, industry, problem, solution, results, metrics, coverImage, seoTitle, seoDescription, published, createdAt
```

## API Routes

### Public
- `GET /api/blog` — Published blog posts
- `GET /api/blog/:slug` — Single blog post
- `GET /api/case-studies` — Published case studies
- `GET /api/case-studies/:slug` — Single case study

### Admin (requires cookie auth)
- `POST /api/admin/login` — Login
- `POST /api/admin/logout` — Logout
- `GET  /api/admin/me` — Check auth
- `GET/POST/PUT/DELETE /api/admin/blog/:id`
- `GET/POST/PUT/DELETE /api/admin/case-studies/:id`

## Favicon (Google Search)

Full favicon set at `/public`:
- `favicon.ico` (multi-size: 16×16, 32×32)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180×180)
- `site.webmanifest`

All are referenced in `index.html`. Google picks up the favicon from `/favicon.ico` automatically.

## Deployment

1. Build the frontend: `npm run build`
2. Set `NODE_ENV=production` in environment
3. Run: `node server.js` (or use PM2)
4. Make sure `DATABASE_URL` and `JWT_SECRET` are set

## Environment Variables

See `.env.example` for all required variables.
