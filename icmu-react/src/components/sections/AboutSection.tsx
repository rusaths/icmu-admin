import { motion } from 'framer-motion';

const AboutSection = () => {
  const fadeInUpInitial = { opacity: 0, y: 30 };
  const fadeInUpInView = { opacity: 1, y: 0 };
  const fadeInUpViewport = { once: true };

  return (
    <section 
      id="about" 
      className="min-h-screen flex flex-col items-center justify-center py-24 px-[10%] bg-gradient-to-b from-[#04120b] to-[#050505] snap-start relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-accent-green/10 blur-[150px] pointer-events-none" />
      
      <div className="max-w-5xl w-full flex flex-col items-center text-center relative z-1">
        <motion.span 
          initial={fadeInUpInitial}
          whileInView={fadeInUpInView}
          viewport={fadeInUpViewport}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-accent-green uppercase font-extrabold tracking-[4px] text-[0.7rem] mb-4 block"
        >
          Our Heritage
        </motion.span>
        
        <motion.h2 
          initial={fadeInUpInitial}
          whileInView={fadeInUpInView}
          viewport={fadeInUpViewport}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold mb-12 text-white"
        >
          About Us
        </motion.h2>

        <motion.div 
          initial={fadeInUpInitial}
          whileInView={fadeInUpInView}
          viewport={fadeInUpViewport}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="bg-white/3 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-10 mb-12 shadow-2xl"
        >
          <p className="text-lg sm:text-xl font-normal leading-relaxed opacity-90 max-w-3xl mx-auto">
            Founded with the vision of capturing the spirit of Isipathana College, the Media Unit stands as the official chronicler of our school's legacy. We are a hub where technical precision meets creative storytelling, nurturing the next generation of broadcasters and journalists.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <motion.div 
            initial={fadeInUpInitial}
            whileInView={fadeInUpInView}
            viewport={fadeInUpViewport}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="bg-white/3 border border-white/10 border-l-4 border-l-accent-green rounded-2xl p-8 text-left backdrop-blur-lg hover:translate-y-[-5px] transition-all"
          >
            <h4 className="text-accent-green uppercase font-bold tracking-wider mb-3">Our Mission</h4>
            <p className="text-sm opacity-70 leading-relaxed font-medium">To provide professional-grade media coverage while nurturing the technical and creative talents of Isipathanians through hands-on experience.</p>
          </motion.div>

          <motion.div 
            initial={fadeInUpInitial}
            whileInView={fadeInUpInView}
            viewport={fadeInUpViewport}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            className="bg-white/3 border border-white/10 border-l-4 border-l-accent-green rounded-2xl p-8 text-left backdrop-blur-lg hover:translate-y-[-5px] transition-all"
          >
            <h4 className="text-accent-green uppercase font-bold tracking-wider mb-3">Our Vision</h4>
            <p className="text-sm opacity-70 leading-relaxed font-medium">To be the leading school media unit in Sri Lanka, setting global benchmarks in digital journalism and live broadcasting excellence.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
