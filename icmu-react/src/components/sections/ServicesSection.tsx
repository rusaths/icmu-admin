import { motion } from 'framer-motion';
import { Video, Camera, FileAudio } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: <Video className="w-8 h-8 text-accent-green" />,
      title: 'Live Streaming',
      desc: 'Multi-camera 4K coverage for sports meets, award ceremonies, and concerts.'
    },
    {
      icon: <Camera className="w-8 h-8 text-accent-green" />,
      title: 'Event Photography',
      desc: 'Professional photography capturing high-speed action and candid school moments.'
    },
    {
      icon: <FileAudio className="w-8 h-8 text-accent-green" />,
      title: 'Sound Engineering',
      desc: 'Crystal clear audio management for outdoor and indoor college events.'
    }
  ];

  return (
    <section 
      id="services" 
      className="min-h-screen flex flex-col items-center justify-center py-24 px-[10%] bg-[#050505] snap-start relative"
    >
      <motion.span 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-accent-green uppercase font-extrabold tracking-[4px] text-[0.7rem] mb-4"
      >
        What We Do
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-[clamp(2rem,5vw,3rem)] font-extrabold mb-16 text-white"
      >
        Services
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="group bg-linear-to-br from-white/5 to-white/1 border border-white/10 backdrop-blur-md p-10 rounded-3xl transition-all duration-500 hover:translate-y-[-10px] hover:bg-accent-green/5 hover:border-accent-green/40 shadow-2xl"
          >
            <div className="mb-6 group-hover:scale-110 transition-transform duration-500">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold mb-4 tracking-wide text-white">{service.title}</h3>
            <p className="opacity-60 text-[0.9rem] leading-relaxed font-medium">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
