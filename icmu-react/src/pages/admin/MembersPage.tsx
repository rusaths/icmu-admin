import { useState, useRef, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { UserPlus, FileSpreadsheet, Download, RefreshCw, User } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface Member {
  name: string;
  index: string;
  reg: string;
}

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const MembersPage = () => {
  const [name, setName] = useState('');
  const [index, setIndex] = useState('');
  const [reg, setReg] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [logos, setLogos] = useState<{ a: HTMLImageElement | null; b: HTMLImageElement | null }>({ a: null, b: null });

  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    // Preload logos for canvas
    const imgA = new Image(); imgA.src = '/ic-logo.png';
    const imgB = new Image(); imgB.src = '/icmu-logo.png';
    imgA.onload = () => setLogos(prev => ({ ...prev, a: imgA }));
    imgB.onload = () => setLogos(prev => ({ ...prev, b: imgB }));
  }, []);

  useEffect(() => {
    drawCard();
  }, [name, index, reg, logos]);

  const drawCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 1016, 638);

    // Slogan Bar
    ctx.fillStyle = 'rgba(28, 166, 90, 0.2)';
    ctx.fillRect(0, 570, 1016, 68);
    ctx.fillStyle = '#1ca65a';
    ctx.font = 'italic 700 24px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('THE VOICE OF THE GREEN MACHINE', 508, 612);

    // Header
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.font = '700 42px Montserrat, sans-serif';
    ctx.fillText('MEMBERSHIP CARD', 50, 100);

    // Logos
    if (logos.a) ctx.drawImage(logos.a, 820, 50, 70, 70);
    if (logos.b) ctx.drawImage(logos.b, 905, 50, 70, 70);

    // Photo Box
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.roundRect(50, 170, 280, 360, 20);
    ctx.fill();

    // Data Labels
    const drawLabel = (label: string, val: string, y: number) => {
      ctx.fillStyle = '#fff';
      ctx.font = '500 16px Montserrat, sans-serif';
      ctx.fillText(label, 370, y);
      ctx.font = '800 34px Montserrat, sans-serif';
      ctx.fillText((val || '---').toUpperCase(), 370, y + 45);
    };

    drawLabel('FULL NAME', name, 240);
    drawLabel('INDEX NO', index, 360);
    drawLabel('REG NO', reg, 480);

    // Drawing the QR code onto canvas is a bit complex in pure React 
    // without using a hidden SVG and drawing its path.
    // For now, we simulate the box.
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.roundRect(830, 420, 140, 140, 10);
    ctx.fill();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const rows = text.split('\n').slice(1);
      const imported = rows.map(row => {
        const [n, idx, rg] = row.split(',');
        return { name: n?.trim(), index: idx?.trim(), reg: rg?.trim() };
      }).filter(m => m.name);
      
      setMembers(imported);
      toast.success('Sync Complete', { description: `Imported ${imported.length} members from CSV.` });
    };
    reader.readAsText(file);
  };

  const downloadCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `ICMU_Card_${reg || 'new'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    toast.success('Download Started');
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Member Management</h1>
          <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Identity Card Generation & Database Sync</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[450px_1fr] gap-8">
          <div className="space-y-6">
            <Tabs defaultValue="manual" className="w-full">
              <TabsList className="bg-white/5 border border-white/5 w-full h-12 rounded-xl p-1 mb-4">
                <TabsTrigger value="manual" className="flex-1 rounded-lg gap-2 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-accent-green data-[state=active]:text-white">
                  <UserPlus size={16} /> Manual
                </TabsTrigger>
                <TabsTrigger value="bulk" className="flex-1 rounded-lg gap-2 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-accent-green data-[state=active]:text-white">
                  <FileSpreadsheet size={16} /> Bulk
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="manual">
                <Card className="bg-white/3 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-lg">Manual Entry</CardTitle>
                    <CardDescription>Generate a single identity card</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input 
                      placeholder="Full Name" 
                      value={name} 
                      onChange={e => setName(e.target.value)}
                      className="bg-black/20 border-white/10 h-12 rounded-xl text-white" 
                    />
                    <Input 
                      placeholder="Index Number" 
                      value={index} 
                      onChange={e => setIndex(e.target.value)}
                      className="bg-black/20 border-white/10 h-12 rounded-xl text-white" 
                    />
                    <Input 
                      placeholder="Registration Number" 
                      value={reg} 
                      onChange={e => setReg(e.target.value)}
                      className="bg-black/20 border-white/10 h-12 rounded-xl text-white" 
                    />
                    <Button 
                      onClick={downloadCard}
                      className="w-full h-12 bg-accent-green hover:opacity-90 font-bold rounded-xl mt-2"
                    >
                      <Download size={18} className="mr-2" /> Download PNG
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bulk">
                <Card className="bg-white/3 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-lg">CSV Import</CardTitle>
                    <CardDescription>Upload member list for bulk generation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.65rem] font-bold uppercase tracking-widest text-white/40">Upload CSV File</label>
                      <input 
                        type="file" 
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="block w-full text-xs text-white/40 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-white/5 file:text-white hover:file:bg-white/10 transition-all cursor-pointer"
                      />
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-[0.65rem] font-bold uppercase tracking-widest text-white/40">Member List ({members.length})</label>
                       <div className="h-48 overflow-y-auto bg-black/20 border border-white/5 rounded-xl p-2 flex flex-col gap-1 custom-scrollbar">
                         {members.length === 0 ? (
                           <div className="h-full flex items-center justify-center opacity-20 italic text-xs">No data imported</div>
                         ) : (
                           members.map((m, i) => (
                             <div 
                               key={i} 
                               className="p-3 bg-white/5 rounded-lg flex items-center justify-between group cursor-pointer hover:bg-accent-green/10"
                               onClick={() => { setName(m.name); setIndex(m.index); setReg(m.reg); }}
                             >
                               <div className="flex items-center gap-3">
                                 <User size={14} className="text-accent-green" />
                                 <span className="text-[0.7rem] font-bold opacity-80">{m.reg} - {m.name}</span>
                               </div>
                             </div>
                           ))
                         )}
                       </div>
                    </div>
                    
                    <Button className="w-full h-12 bg-white/10 hover:bg-white/20 font-bold rounded-xl">
                      <RefreshCw size={18} className="mr-2" /> Generate All (ZIP)
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex flex-col items-center">
            <motion.div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="w-full relative group perspective-[1000px]"
            >
              <canvas 
                ref={canvasRef} 
                width="1016" 
                height="638" 
                className="w-full rounded-[2.5rem] border border-accent-green/50 shadow-[0_20px_60px_rgba(0,0,0,0.8)] transition-all"
              />
              
              {/* Overlay QR for Preview ONLY */}
              <div 
                style={{ transform: "translateZ(50px)" }}
                className="absolute bottom-[44px] right-[46px] bg-white p-2 rounded-lg translate-y-[100%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none shadow-2xl"
              >
                 <QRCodeSVG value={reg || '00M000'} size={120} />
              </div>
            </motion.div>
            <p className="mt-8 text-white/20 text-[0.65rem] font-bold uppercase tracking-[4px]">Live Preview Canvas (1016x638px) // 3D Tilt Enabled</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default MembersPage;
