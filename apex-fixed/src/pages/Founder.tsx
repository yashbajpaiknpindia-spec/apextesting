import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Linkedin, Mail, Target, TrendingUp, Award, Users } from 'lucide-react';
import { SectionHeading, Button } from '../components/Common';
import { useSEO } from '../lib/useSEO';

const PILLARS = [
  {
    icon: Target,
    title: 'Precision-First Thinking',
    desc: 'Every engagement begins with a rigorous diagnosis. Vaishnavi believes that strategy built on clarity always outperforms strategy built on assumptions.',
  },
  {
    icon: TrendingUp,
    title: 'Systems Over Hustle',
    desc: 'Her philosophy is simple: scalable results come from scalable systems. She architects businesses that compound — not ones that plateau.',
  },
  {
    icon: Award,
    title: 'Authority Through Execution',
    desc: 'Vaishnavi does not just consult — she executes. Every framework she delivers has been tested against real markets, real clients, and real outcomes.',
  },
  {
    icon: Users,
    title: 'Founder-to-Founder Empathy',
    desc: 'Having built from zero herself, she speaks the language of founders — the uncertainty, the ambition, and the relentless drive to get it right.',
  },
];

const TIMELINE = [
  {
    year: '2019',
    title: 'The Beginning',
    desc: 'Started working with early-stage startups, identifying a critical gap: founders had vision but lacked the structural frameworks to scale it.',
  },
  {
    year: '2021',
    title: 'Pattern Recognition',
    desc: 'After working across industries — from D2C to B2B SaaS — a clear pattern emerged: the businesses that scaled weren\'t the smartest. They were the most structured.',
  },
  {
    year: '2023',
    title: 'The Black Apex Consultancy',
    desc: 'Founded The Black Apex Consultancy with a singular mission: eliminate growth chaos for ambitious founders and build businesses engineered to scale.',
  },
  {
    year: '2024',
    title: 'Scaling the Vision',
    desc: 'Expanded the practice to serve leadership teams across India, with a methodology refined through 100+ engagements and a track record of measurable transformation.',
  },
];

