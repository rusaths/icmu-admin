import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Card Manager', href: '/admin/members', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-bg-deep overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0d110f] border-r border-white/5 p-8 flex flex-col gap-10">
        <div className="flex items-center gap-4">
          <img src="/icmu-logo.png" alt="Logo" className="h-10 w-auto" />
          <div className="font-extrabold text-[0.7rem] uppercase tracking-widest leading-tight text-white/50">
            Control<br />Portal
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-4 p-4 rounded-xl transition-all duration-300 font-bold text-sm tracking-wide',
                  isActive 
                    ? 'bg-accent-green/10 text-accent-green shadow-[inset_0_0_15px_rgba(28,166,90,0.05)]' 
                    : 'text-white/40 hover:bg-white/5 hover:text-white'
                )
              }
            >
              <item.icon size={20} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3">
          <Button 
            variant="ghost" 
            className="justify-start gap-4 text-white/40 hover:text-white hover:bg-white/5 p-4 rounded-xl font-bold h-auto"
            onClick={() => navigate('/')}
          >
            <ExternalLink size={20} />
            Public View
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start gap-4 text-red-500/60 hover:text-red-500 hover:bg-red-500/5 p-4 rounded-xl font-bold h-auto"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-12 relative">
        {/* Abstract Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-green/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="relative z-1 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
