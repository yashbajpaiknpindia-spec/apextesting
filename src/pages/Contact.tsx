import { useSEO } from '../lib/useSEO';
import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, Linkedin, Facebook, Instagram } from 'lucide-react';
import { SectionHeading, Button } from '../components/Common';

const BUSINESS = {
  phone: '+91 9839600646',
  whatsapp: 'https://wa.me/919839600646',
  email: 'business@theblackapexconsultancy.in',
  linkedin: 'https://www.linkedin.com/company/the-black-apex-consultancy/',
  facebook: 'https://www.facebook.com/share/1CW5ZXtsXc/',
  instagram: 'https://www.instagram.com/theblackapexconsultancy?igsh=emJrNDdiM2IycWJr',
  additionalPhones: ['+91 630749 6463', '+91 94513 68275']
};

export const Contact = () => {
  useSEO({
    title: 'Contact — Start Your Transformation',
    description: 'Ready to scale with precision? Get in touch with The Black Apex Consultancy to begin your business transformation journey.',
    canonical: '/contact',
  });
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="Initiate the Ascent" 
          subtitle="Ready to architect your business for the next level?" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-serif mb-8">CONTACT <br /> OUR <span className="text-brand-gold italic">STRATEGY TEAM</span></h2>
            <p className="text-brand-white/60 mb-12 max-w-md text-sm leading-relaxed">
              For confidential inquiries regarding our strategy suites, operational audits, or brand positioning services, please reach out via the following channels.
            </p>

            <div className="space-y-8">
              <div className="flex flex-col gap-8">
                <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-brand-divider flex items-center justify-center group-hover:border-brand-gold transition-colors">
                    <Phone className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-brand-white/40 mb-1">Primary Call / WhatsApp</p>
                    <p className="text-brand-white group-hover:text-brand-gold transition-colors">{BUSINESS.phone}</p>
                  </div>
                </a>
                {BUSINESS.additionalPhones.map(num => (
                  <a key={num} href={`tel:${num.replace(/\s/g, '')}`} className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-full border border-brand-divider flex items-center justify-center group-hover:border-brand-gold transition-colors">
                      <Phone className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-brand-white/40 mb-1">Additional Contact</p>
                      <p className="text-brand-white group-hover:text-brand-gold transition-colors">{num}</p>
                    </div>
                  </a>
                ))}
              </div>
              <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full border border-brand-divider flex items-center justify-center group-hover:border-brand-gold transition-colors">
                  <Mail className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-brand-white/40 mb-1">Email Us</p>
                  <p className="text-brand-white group-hover:text-brand-gold transition-colors">{BUSINESS.email}</p>
                </div>
              </a>
            </div>

            <div className="flex gap-6 mt-16">
              <a href={BUSINESS.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-brand-divider flex items-center justify-center text-brand-white hover:text-brand-gold hover:border-brand-gold transition-all bg-brand-rich-black rounded-lg shadow-lg"><Linkedin className="w-5 h-5" /></a>
              <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-brand-divider flex items-center justify-center text-brand-white hover:text-brand-gold hover:border-brand-gold transition-all bg-brand-rich-black rounded-lg shadow-lg"><Facebook className="w-5 h-5" /></a>
              <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-brand-divider flex items-center justify-center text-brand-white hover:text-brand-gold hover:border-brand-gold transition-all bg-brand-rich-black rounded-lg shadow-lg"><Instagram className="w-5 h-5" /></a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-brand-rich-black p-10 border border-brand-divider"
          >
            <form 
              className="space-y-6" 
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                const name = formData.get('name') as string || 'Not provided';
                const email = formData.get('email') as string || 'Not provided';
                const company = formData.get('company') as string || 'Not provided';
                const message = formData.get('message') as string || 'Not provided';
                
                const whatsappMessage = `New Website Enquiry\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nMessage: ${message}`;
                const encodedMessage = encodeURIComponent(whatsappMessage);
                const whatsappUrl = `https://wa.me/${BUSINESS.phone.replace(/\+/g, '').replace(/\s/g, '')}?text=${encodedMessage}`;
                
                window.open(whatsappUrl, '_blank');
                form.reset();
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-brand-white/40">Full Name</label>
                  <input name="name" required type="text" className="w-full bg-brand-black border border-brand-divider p-4 text-brand-white focus:border-brand-gold outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-brand-white/40">Email Address</label>
                  <input name="email" required type="email" className="w-full bg-brand-black border border-brand-divider p-4 text-brand-white focus:border-brand-gold outline-none transition-colors" placeholder="john@company.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-white/40">Company Name</label>
                <input name="company" type="text" className="w-full bg-brand-black border border-brand-divider p-4 text-brand-white focus:border-brand-gold outline-none transition-colors" placeholder="Acme Corp" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-white/40">Message</label>
                <textarea name="message" required rows={4} className="w-full bg-brand-black border border-brand-divider p-4 text-brand-white focus:border-brand-gold outline-none transition-colors" placeholder="How can we help you scale?"></textarea>
              </div>
              <Button type="submit" className="w-full">
                Send Inquiry
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
