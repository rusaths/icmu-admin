import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Plus, 
  Trash2, 
  ExternalLink, 
  BarChart3, 
  TrendingUp, 
  Eye, 
  ArrowUpRight 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
}

const chartData = [
  { name: 'Mon', views: 2400, scans: 400 },
  { name: 'Tue', views: 1398, scans: 300 },
  { name: 'Wed', views: 9800, scans: 2000 },
  { name: 'Thu', views: 3908, scans: 1400 },
  { name: 'Fri', views: 4800, scans: 1800 },
  { name: 'Sat', views: 3800, scans: 3200 },
  { name: 'Sun', views: 4300, scans: 2100 },
];

const AdminDashboard = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('COLLEGE');

  useEffect(() => {
    const saved = localStorage.getItem('icmu_news');
    if (saved) setNews(JSON.parse(saved));
  }, []);

  const saveNews = (updated: NewsItem[]) => {
    setNews(updated);
    localStorage.setItem('icmu_news', JSON.stringify(updated));
  };

  const addNews = () => {
    if (!title) return toast.error("Title required");
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      category,
      date: new Date().toLocaleDateString('en-GB')
    };
    saveNews([newItem, ...news]);
    setTitle('');
    toast.success("Article Published");
  };

  const deleteNews = (id: string) => {
    const updated = news.filter(n => n.id !== id);
    saveNews(updated);
    toast.success("Article Deleted");
  };

  return (
    <AdminLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">Platform Overview</h1>
            <p className="text-muted-foreground font-medium">Monitoring the pulse of Isipathana College Media Unit.</p>
          </div>
          <div className="flex gap-4">
             <div className="p-4 bg-accent-green/10 border border-accent-green/20 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 bg-accent-green rounded-xl flex items-center justify-center text-white shadow-lg">
                   <TrendingUp size={20} />
                </div>
                <div>
                   <p className="text-[0.6rem] font-bold text-accent-green uppercase tracking-widest">Active Members</p>
                   <p className="text-xl font-black">124</p>
                </div>
             </div>
          </div>
        </header>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-white border-white/10 shadow-sm rounded-[2rem] overflow-hidden">
            <CardHeader className="p-8 pb-0">
               <div className="flex justify-between items-center">
                 <div>
                   <CardTitle className="text-lg font-black uppercase tracking-tight">Traffic & Engagement</CardTitle>
                   <CardDescription className="text-xs uppercase font-bold tracking-widest mt-1">Weekly digital outreach metrics</CardDescription>
                 </div>
                 <Badge variant="outline" className="border-accent-green text-accent-green font-bold">LIVE STATS</Badge>
               </div>
            </CardHeader>
            <CardContent className="p-8 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1ca65a" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1ca65a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#999' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#999' }} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="views" stroke="#1ca65a" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-[#050505] text-white border-white/5 shadow-2xl rounded-[2rem] overflow-hidden relative">
             <div className="absolute top-0 right-0 p-8">
               <ArrowUpRight size={24} className="text-accent-green" />
             </div>
             <CardHeader className="p-8">
               <CardTitle className="text-sm font-bold text-white/40 uppercase tracking-[4px]">Access Trends</CardTitle>
             </CardHeader>
             <CardContent className="p-8 pt-0 flex flex-col justify-end h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={chartData}>
                      <Bar dataKey="scans" fill="#1ca65a" radius={[10, 10, 0, 0]}>
                         {chartData.map((_, index) => (
                           <Cell key={`cell-${index}`} fill={index === 5 ? '#ffffff' : '#1ca65a'} opacity={0.3 + (index * 0.1)} />
                         ))}
                      </Bar>
                   </BarChart>
                </ResponsiveContainer>
                <div className="mt-8">
                   <h3 className="text-4xl font-black mb-1">2.4k</h3>
                   <p className="text-xs font-bold text-white/30 uppercase tracking-widest">Successful scans / Month</p>
                </div>
             </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-8">
          <Card className="bg-white rounded-[2.5rem] shadow-sm border-neutral-100 h-fit">
            <CardHeader className="p-8">
              <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
                <Plus size={20} className="text-accent-green" /> Create Post
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 flex flex-col gap-6">
              <div className="space-y-2">
                <label className="text-[0.65rem] font-black uppercase text-neutral-400 tracking-wider">Article Title</label>
                <Input 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="bg-neutral-50 border-neutral-200 rounded-xl h-12 hoveR:bg-white transition-all"
                  placeholder="Enter headlines..." 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[0.65rem] font-black uppercase text-neutral-400 tracking-wider">Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl h-12 px-4 text-sm font-bold focus:outline-accent-green"
                >
                  <option value="COLLEGE">COLLEGE</option>
                  <option value="SPORTS">SPORTS</option>
                  <option value="TECHNICAL">TECHNICAL</option>
                  <option value="AWARDS">AWARDS</option>
                </select>
              </div>
              <Button onClick={addNews} className="bg-accent-green hover:bg-accent-green/90 text-white rounded-xl h-12 font-black uppercase tracking-widest text-[0.7rem] shadow-lg shadow-accent-green/20">
                Publish Update
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-sm font-black uppercase text-neutral-400 tracking-[3px]">Published Content</h3>
               <Badge className="bg-neutral-100 text-neutral-500 font-bold border-none">{news.length} Articles</Badge>
            </div>
            {news.map((item) => (
              <div key={item.id} className="p-6 bg-white border border-neutral-100 rounded-3xl flex items-center justify-between group hover:shadow-xl hover:shadow-neutral-400/5 transition-all duration-500">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-400 group-hover:bg-accent-green group-hover:text-white transition-all duration-500">
                    <BarChart3 size={20} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-lg text-neutral-800 tracking-tight group-hover:text-accent-green transition-colors">{item.title}</h4>
                    <div className="flex gap-3 items-center mt-1">
                      <Badge variant="secondary" className="bg-accent-green/5 text-accent-green font-bold text-[0.6rem] px-2">{item.category}</Badge>
                      <span className="text-[0.65rem] font-black text-neutral-300 uppercase tracking-widest">{item.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                  <Button size="icon" variant="ghost" className="rounded-xl bg-neutral-50 text-neutral-400 hover:bg-neutral-100"><ExternalLink size={18} /></Button>
                  <Button onClick={() => deleteNews(item.id)} size="icon" variant="ghost" className="rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white"><Trash2 size={18} /></Button>
                </div>
              </div>
            ))}
            {news.length === 0 && (
              <div className="h-64 border-2 border-dashed border-neutral-100 rounded-[3rem] flex items-center justify-center text-neutral-300 flex-col gap-4">
                 <Eye size={40} strokeWidth={1} />
                 <p className="font-black uppercase tracking-widest text-xs">No active publications</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
