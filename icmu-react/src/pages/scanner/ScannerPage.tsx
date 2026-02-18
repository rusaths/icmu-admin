import { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Shield, Maximize2, RotateCcw, Activity } from 'lucide-react';
import { toast } from 'sonner';
import useSounds from '@/hooks/useSounds';

const ScannerPage = () => {
  const { playSuccess } = useSounds();
  const [scanResult, setScanResult] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scannerRef.current.render(onScanSuccess, onScanFailure);

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(err => console.error("Failed to clear scanner", err));
      }
    };
  }, []);

  function onScanSuccess(decodedText: string) {
    if (decodedText !== scanResult) {
      setScanResult(decodedText);
      playSuccess();
      toast.success("Identity Detected", { description: `Reg No: ${decodedText}` });
      
      // Post to parent window for the dashboard to receive
      if (window.opener) {
        window.opener.postMessage({ type: 'SCAN_SUCCESS', data: decodedText }, '*');
      }
    }
  }

  function onScanFailure() {
    // Silent failure to avoid console spam
  }

  const resetScanner = () => {
    setScanResult(null);
    if (scannerRef.current) {
       scannerRef.current.clear().then(() => {
         scannerRef.current?.render(onScanSuccess, onScanFailure);
       });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col overflow-hidden">
      {/* HUD Header */}
      <header className="p-8 flex justify-between items-center border-b border-white/5 bg-black/40 backdrop-blur-xl relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent-green/20 border border-accent-green/40 rounded-lg flex items-center justify-center">
            <Shield size={20} className="text-accent-green" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-widest uppercase">Sentinel Scanner v1.0</h1>
            <p className="text-[0.6rem] font-bold text-accent-green tracking-[3px] opacity-70">SENSORS ONLINE</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
             <span className="text-[0.5rem] font-bold text-white/30 uppercase tracking-widest">Battery Status</span>
             <span className="text-[0.7rem] font-black text-accent-green">98% // PLUGGED</span>
          </div>
          <Activity size={20} className="text-accent-green animate-pulse" />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
        {/* Abstract HUD Circles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-[600px] h-[600px] border border-white/5 rounded-full animate-ping [animation-duration:4s]" />
          <div className="w-[400px] h-[400px] border border-accent-green/10 rounded-full animate-pulse" />
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="aspect-square bg-black border-2 border-accent-green/30 rounded-[3rem] p-8 relative overflow-hidden group shadow-[0_0_50px_rgba(28,166,90,0.1)]">
            <div id="reader" className="w-full h-full rounded-2xl overflow-hidden [&>div]:border-none! [&_button]:bg-accent-green! [&_button]:text-white! [&_button]:font-black! [&_button]:uppercase! [&_button]:tracking-widest! [&_button]:px-6! [&_button]:py-3! [&_button]:rounded-xl! [&_button]:mt-4!"></div>
            
            {/* HUD Corners */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-accent-green rounded-tl-xl" />
            <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-accent-green rounded-tr-xl" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-accent-green rounded-bl-xl" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-accent-green rounded-br-xl" />
            
            {/* Scanning Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-accent-green/40 shadow-[0_0_20px_#1ca65a] animate-[scan_3s_ease-in-out_infinite] z-20" />
          </div>

          <div className="mt-12 flex justify-center gap-4">
             <button 
              onClick={resetScanner}
              className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-[0.7rem] hover:bg-white/10 transition-all"
             >
                <RotateCcw size={16} /> Reset Sensor
             </button>
             <button className="flex items-center gap-3 px-8 py-4 bg-accent-green text-white rounded-2xl font-black uppercase tracking-widest text-[0.7rem] hover:opacity-90 transition-all shadow-[0_0_30px_rgba(28,166,90,0.4)]">
                <Maximize2 size={16} /> Fullscreen
             </button>
          </div>
        </div>
      </main>

      <footer className="p-10 text-center relative z-10">
         <p className="text-[0.6rem] font-bold text-white/10 uppercase tracking-[6px]">Property of Isipathana College Media Unit • Deployment 26.02</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0%, 100% { top: 10%; opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { top: 90%; }
        }
      `}} />
    </div>
  );
};

export default ScannerPage;
