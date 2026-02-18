import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ExternalLink, Calendar, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import useSounds from '@/hooks/useSounds';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const NewsSection = () => {
  const [loading, setLoading] = useState(true);
  const { playHover } = useSounds();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const newsItems = [
    {
      id: 1,
      date: '18 FEB 2026',
      title: 'Annual Media Workshop',
      category: 'TECHNICAL',
      desc: 'Intensive cinematography and live broadcast engineering sessions led by industry professionals from leading national television networks.',
      image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=800',
      content: 'The Isipathana College Media Unit successfully concluded its Annual Media Workshop "Lens & Life 2026". Over 200 students from various colleges participated in the sessions covering 4K cinematography, multi-cam switching, and color grading. The event featured guest speakers from various television channels who shared their field experiences.'
    },
    {
      id: 2,
      date: '12 FEB 2026',
      title: 'Studio Upgrade',
      category: 'COLLEGE',
      desc: 'Our technical bay has been upgraded with latest 4K switchers and professional lighting equipment to enhance our live streaming capabilities.',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
      content: 'In a move towards digital excellence, ICMU has refurbished its main production suite. The new setup includes Blackmagic Design switchers, Sony professional cameras, and a dedicated high-speed fiber link for uninterrupted 4K streaming. This upgrade ensures that all upcoming college events will be broadcasted with international standards.'
    },
    {
      id: 3,
      date: '05 FEB 2026',
      title: 'Rugby Live Stream',
      category: 'SPORTS',
      desc: 'Live broadcast of the upcoming Inter-School Rugby tournament. Experience the Green Machine in action like never before.',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800',
      content: 'Get ready for the most anticipated rugby season! ICMU will be the official broadcasting partner for the Green Machine’s home matches. With a 12-camera setup and drone coverage, we promise an immersive experience for Isipathanians across the globe.'
    },
    {
      id: 4,
      date: '28 JAN 2026',
      title: 'Photo Exhibition',
      category: 'ACHIEVEMENTS',
      desc: "Winners of 'Lens & Life' photography have been announced. See the world through the eyes of our talented student photographers.",
      image: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c91?auto=format&fit=crop&q=80&w=800',
      content: 'The annual photography contest saw over 500 entries this year. The exhibition showcased the breathtaking diversity of school life and wildlife. The winners were awarded by veteran photographers, and their work will be featured in the official college magazine.'
    },
    {
      id: 5,
      date: '20 JAN 2026',
      title: 'Membership Drive',
      category: 'TECHNICAL',
      desc: 'Applications now open for the 2026 Media Club intake. Join the elite team behind the lens.',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04844?auto=format&fit=crop&q=80&w=800',
      content: 'Are you passionate about media? The official Media Unit is looking for fresh talent in Cinematography, Editing, Scriptwriting, and Dubbing. All students from grade 8 above are encouraged to apply. Interviews will be held in the main conference hall.'
    },
  ];

  return (
    <section 
      id="news" 
      className="min-h-screen flex flex-col justify-center bg-white py-24 px-[2%] snap-start"
    >
      <div className="text-center mb-16">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-accent-green uppercase font-extrabold tracking-[4px] text-[0.7rem] mb-4 block"
        >
          Updates & Stories
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-[#050505]"
        >
          Latest News
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-[1440px] mx-auto px-4 mb-16">
        {loading ? (
          Array(5).fill(0).map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <Skeleton className="aspect-[4/5] w-full rounded-3xl bg-neutral-100" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/4 bg-neutral-100" />
                <Skeleton className="h-6 w-full bg-neutral-100" />
                <Skeleton className="h-6 w-3/4 bg-neutral-100" />
              </div>
            </div>
          ))
        ) : (
          newsItems.map((item, index) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <motion.div
                  onMouseEnter={() => playHover()}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group bg-neutral-50 border border-neutral-200 flex flex-col overflow-hidden transition-all duration-300 hover:translate-y-[-10px] hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] rounded-3xl cursor-pointer"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-accent-green/90 text-white font-black text-[0.6rem] px-3 py-1 rounded-full">{item.category}</Badge>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-neutral-400 text-[0.65rem] font-bold tracking-wider mb-2">
                      {item.date}
                    </span>
                    <h4 className="text-[#1a1a1a] font-bold text-lg mb-3 leading-tight group-hover:text-accent-green transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-neutral-500 text-xs leading-relaxed mb-4 line-clamp-3">
                      {item.desc}
                    </p>
                    <div className="mt-auto flex items-center gap-2 text-[0.6rem] font-black uppercase tracking-widest text-[#1a1a1a] group-hover:text-accent-green transition-colors">
                      View Story <ExternalLink size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </DialogTrigger>
              
              <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white border-none rounded-[2rem]">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] h-full max-h-[85vh]">
                  <div className="relative h-full min-h-[300px] md:min-h-full">
                    <img src={item.image} className="absolute inset-0 w-full h-full object-cover" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-10 flex flex-col justify-end">
                      <Badge className="w-fit mb-4 bg-accent-green text-white font-bold">{item.category}</Badge>
                      <h1 className="text-3xl font-black text-white leading-tight">{item.title}</h1>
                    </div>
                  </div>
                  <div className="p-10 overflow-y-auto bg-white custom-scrollbar">
                    <DialogHeader className="mb-8">
                      <div className="flex gap-6 text-[0.7rem] font-extrabold text-neutral-400 uppercase tracking-widest">
                         <div className="flex items-center gap-2"><Calendar size={14} className="text-accent-green" /> {item.date}</div>
                         <div className="flex items-center gap-2"><User size={14} className="text-accent-green" /> Press Release</div>
                         <div className="flex items-center gap-2"><Tag size={14} className="text-accent-green" /> Official</div>
                      </div>
                    </DialogHeader>
                    <div className="prose prose-neutral">
                      <p className="text-neutral-500 leading-relaxed text-lg mb-6 font-medium">
                         {item.desc}
                      </p>
                      <hr className="border-neutral-100 mb-8" />
                      <p className="text-neutral-600 leading-relaxed">
                         {item.content}
                      </p>
                      <p className="text-neutral-600 leading-relaxed mt-4">
                         Isipathana College continues to lead in fostering creative talent among its students, ensuring that the Media Unit remains the cornerstone of all college documentation.
                      </p>
                    </div>
                    <div className="mt-12 pt-8 border-t border-neutral-100 flex justify-between items-center">
                      <button className="text-xs font-black uppercase tracking-widest text-accent-green hover:opacity-70">Share Article</button>
                      <DialogClose asChild>
                        <Button variant="outline" className="rounded-full px-8 font-black uppercase tracking-widest text-xs border-black hover:bg-black hover:text-white transition-all">Close</Button>
                      </DialogClose>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))
        )}
      </div>

      <div className="text-center">
        <Button variant="outline" className="border-accent-green text-accent-green hover:bg-accent-green hover:text-white rounded-full px-12 h-14 uppercase font-black tracking-widest text-xs transition-all shadow-xl shadow-accent-green/5">
          Load News Archives
        </Button>
      </div>
    </section>
  );
};

export default NewsSection;
