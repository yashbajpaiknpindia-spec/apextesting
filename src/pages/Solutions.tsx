import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { SectionHeading, Button } from '../components/Common';
import { useSEO } from '../lib/useSEO';

const SOLUTIONS_DATA = [
  {
    title: 'Apex Strategy Suite',
    description: 'The foundational blueprint for market dominance and sustainable growth.',
    items: ['Business blueprinting', 'Growth roadmap', 'Competitive positioning', 'Capital efficiency planning']
  },
  {
    title: 'Operational Excellence & Systems',
    description: 'Building the internal engine that allows your business to scale without friction.',
    items: ['Operational audits', 'Workflow streamlining', 'Bottleneck removal', 'Scaling infrastructure']
  },
  {
    title: 'Brand & Market Authority',
    description: 'Establishing your firm as the undisputed leader in your industry.',
    items: ['Founder positioning', 'Premium brand building', 'Reputation systems', 'High-ticket positioning']
  }
];

export const Solutions = () => {
  useSEO({
    title: 'Solutions — Revenue Architecture & Business Strategy',
    description: 'Discover our elite consulting solutions: revenue architecture, operational excellence, and precision growth strategy for ambitious founders.',
    canonical: '/solutions',
  });
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="Our Solutions" 
          subtitle="Tailored ecosystems for high-performance businesses" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SOLUTIONS_DATA.map((sol, idx) => (
            <motion.div 
              key={sol.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-brand-rich-black p-10 border border-brand-divider flex flex-col group hover:border-brand-gold transition-all duration-500"
            >
              <h3 className="text-xl font-serif mb-4 text-brand-gold">{sol.title}</h3>
              <p className="text-brand-white/50 text-xs mb-8 leading-relaxed">{sol.description}</p>
              <ul className="space-y-4 mb-12 flex-grow">
                {sol.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-xs text-brand-white/60">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" href="https://wa.me/919839600646">
                Inquire Now
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Detailed Solutions Section */}
        <div className="mt-32 space-y-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Strategic Architecture</h2>
              <p className="text-brand-white/60 text-sm leading-relaxed mb-8">
                We don't just give advice; we build the roadmap. Our strategic architecture involves a deep dive into your business model, identifying revenue leaks, and designing a path to exponential growth.
              </p>
              <ul className="space-y-4">
                {['Market Gap Analysis', 'Revenue Stream Diversification', 'Pricing Optimization', 'Exit Strategy Planning'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-xs text-brand-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-video bg-brand-divider overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000" 
                alt="Strategy" 
                className="w-full h-full object-cover grayscale brightness-75"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Operational Integrity</h2>
              <p className="text-brand-white/60 text-sm leading-relaxed mb-8">
                Scaling requires a rock-solid foundation. We audit your current workflows, eliminate inefficiencies, and implement the systems that allow your team to perform at their peak.
              </p>
              <ul className="space-y-4">
                {['Process Automation', 'SOP Development', 'Resource Allocation', 'Performance Metrics'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-xs text-brand-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-video bg-brand-divider overflow-hidden lg:order-1"
            >
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" 
                alt="Operations" 
                className="w-full h-full object-cover grayscale brightness-75"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
