import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: 'power3.out',
          delay: 0.5 
        }
      );
    }
  }, []);

  return (
    <section 
      id="home" 
      className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden snap-start"
      ref={containerRef}
    >
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 z-0 object-cover"
      >
        <source src="/bg-vid.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-black/60 z-1" />
      
      <div 
        ref={textRef}
        className="relative z-2 px-5 flex flex-col items-center"
      >
        <h1 className="text-[clamp(3.5rem,12vw,6.5rem)] font-extrabold mb-5 leading-[0.95] tracking-tight ">
          PULSE OF <br /> ISIPATHANA
        </h1>

        <p className="max-w-[650px] text-lg sm:text-xl font-light leading-relaxed tracking-wide text-white/80 mb-6">
          Capturing the legacy and broadcasting the spirit of the Green Machine. We are the lens through which history is documented and greatness is shared with the world.
        </p>

        <p className="font-extrabold uppercase tracking-[4px] text-accent-green text-[0.9rem] mb-4 shadow-accent-green/30 drop-shadow-lg">
          No Sacrifice, No Victory
        </p>

        <p className="italic text-[0.8rem] opacity-50 tracking-[2px] font-medium">
          Since 1999
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-2 animate-bounce opacity-40">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
