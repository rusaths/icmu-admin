import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface DotNavigationProps {
  sections: { id: string; label: string }[];
}

const DotNavigation = ({ sections }: DotNavigationProps) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      let current = 'home';
      const offset = 150;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element && window.pageYOffset >= element.offsetTop - offset) {
          current = section.id;
        }
      });

      setActiveSection(current);
      // News and Team sections have white backgrounds in original design
      setIsLightMode(current === 'news' || current === 'team');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-[30px] top-1/2 -translate-y-1/2 flex flex-col gap-4 z-9999">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className="group relative flex items-center justify-end p-2 cursor-pointer outline-none"
          aria-label={`Scroll to ${section.label}`}
        >
          <span
            className={cn(
              'absolute right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap text-[0.7rem] font-bold uppercase tracking-wider translate-x-3 group-hover:translate-x-0',
              isLightMode ? 'text-black' : 'text-accent-green'
            )}
          >
            {section.label}
          </span>
          <div
            className={cn(
              'w-3 h-3 rounded-full border-2 transition-all duration-300',
              activeSection === section.id
                ? (isLightMode ? 'bg-black border-black scale-140 shadow-[0_0_10px_rgba(0,0,0,0.2)]' : 'bg-accent-green border-accent-green scale-140 shadow-[0_0_10px_#1ca65a]')
                : (isLightMode ? 'bg-transparent border-black/30' : 'bg-accent-green/20 border-accent-green')
            )}
          />
        </button>
      ))}
    </div>
  );
};

export default DotNavigation;
