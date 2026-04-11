import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../components/Common';
import { useSEO } from '../lib/useSEO';

export const About = () => {
  useSEO({
    title: 'About Us — Elite Strategy Team',
    description: 'Meet the minds behind The Black Apex Consultancy. We are a collective of elite strategists dedicated to transforming ambitious businesses.',
    canonical: '/about',
  });
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="Our Story" 
          subtitle="The architects of business success" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] mb-4 block">Our Philosophy</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif mb-8 leading-[1.1]">
              WE EXIST TO <br /> ELIMINATE <br /> <span className="text-brand-gold italic">GROWTH CHAOS</span>
            </h2>
            <div className="space-y-6 text-brand-white/60 text-sm leading-relaxed font-light">
              <p>
                The Black Apex Consultancy was founded on a singular premise: that growth without systems is merely a prelude to collapse. We don't just provide advice; we architect the very infrastructure of your success.
              </p>
              <p>
                Our mission is to empower visionaries with the structural integrity required to scale. We believe in precision over volume, and execution over theory. Our vision is to be the silent engine behind the next generation of market leaders.
              </p>
              <p>
                In an era of noise, we provide the signal. We are the partners for those who seek the apex of their industry.
              </p>
            </div>
            <div className="mt-10 flex gap-12">
              <div>
                <div className="text-3xl font-serif text-brand-gold mb-1">10X</div>
                <div className="text-[10px] uppercase tracking-widest text-brand-white/40">Scale Potential</div>
              </div>
              <div>
                <div className="text-3xl font-serif text-brand-gold mb-1">100+</div>
                <div className="text-[10px] uppercase tracking-widest text-brand-white/40">Systems Built</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 border border-brand-gold/20 rounded-full animate-pulse" />
            <img 
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=2071" 
              alt="Founder" 
              className="w-full aspect-square object-cover grayscale brightness-75 border border-brand-divider"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 right-6 bg-brand-gold p-6 text-brand-black max-w-[200px]">
              <p className="text-[10px] uppercase font-bold tracking-widest mb-2">The Apex Vision</p>
              <p className="text-xs italic">"Strategy is not a document; it is a living system."</p>
            </div>
          </motion.div>
        </div>

        {/* Vision & Values */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 border border-brand-divider hover:border-brand-gold transition-all duration-500"
          >
            <h3 className="text-xl font-serif mb-4 text-brand-gold">Our Vision</h3>
            <p className="text-brand-white/50 text-xs leading-relaxed">
              To be the global standard for business scaling and operational excellence, empowering the next generation of market-leading companies.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 border border-brand-divider hover:border-brand-gold transition-all duration-500"
          >
            <h3 className="text-xl font-serif mb-4 text-brand-gold">Our Mission</h3>
            <p className="text-brand-white/50 text-xs leading-relaxed">
              To provide founders with the strategic precision and structural integrity required to transform ambitious visions into high-performance realities.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 border border-brand-divider hover:border-brand-gold transition-all duration-500"
          >
            <h3 className="text-xl font-serif mb-4 text-brand-gold">Our Values</h3>
            <p className="text-brand-white/50 text-xs leading-relaxed">
              Precision, Integrity, Execution, and Growth. We believe in doing the hard work of building systems that actually work.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
