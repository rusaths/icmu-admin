import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import useSounds from '@/hooks/useSounds';

const Navbar = () => {
  const { playHover, playClick } = useSounds();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'News', href: '#news' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-1000 transition-all duration-500 py-4 px-[5%]',
        isScrolled ? 'bg-transparent backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      )}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex bg-white/5 p-1 rounded-lg">
            <img src="/ic-logo.png" alt="IC Logo" className="h-10 w-auto object-contain" />
            <img src="/icmu-logo.png" alt="ICMU Logo" className="h-10 w-auto object-contain" />
          </div>
          <div className="hidden sm:block border-l border-white/10 pl-4">
            <h1 className="text-[0.8rem] font-extrabold uppercase tracking-widest leading-tight">
              Media Unit of<br />Isipathana College
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <ul className="hidden lg:flex gap-8 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="text-[0.75rem] font-bold uppercase tracking-wider text-white/60 hover:text-accent-green transition-colors no-underline"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          <button 
            className="lg:hidden text-accent-green cursor-pointer"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <Link to="/admin" className="hidden sm:block text-[0.7rem] font-extrabold bg-accent-green text-white px-5 py-2 rounded-full hover:scale-105 transition-transform">
            PORTAL LOGIN
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-[320px] h-screen bg-bg-deep/98 backdrop-blur-3xl z-1100 border-l border-white/10 p-12 flex flex-col"
          >
            <button 
              className="self-end text-accent-green mb-12"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={28} />
            </button>
            <ul className="list-none p-0 flex flex-col gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-2xl font-extrabold text-white hover:text-accent-green transition-colors no-underline"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="mt-8">
                <Link 
                  to="/admin" 
                  className="text-lg font-extrabold bg-accent-green text-white px-8 py-3 rounded-full inline-block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ADMIN ACCESS
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
