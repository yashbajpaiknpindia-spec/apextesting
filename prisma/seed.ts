import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 12);
  
  const admin = await prisma.adminUser.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@theblackapexconsultancy.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@theblackapexconsultancy.com',
      passwordHash,
    },
  });

  console.log('✅ Admin user created:', admin.email);
  console.log('✅ Password:', process.env.ADMIN_PASSWORD || 'admin123');

  // Seed sample blog posts
  const posts = [
    {
      title: 'Scaling Without Chaos',
      slug: 'scaling-without-chaos',
      excerpt: 'How to maintain quality and culture while growing at 10x speeds.',
      content: `# Scaling Without Chaos\n\nGrowth is the dream. But uncontrolled growth is the nightmare that kills more businesses than failure ever does.\n\n## The Problem with Hypergrowth\n\nWhen revenue doubles, most founders assume success. But beneath the surface, chaos compounds. Systems built for 10 clients buckle under 100. Team culture dilutes. Quality slips. The founder, once a visionary, becomes a firefighter.\n\n## The Apex Framework for Clean Scale\n\n1. **Systemize before you scale** - Document every process before hiring for it\n2. **Build decision trees** - Remove yourself from daily decisions through clear SOPs\n3. **Culture is infrastructure** - Your values must be as engineered as your product\n4. **Hire for the next phase** - Bring in people who can handle 3x your current volume\n\n## Conclusion\n\nScaling without chaos is not about slowing down. It's about building the architecture that lets you accelerate safely.`,
      coverImage: '1460925895917-afdab827c52f',
      seoTitle: 'Scaling Without Chaos - The Black Apex Consultancy',
      seoDescription: 'Learn how to maintain quality and culture while growing at 10x speeds with the Apex scaling framework.',
      published: true,
    },
    {
      title: 'Revenue Architecture Explained',
      slug: 'revenue-architecture-explained',
      excerpt: 'The hidden leaks in your pricing model that are costing you millions.',
      content: `# Revenue Architecture Explained\n\nMost founders think of revenue as a result. Elite operators think of it as architecture.\n\n## What is Revenue Architecture?\n\nRevenue architecture is the deliberate design of how money flows into, through, and out of your business. It encompasses pricing strategy, offer structure, upsell paths, retention mechanisms, and the psychology of value perception.\n\n## The 4 Revenue Leaks\n\n1. **Underpriced anchors** - Your entry-level offer sets the ceiling in customers' minds\n2. **Missing mid-tier** - The gap between entry and premium forces customers to leave\n3. **No retention engine** - Acquiring without retaining is pouring water into a sieve\n4. **Value delivery gaps** - Customers who don't see results won't renew or refer\n\n## Building Your Revenue Architecture\n\nStart with the outcome your best client received. Price backward from that transformation. Build offers that serve every stage of the journey.`,
      coverImage: '1551288049-bebda4e38f71',
      seoTitle: 'Revenue Architecture Explained - The Black Apex',
      seoDescription: 'Discover the hidden pricing leaks costing your business millions and how to fix them with strategic revenue architecture.',
      published: true,
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
    console.log('✅ Blog post seeded:', post.title);
  }

  // Seed sample case studies
  const caseStudies = [
    {
      title: 'TechFlow Systems: 2x Revenue in 8 Months',
      slug: 'techflow-systems-2x-revenue',
      industry: 'Technology / SaaS',
      problem: 'TechFlow was growing but chaotically. They had 3 different pricing models running simultaneously, no clear ICP definition, and a sales team operating on intuition rather than process. Churn was at 18% monthly.',
      solution: 'We conducted a full operational audit, unified their pricing architecture around a single high-ticket annual contract model, built a repeatable sales playbook, and implemented a structured onboarding process that reduced time-to-value from 6 weeks to 10 days.',
      results: 'In 8 months, TechFlow doubled MRR from ₹45L to ₹92L. Churn dropped from 18% to 4%. The sales cycle shortened by 40%. The founder stepped out of day-to-day sales entirely.',
      metrics: 'MRR 2x | Churn -78% | Sales Cycle -40%',
      coverImage: '1460925895917-afdab827c52f',
      seoTitle: 'Case Study: TechFlow Systems 2x Revenue - The Black Apex',
      seoDescription: 'How The Black Apex helped TechFlow Systems double revenue in 8 months through strategic pricing and operational restructuring.',
      published: true,
    },
  ];

  for (const cs of caseStudies) {
    await prisma.caseStudy.upsert({
      where: { slug: cs.slug },
      update: {},
      create: cs,
    });
    console.log('✅ Case study seeded:', cs.title);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