export const Founder = () => {
  useSEO({
    title: 'Vaishnavi Dixit — Founder & CEO',
    description: 'Meet Vaishnavi Dixit, Founder & CEO of The Black Apex Consultancy. An elite business strategist dedicated to helping ambitious founders scale with precision, structure, and intention.',
    canonical: '/founder',
  });

  return (
    <div className="bg-brand-black overflow-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-0 px-6 md:px-12 min-h-screen flex items-end">
        {/* Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-0 items-end">

          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="pb-20 lg:pb-32 pr-0 lg:pr-16"
          >
            <span className="text-brand-gold uppercase tracking-[0.5em] text-[10px] mb-8 block">
              The Architect Behind The Apex
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-brand-white leading-[1.05] mb-6">
              VAISHNAVI<br />
              <span className="text-brand-gold italic">DIXIT</span>
            </h1>

            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-px bg-brand-gold" />
              <span className="text-brand-white/40 text-[10px] uppercase tracking-[0.4em]">Founder & CEO</span>
              <div className="w-8 h-px bg-brand-gold" />
            </div>

            <p className="text-brand-white/65 text-base md:text-lg leading-relaxed font-light max-w-xl mb-10">
              Vaishnavi Dixit founded The Black Apex Consultancy on a belief that the founders
              who win aren't the ones with the best ideas — they're the ones with the best
              systems. She is a business strategist, a precision thinker, and a builder of
              structures that scale.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button href="https://wa.me/919839600646">
                Work With Vaishnavi
              </Button>
              <Button variant="secondary" href="mailto:business@theblackapexconsultancy.in">
                Send a Message
              </Button>
            </div>

            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 border border-brand-divider hover:border-brand-gold flex items-center justify-center text-brand-white/30 hover:text-brand-gold transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:business@theblackapexconsultancy.in"
                aria-label="Email"
                className="w-10 h-10 border border-brand-divider hover:border-brand-gold flex items-center justify-center text-brand-white/30 hover:text-brand-gold transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right — Founder Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
            className="relative flex justify-center lg:justify-end items-end"
          >
            {/* Decorative frame */}
            <div className="absolute bottom-0 right-0 w-[85%] h-[90%] border border-brand-gold/15" />
            <div className="absolute bottom-4 right-4 w-[85%] h-[90%] border border-brand-gold/08" />

            {/* Gold corner accents */}
            <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-brand-gold/50" />
            <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-brand-gold/50" />

            <div className="relative z-10 w-full max-w-md">
              <img
                src="/vaishnavi-dixit.jpeg"
                alt="Vaishnavi Dixit — Founder & CEO, The Black Apex Consultancy"
                className="w-full object-cover object-top"
                style={{ maxHeight: '80vh', minHeight: '500px' }}
              />
              {/* Gradient fade at top */}
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brand-black to-transparent" />
              {/* Name card overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brand-black via-brand-black/80 to-transparent">
                <p className="text-brand-gold text-[9px] uppercase tracking-[0.5em] mb-1">Founder & CEO</p>
                <p className="text-brand-white font-serif text-xl">Vaishnavi Dixit</p>
                <p className="text-brand-white/40 text-[10px] mt-1">The Black Apex Consultancy</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Philosophy / Stats Strip ─────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 bg-brand-rich-black border-y border-brand-divider">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-12 md:gap-0 md:justify-between items-center">
          {[
            { val: '100+', lbl: 'Businesses Structured' },
            { val: '5+', lbl: 'Years of Precision Strategy' },
            { val: '10X', lbl: 'Avg. Scale Potential Unlocked' },
            { val: '₹0', lbl: 'Raised. All Organic Growth' },
          ].map((s, i) => (
            <motion.div
              key={s.lbl}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-serif text-brand-gold mb-2">{s.val}</div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-brand-white/35">{s.lbl}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── The Four Pillars ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-brand-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="The Philosophy"
            subtitle="Four principles that define how Vaishnavi thinks and builds"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 border border-brand-divider hover:border-brand-gold transition-all duration-500 flex gap-8"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 border border-brand-gold/30 group-hover:border-brand-gold flex items-center justify-center transition-all duration-300">
                    <p.icon className="w-5 h-5 text-brand-gold" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-serif text-brand-white mb-3 group-hover:text-brand-gold transition-colors">{p.title}</h3>
                  <p className="text-brand-white/45 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-brand-rich-black">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title="The Journey"
            subtitle="From pattern recognition to building the Apex"
          />
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[3.25rem] top-0 bottom-0 w-px bg-brand-divider hidden md:block" />
            <div className="space-y-12">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="flex gap-8 items-start"
                >
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-[6.5rem] text-right">
                      <span className="text-brand-gold font-serif text-lg">{item.year}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 hidden md:flex flex-col items-center pt-1.5">
                    <div className="w-3 h-3 rounded-full border-2 border-brand-gold bg-brand-rich-black relative z-10" />
                  </div>
                  <div className="pb-4">
                    <h4 className="text-brand-white font-serif text-base mb-2">{item.title}</h4>
                    <p className="text-brand-white/45 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Full Bio Section ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-brand-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left — Portrait thumbnail */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative"
          >
            <div className="absolute -inset-3 border border-brand-gold/10" />
            <div className="absolute top-3 left-3 w-full h-full border border-brand-gold/05" />
            <img
              src="/vaishnavi-dixit.jpeg"
              alt="Vaishnavi Dixit portrait"
              className="relative z-10 w-full object-cover object-top"
              style={{ maxHeight: '560px' }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-black to-transparent z-20" />
          </motion.div>

          {/* Right — Bio text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] mb-6 block">
              In Her Own Words
            </span>
            <h2 className="text-3xl md:text-4xl font-serif mb-10 leading-tight">
              "I BUILT THIS FOR THE <span className="text-brand-gold italic">FOUNDER</span> I WISH I HAD SUPPORT FOR."
            </h2>
            <div className="space-y-5 text-brand-white/60 text-sm leading-relaxed font-light">
              <p>
                Before The Black Apex Consultancy existed, Vaishnavi sat across from founders who
                were brilliant, driven, and quietly drowning. They had customers, momentum, and
                ambition — but no system. No structure. No clarity on where the next ₹1 crore
                would come from, or why the last one hadn't stayed.
              </p>
              <p>
                She saw the same pattern repeat: businesses that scaled weren't always the most
                innovative. They were the most structured. The founders who won weren't necessarily
                the smartest in the room — they were the ones who stopped building on instinct alone
                and started building on architecture.
              </p>
              <p>
                That insight became the foundation of The Black Apex Consultancy. A practice built
                not on advice, but on architecture. Not on theory, but on precision frameworks
                that have been tested, refined, and proven across industries.
              </p>
              <p>
                Today, Vaishnavi works directly with founders and leadership teams to do one thing:
                replace growth chaos with growth infrastructure. The result is businesses that don't
                just grow — they compound.
              </p>
            </div>

            <div className="mt-12 pt-10 border-t border-brand-divider">
              <div className="flex flex-col sm:flex-row gap-6">
                <Button href="https://wa.me/919839600646">
                  Start a Conversation
                </Button>
                <Link
                  to="/about"
                  className="text-brand-gold text-[10px] uppercase tracking-[0.3em] inline-flex items-center gap-2 hover:gap-4 transition-all self-center"
                >
                  Learn About The Firm <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-brand-rich-black text-center border-t border-brand-divider">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-gold uppercase tracking-[0.5em] text-[10px] mb-6 block">
              Ready to Build?
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">
              WORK DIRECTLY WITH <span className="text-brand-gold italic">VAISHNAVI</span>
            </h2>
            <p className="text-brand-white/55 mb-12 text-base leading-relaxed font-light max-w-xl mx-auto">
              Every engagement with The Black Apex Consultancy is led personally by Vaishnavi.
              No junior consultants. No diluted attention. Just precision strategy, delivered directly.
            </p>
            <Button href="https://wa.me/919839600646" className="mx-auto">
              Book Your Strategy Audit
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
