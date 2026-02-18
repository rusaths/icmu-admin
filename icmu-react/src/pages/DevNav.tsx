import { Link } from 'react-router-dom';
import { 
  Home, 
  Lock, 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  QrCode, 
  ChevronRight,
  Code
} from 'lucide-react';

const DevNav = () => {
  const routes = [
    { 
      path: '/', 
      name: 'Home', 
      desc: 'Main public landing page',
      icon: <Home size={20} />,
      group: 'Public'
    },
    { 
      path: '/admin', 
      name: 'Admin Login', 
      desc: 'Access point for administrators',
      icon: <Lock size={20} />,
      group: 'Admin'
    },
    { 
      path: '/admin/dashboard', 
      name: 'Admin Dashboard', 
      desc: 'Core management interface (Protected)',
      icon: <LayoutDashboard size={20} />,
      group: 'Admin'
    },
    { 
      path: '/admin/members', 
      name: 'Members Management', 
      desc: 'Manage unit membership and data (Protected)',
      icon: <Users size={20} />,
      group: 'Admin'
    },
    { 
      path: '/access', 
      name: 'Access Dashboard', 
      desc: 'Verification and access control portal',
      icon: <ShieldCheck size={20} />,
      group: 'Operations'
    },
    { 
      path: '/scanner', 
      name: 'QR Scanner', 
      desc: 'Mobile-first scanning interface',
      icon: <QrCode size={20} />,
      group: 'Operations'
    }
  ];

  const groupedRoutes = routes.reduce((acc, route) => {
    if (!acc[route.group]) acc[route.group] = [];
    acc[route.group].push(route);
    return acc;
  }, {} as Record<string, typeof routes>);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 sm:p-12 md:p-20 font-sans selection:bg-accent-green selection:text-black">
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-accent-green/10 p-3 rounded-2xl border border-accent-green/20">
            <Code className="text-accent-green" size={24} />
          </div>
          <span className="text-accent-green font-black uppercase tracking-[0.3em] text-xs">
            ICMU Console
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight">
          Developer <span className="text-neutral-500">Navigation</span>
        </h1>
        <p className="text-neutral-500 mt-6 max-w-xl text-lg leading-relaxed">
          Quick access to all application endpoints. Simplified view for faster development.
        </p>
      </header>

      <main className="max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {Object.entries(groupedRoutes).map(([group, items]) => (
            <div key={group}>
              <h2 className="text-neutral-500 font-extrabold uppercase tracking-widest text-xs mb-8 border-b border-neutral-800 pb-4">
                {group}
              </h2>
              <div className="flex flex-col gap-4">
                {items.map((route) => (
                  <Link 
                    key={route.path} 
                    to={route.path}
                    className="group"
                  >
                    <div className="bg-[#0a0a0a] border border-neutral-800 p-6 rounded-[2rem] transition-all duration-200 hover:bg-neutral-900 group-hover:border-accent-green/30">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-4">
                          <div className="text-accent-green bg-accent-green/5 w-fit p-3 rounded-xl border border-accent-green/10 group-hover:bg-accent-green group-hover:text-black transition-colors duration-200">
                            {route.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-xl group-hover:text-accent-green transition-colors">{route.name}</h3>
                            <p className="text-neutral-500 text-sm mt-1 leading-relaxed">{route.desc}</p>
                          </div>
                        </div>
                        <ChevronRight className="text-neutral-800 group-hover:text-accent-green transition-colors" size={20} />
                      </div>
                      <div className="mt-8">
                        <code className="text-[0.65rem] bg-black px-3 py-1.5 rounded-full text-neutral-600 border border-neutral-900 font-mono">
                          {route.path}
                        </code>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-32 pt-12 border-t border-neutral-900 flex justify-between items-center text-neutral-600 text-xs uppercase tracking-widest font-black">
        <div>Isipathana College Media Unit • 2026</div>
        <div className="flex gap-8">
          <span className="text-accent-green/50">Internal Access Only</span>
        </div>
      </footer>
    </div>
  );
};

export default DevNav;
