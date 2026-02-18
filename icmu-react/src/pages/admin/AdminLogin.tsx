import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import useSounds from '@/hooks/useSounds';

const AdminLogin = () => {
  const { playSuccess, playError } = useSounds();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate minor delay for feel
    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        playSuccess();
        toast.success('Access Granted', { description: 'Welcome to the ICMU Control Portal.' });
        navigate('/admin/dashboard');
      } else {
        playError();
        toast.error('Access Denied', { description: 'Invalid administrative credentials.' });
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-deep p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-glass-bg border-accent-green/30 backdrop-blur-xl shadow-2xl overflow-hidden">
          <CardHeader className="text-center pb-8 pt-10">
            <div className="mx-auto w-16 h-16 bg-accent-green/20 rounded-2xl flex items-center justify-center mb-4">
              <img src="/icmu-logo.png" alt="Logo" className="w-10 h-10 object-contain" />
            </div>
            <CardTitle className="text-2xl font-extrabold text-white tracking-tight">Portal Access</CardTitle>
            <CardDescription className="text-xs uppercase tracking-widest text-white/40 font-bold mt-2">Administrative Gateway</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-10">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <Input
                  type="text"
                  placeholder="Username"
                  className="bg-black/40 border-white/10 pl-12 h-12 rounded-xl focus-visible:ring-accent-green text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <Input
                  type="password"
                  placeholder="Password"
                  className="bg-black/40 border-white/10 pl-12 h-12 rounded-xl focus-visible:ring-accent-green text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 bg-accent-green hover:bg-accent-green/80 text-white font-extrabold rounded-xl text-sm transition-all mt-6 shadow-[0_0_20px_rgba(28,166,90,0.3)]"
                disabled={isLoading}
              >
                {isLoading ? 'VERIFYING...' : 'UNLOCK GATEWAY'}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-white/30 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
          >
            ← Back to Public Website
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
