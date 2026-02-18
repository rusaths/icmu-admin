import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Clock, Search, ChevronRight, UserCheck, Smartphone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface ScanLog {
  id: string;
  name: string;
  reg: string;
  time: string;
  status: 'GRANTED' | 'DENIED' | 'PENDING';
}

const AccessDashboard = () => {
  const [logs] = useState<ScanLog[]>([
    { id: '1', name: 'Janith Perera', reg: '22M042', time: '14:22:15', status: 'GRANTED' },
    { id: '2', name: 'Sahan Silva', reg: '23M102', time: '14:21:05', status: 'GRANTED' },
    { id: '3', name: 'Unknown Device', reg: '---', time: '14:18:42', status: 'DENIED' },
  ]);

  const [lastScan, setLastScan] = useState<ScanLog | null>(logs[0]);

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden selection:bg-accent-green/30">
      {/* Left Wall: Big Display */}
      <div className="flex-1 flex flex-col p-12 relative overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-accent-green/5 blur-[150px] rounded-full" />
        
        <header className="flex justify-between items-center mb-16 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent-green rounded-xl flex items-center justify-center shadow-[0_0_20px_#1ca65a]">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-widest uppercase">Gateway Sentinel</h1>
              <p className="text-[0.65rem] font-bold text-accent-green tracking-[4px] opacity-70">LIVE ACCESS MONITOR</p>
            </div>
          </div>
          <div className="flex gap-8 text-right">
            <div>
              <p className="text-[0.6rem] font-bold text-white/30 uppercase tracking-widest">System Status</p>
              <p className="text-accent-green font-black text-sm tracking-widest uppercase animate-pulse">Online // Operational</p>
            </div>
            <div>
              <p className="text-[0.6rem] font-bold text-white/30 uppercase tracking-widest">Station ID</p>
              <p className="font-black text-sm tracking-widest uppercase">MAIN_ENTRANCE_01</p>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center relative z-10">
          <AnimatePresence mode="wait">
            {lastScan ? (
              <motion.div 
                key={lastScan.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                transition={{ type: 'spring', damping: 20 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-48 h-48 rounded-full border-4 border-accent-green p-2 mb-8 shadow-[0_0_50px_rgba(28,166,90,0.2)]">
                  <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center">
                    <UserCheck size={80} className="text-accent-green" />
                  </div>
                </div>
                <h2 className="text-6xl font-black mb-4 tracking-tighter uppercase">{lastScan.name}</h2>
                <div className="flex gap-4 items-center">
                  <Badge className="bg-accent-green text-white font-black px-6 py-2 text-lg rounded-full animate-bounce">
                    ACCESS GRANTED
                  </Badge>
                  <span className="text-2xl font-bold text-white/30 tracking-widest">{lastScan.reg}</span>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center gap-6 opacity-20">
                <Smartphone size={120} strokeWidth={1} />
                <p className="text-2xl font-bold tracking-[8px] uppercase">Waiting for Scan...</p>
              </div>
            )}
          </AnimatePresence>
        </main>
        
        <footer className="h-24 border-t border-white/5 flex items-center justify-between px-4 relative z-10">
           <div className="flex items-center gap-2 text-white/30">
             <Clock size={16} />
             <span className="text-xs font-bold uppercase tracking-widest">Buffer Syncing...</span>
           </div>
           <div className="text-[0.6rem] font-bold text-white/20 tracking-[4px]">
             © ICMU TECHNOLOGY DIVISION 2026
           </div>
        </footer>
      </div>

      {/* Right Wall: Sidebar Activity */}
      <aside className="w-[450px] bg-black/40 border-l border-white/5 backdrop-blur-3xl p-8 flex flex-col gap-8">
        <div className="space-y-2">
          <h3 className="text-[0.7rem] font-bold uppercase tracking-[4px] text-white/40">Real-time Stream</h3>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
            <Input className="bg-white/5 border-white/10 pl-12 h-12 rounded-xl text-white placeholder:text-white/20" placeholder="Identity Search..." />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex flex-col gap-3">
            {logs.map((log) => (
              <div 
                key={log.id} 
                className="group p-5 bg-white/3 border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-all cursor-pointer"
                onClick={() => setLastScan(log)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-12 rounded-full ${log.status === 'GRANTED' ? 'bg-accent-green' : 'bg-red-500'}`} />
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-accent-green transition-colors">{log.name}</h4>
                    <p className="text-[0.65rem] font-bold text-white/30 tracking-widest">{log.reg} • {log.time}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-white/10 group-hover:text-white/50 transition-all" />
              </div>
            ))}
          </div>
        </div>

        <Card className="bg-accent-green/5 border-accent-green/20 rounded-[2rem]">
          <CardContent className="p-8 flex flex-col items-center text-center">
            <h4 className="text-[0.65rem] font-extrabold tracking-[4px] text-accent-green uppercase mb-4">Total Session Scans</h4>
            <span className="text-6xl font-black text-white">482</span>
            <div className="mt-4 flex gap-4">
               <div className="flex flex-col">
                 <span className="text-[0.5rem] font-bold text-white/40 uppercase">Authorized</span>
                 <span className="text-lg font-bold">479</span>
               </div>
               <div className="w-[1px] h-full bg-white/10" />
               <div className="flex flex-col">
                 <span className="text-[0.5rem] font-bold text-white/40 uppercase">Incidents</span>
                 <span className="text-lg font-bold text-red-500">03</span>
               </div>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
};

export default AccessDashboard;
