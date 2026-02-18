import { motion } from 'framer-motion';
import { Facebook, Instagram, Youtube, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ContactSection = () => {
  return (
    <section 
      id="contact" 
      className="min-h-screen flex flex-col items-center justify-center py-24 px-[10%] bg-linear-to-br from-[#0a0a0a] to-[#1a1a1a] snap-start"
    >
      <motion.span 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-accent-green uppercase font-extrabold tracking-[4px] text-[0.7rem] mb-4"
      >
        Reach Out
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-[clamp(2rem,5vw,3rem)] font-extrabold mb-16 text-white"
      >
        Contact Us
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 w-full max-w-7xl">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
        >
          <p className="opacity-60 mb-10 text-lg leading-relaxed">
            For event coverage requests or media inquiries, please fill out the form or use our official channels.
          </p>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-accent-green transition-colors">
                <Mail size={20} className="text-accent-green group-hover:text-white" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1">Email Us</p>
                <p className="font-bold text-lg">media@isipathana.lk</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 mt-4">
              <p className="text-xs uppercase tracking-widest text-white/40 font-bold">Official Socials</p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Youtube].map((Icon, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/50 hover:text-accent-green hover:bg-white/10 hover:scale-110 transition-all duration-300"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-white/3 border border-white/10 backdrop-blur-3xl p-8 sm:p-12 rounded-[2.5rem] flex flex-col gap-5 shadow-2xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input 
            className="bg-white/5 border-white/10 h-14 rounded-2xl px-6 focus-visible:ring-accent-green text-white placeholder:text-white/20" 
            placeholder="Full Name" 
          />
          <Input 
            type="email"
            className="bg-white/5 border-white/10 h-14 rounded-2xl px-6 focus-visible:ring-accent-green text-white placeholder:text-white/20" 
            placeholder="Email Address" 
          />
          <textarea 
            className="bg-white/5 border-white/10 rounded-2xl p-6 min-h-[160px] focus:outline-none focus:ring-2 focus:ring-accent-green text-white placeholder:text-white/20 transition-all" 
            placeholder="How can we help you?" 
          />
          <Button className="h-16 rounded-2xl bg-accent-green hover:opacity-90 text-white font-extrabold uppercase tracking-[2px] text-sm mt-4">
            Send Message
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
