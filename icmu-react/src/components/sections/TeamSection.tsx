import { motion } from 'framer-motion';

const TeamSection = () => {
  const leaders = [
    { name: 'Janith Perera', role: 'President' },
    { name: 'Sahan Silva', role: 'Secretary' },
    { name: 'Nuwan Perera', role: 'Vice President' },
    { name: 'Dinith Fernando', role: 'Treasurer' },
    { name: 'Kavindu Bandara', role: 'Technical Head' },
    { name: 'Sahan Wickrama', role: 'Chief Editor' },
    { name: 'Minura Silva', role: 'Main Organizer' },
  ];

  // Double the array for seamless marquee
  const marqueeItems = [...leaders, ...leaders];

  return (
    <section 
      id="team" 
      className="h-screen flex flex-col justify-between overflow-hidden bg-white py-12 snap-start"
    >
      <div className="text-center">
        <span className="text-accent-green uppercase font-extrabold tracking-[4px] text-[0.7rem] mb-4 block">
          Leadership
        </span>
        <h2 className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-[#050505]">
          Our Team
        </h2>
      </div>

      <div className="relative flex-grow flex items-center overflow-hidden">
        {/* Infinite Marquee Wrapper */}
        <div className="flex whitespace-nowrap overflow-hidden py-10">
          <motion.div 
            animate={{ x: [0, -1680] }} // Adjust based on card width + gap
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: 'linear' 
            }}
            className="flex gap-8 px-4"
          >
            {marqueeItems.map((member, index) => (
              <div 
                key={`${member.name}-${index}`}
                className="flex flex-col items-center justify-center w-[240px] h-[340px] p-8 bg-neutral-50 border border-neutral-100 rounded-[2.5rem] shrink-0 text-center hover:bg-white hover:shadow-xl hover:border-accent-green/20 transition-all duration-500 group"
              >
                <div className="w-[110px] h-[110px] rounded-full bg-neutral-200 mb-6 border-4 border-accent-green overflow-hidden group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-neutral-300 animate-pulse" />
                </div>
                <div className="bearer-info">
                  <h4 className="text-[#1a1a1a] text-lg font-bold mb-2 group-hover:text-accent-green transition-colors">{member.name}</h4>
                  <p className="text-accent-green font-extrabold text-[0.75rem] uppercase tracking-widest leading-none">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-4xl mx-auto px-6 mb-8">
        {[
          { title: 'The Principal', role: 'PATRON' },
          { title: 'Master in Charge', role: 'ADVISOR' }
        ].map((lead) => (
          <div key={lead.title} className="flex-1 flex items-center gap-4 bg-neutral-50 border border-neutral-100 p-5 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-neutral-200 shrink-0" />
            <div className="text-left">
              <h4 className="text-[#1a1a1a] text-[0.95rem] font-bold leading-tight">{lead.title}</h4>
              <p className="opacity-60 text-[0.7rem] text-[#1a1a1a] font-extrabold tracking-wider">{lead.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
