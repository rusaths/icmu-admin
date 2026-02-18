import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DotNavigation from '@/components/DotNavigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import NewsSection from '@/components/sections/NewsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TeamSection from '@/components/sections/TeamSection';
import ContactSection from '@/components/sections/ContactSection';

const HomePage = () => {
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'news', label: 'News' },
    { id: 'services', label: 'Services' },
    { id: 'team', label: 'Team' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="relative bg-bg-deep text-white selection:bg-accent-green/30">
      <Navbar />
      <DotNavigation sections={sections} />
      
      <main className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
        <HeroSection />
        <AboutSection />
        <NewsSection />
        <ServicesSection />
        <TeamSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default HomePage;
