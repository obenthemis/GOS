import React from 'react';
import {
  Gamepad2,
  Building2,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Zap,
  ShieldCheck,
  TrendingUp,
  Monitor,
  Plus,
  MoreVertical,
  Link2,
  Globe,
  BarChart3,
  Palette,
  Eye,
  Settings,
  AlertTriangle,
  Layers,
  Info
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { cn } from '@/src/lib/utils';
import { SlideOver } from '@/src/components/ui/SlideOver';
import { clients as mockClients, aggregators } from '@/src/data/mockData';
import { useImpersonation } from '@/src/lib/ImpersonationContext';

const data = [
  { name: 'Mon', ggr: 4000 },
  { name: 'Tue', ggr: 3000 },
  { name: 'Wed', ggr: 2000 },
  { name: 'Thu', ggr: 2780 },
  { name: 'Fri', ggr: 1890 },
  { name: 'Sat', ggr: 2390 },
  { name: 'Sun', ggr: 3490 },
];

export function Dashboard({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const { setImpersonationId } = useImpersonation();
  const [selectedClient, setSelectedClient] = React.useState<any>(null);
  const stats = [
    { label: 'Platform Titles', value: '4,821', change: '+12%', icon: Gamepad2, trend: 'up' },
    { label: 'Active Providers', value: '42', change: '+2', icon: Building2, trend: 'up' },
    { label: 'Active Casinos', value: '18', change: '-1', icon: Users, trend: 'down' },
    { label: 'Global Margin', value: '14.2%', change: '+0.4%', icon: TrendingUp, trend: 'up' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white">Global Command Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-1 uppercase font-black tracking-widest text-[10px]">Infrastructure Health & Multi-Tenant Performance</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-4 py-2 rounded-xl text-[10px] font-black hover:text-white transition-all uppercase tracking-widest">
            Export Report
          </button>
          <button className="bg-emerald-600 text-zinc-950 px-6 py-2 rounded-xl text-xs font-black hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/10 uppercase tracking-widest">
            Node Sync Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-2xl border border-zinc-800 shadow-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <stat.icon className="w-16 h-16 text-emerald-500" />
            </div>
            <div className="flex justify-between items-start relative z-10">
              <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-emerald-500 shadow-inner">
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={cn(
                "text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 border uppercase tracking-tighter",
                stat.trend === 'up' ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' : 'text-red-500 bg-red-500/10 border-red-500/20'
              )}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </span>
            </div>
            <div className="mt-6 relative z-10">
              <h3 className="text-4xl font-black text-white tracking-tighter">{stat.value}</h3>
              <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mt-2">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Casinos Overview Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-black text-zinc-100 uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Active Casinos Performance
          </h3>
          <button
            onClick={() => setActiveTab('clients')}
            className="text-[10px] font-black text-zinc-500 hover:text-emerald-500 transition-colors uppercase tracking-widest underline decoration-zinc-800 underline-offset-4"
          >
            View All Operators
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockClients.map(casino => (
            <div key={casino.id} className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl group overflow-hidden">
              {/* Background Gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-all" />

              <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-white tracking-tight">{casino.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{casino.region}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-800" />
                    <span className="text-[9px] font-black text-emerald-500/70 uppercase tracking-widest">{casino.license}</span>
                  </div>
                </div>
                <button
                  onClick={() => setImpersonationId(casino.id)}
                  className="p-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-500 hover:text-emerald-500 hover:border-emerald-500/30 transition-all shadow-inner"
                >
                  <Zap className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-zinc-950/50 border border-zinc-800/50 rounded-2xl">
                  <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-none">24H Revenue</p>
                  <p className="text-xl font-black text-white mt-1.5 tracking-tighter">
                    ${(Math.random() * 50000 + 10000).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="p-3 bg-zinc-950/50 border border-zinc-800/50 rounded-2xl">
                  <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-none">Catalog</p>
                  <p className="text-xl font-black text-zinc-400 mt-1.5 tracking-tighter">
                    {casino.activeGames} <span className="text-zinc-700 text-[10px]">GAMES</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center">
                      <Activity className="w-3 h-3 text-zinc-600" />
                    </div>
                  ))}
                  <div className="w-6 h-6 rounded-full bg-zinc-950 border-2 border-zinc-900 flex items-center justify-center text-[8px] font-black text-zinc-500 uppercase">
                    +12
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedClient(casino)}
                    className="flex-1 px-4 py-2 bg-zinc-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-zinc-950 transition-all border border-zinc-700 hover:border-emerald-500/30"
                  >
                    Manage
                  </button>
                  <button
                    onClick={() => setImpersonationId(casino.id)}
                    className="flex-1 px-4 py-2 bg-emerald-600/10 text-emerald-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-zinc-950 transition-all border border-emerald-500/20"
                  >
                    Launch Portal
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Provision New Casino Placeholder */}
          <button
            onClick={() => setActiveTab('clients')}
            className="relative bg-zinc-950 border border-dashed border-zinc-800 rounded-3xl p-6 group hover:border-emerald-500/50 hover:bg-zinc-900 transition-all flex flex-col items-center justify-center text-center space-y-4 min-h-[280px]"
          >
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-700 group-hover:text-emerald-500 group-hover:scale-110 transition-all duration-500 shadow-inner">
              <Plus className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <p className="text-zinc-500 font-black uppercase tracking-widest text-xs">Awaiting Onboarding</p>
              <p className="text-[10px] text-zinc-700 font-medium uppercase tracking-tighter">Provision a new dedicated Casino Node</p>
            </div>
            <div className="pt-4">
              <span className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-emerald-600/10 group-hover:text-emerald-500 group-hover:border-emerald-500/20 transition-all">
                Initiate Provisioning
              </span>
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900/50 backdrop-blur-sm p-8 rounded-2xl border border-zinc-800 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-black text-zinc-100 uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-500" />
              Revenue Flow Analysis (7D)
            </h3>
            <div className="flex bg-zinc-950 border border-zinc-800 rounded-lg p-1">
              <button className="px-3 py-1 bg-zinc-800 text-white rounded-md text-[10px] font-black uppercase tracking-tighter shadow-sm">GGR Flow</button>
              <button className="px-3 py-1 text-zinc-600 hover:text-zinc-300 rounded-md text-[10px] font-black uppercase tracking-tighter">Bet Count</button>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGgr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#3f3f46', fontWeight: 700 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#3f3f46', fontWeight: 700 }} dx={0} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#18181b" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#09090b', borderRadius: '12px', border: '1px solid #27272a', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
                  itemStyle={{ color: '#10b981', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase' }}
                  labelStyle={{ color: '#71717a', fontSize: '10px', fontWeight: 700, marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="ggr" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorGgr)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-2xl border border-zinc-800 shadow-xl flex flex-col">
          <h3 className="text-sm font-black text-zinc-100 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            Infrastructure Logs
          </h3>
          <div className="flex-1 overflow-y-auto space-y-6">
            {[
              { time: '10 mins ago', msg: 'SoftSwiss: Provisioned 12 nodes', type: 'success' },
              { time: '1 hour ago', msg: 'EveryMatrix: RTP logic optimized', type: 'info' },
              { time: '3 hours ago', msg: 'Evolution: Sync latency detected', type: 'error' },
              { time: '5 hours ago', msg: 'SoftSwiss: Matrix propagation complete', type: 'success' },
              { time: '1 day ago', msg: 'NetEnt: Certificate renewal pending', type: 'warning' },
            ].map((log, i) => (
              <div key={i} className="flex gap-4 group/log">
                <div className="mt-1">
                  <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)] ${log.type === 'success' ? 'bg-emerald-500 shadow-emerald-500/50' :
                    log.type === 'error' ? 'bg-red-500 shadow-red-500/50' :
                      log.type === 'warning' ? 'bg-amber-500 shadow-amber-500/50' : 'bg-blue-500 shadow-blue-500/50'
                    }`} />
                </div>
                <div className="flex-1 border-b border-zinc-800/50 pb-4 group-last/log:border-b-0">
                  <p className="text-xs text-zinc-100 font-bold leading-tight">{log.msg}</p>
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter mt-1">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-3 text-[10px] font-black text-zinc-500 hover:text-white border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-all uppercase tracking-widest">
            Audit Complete History
          </button>
        </div>
      </div>
      <SlideOver
        isOpen={!!selectedClient}
        onClose={() => setSelectedClient(null)}
        title="Casino Overview & Catalog"
      >
        {selectedClient && (
          <div className="space-y-8 pb-32">
            {/* Header section with Perspective Toggle */}
            <div className="flex justify-between items-start pt-2">
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Casino Entity</p>
                  <h3 className="text-2xl font-black text-white leading-none">{selectedClient.name}</h3>
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-black text-zinc-500 uppercase tracking-widest">{selectedClient.id}</span>
                  <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-black text-emerald-500 uppercase tracking-widest">{selectedClient.region}</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <button
                  onClick={() => setImpersonationId(selectedClient.id)}
                  className="px-6 py-3 bg-emerald-600 text-zinc-950 rounded-xl font-black text-xs hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-widest flex items-center gap-2"
                >
                  <Monitor className="w-4 h-4" />
                  Manage Casino Portal
                </button>
              </div>
            </div>

            {/* Financial Overview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-blue-500 mb-2">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">Revenue (GGR)</span>
                </div>
                <p className="text-xl font-black text-white">$142,500.00</p>
                <p className="text-[10px] text-emerald-500 font-bold mt-1">+12.4% vs last month</p>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-purple-500 mb-2">
                  <Palette className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">UI Theme</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-600" />
                  <p className="text-sm font-bold text-white uppercase tracking-tighter">Midnight Blue</p>
                </div>
                <button className="text-[10px] text-zinc-500 hover:text-white mt-1 font-black uppercase underline tracking-widest">Edit Skin</button>
              </div>
            </div>

            {/* Aggregator Enrollment */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-emerald-500">
                  <Layers className="w-5 h-5" />
                  <h4 className="font-black uppercase tracking-widest text-xs">Aggregator Enrollment</h4>
                </div>
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Active Connectivity</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {aggregators.map(agg => {
                  const isEnrolled = selectedClient.packs.some((p: string) => p.toLowerCase().includes(agg.id.toLowerCase()));
                  return (
                    <div key={agg.id} className={cn(
                      "p-4 rounded-2xl border transition-all flex items-center justify-between group",
                      isEnrolled ? "bg-zinc-900 border-zinc-800" : "bg-zinc-950 border-zinc-900/50 opacity-60"
                    )}>
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "p-2.5 rounded-xl border transition-colors",
                          isEnrolled ? "bg-zinc-950 border-zinc-800 text-emerald-500" : "bg-zinc-900 border-zinc-800 text-zinc-700"
                        )}>
                          <Zap className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-white leading-none uppercase tracking-tighter">{agg.name} Platform</p>
                          <p className="text-[10px] text-zinc-600 font-bold mt-1 uppercase">
                            {isEnrolled ? 'Operational · Connected' : 'Inactive · Disconnected'}
                          </p>
                        </div>
                      </div>

                      <button className={cn(
                        "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                        isEnrolled
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20"
                          : "bg-zinc-800 border-zinc-700 text-zinc-500 hover:text-white"
                      )}>
                        {isEnrolled ? 'Disable Access' : 'Activate Node'}
                      </button>
                    </div>
                  );
                })}
              </div>

              <p className="text-[10px] text-zinc-500 font-medium leading-relaxed bg-zinc-950 p-3 rounded-xl border border-zinc-900">
                <Info className="w-3.5 h-3.5 inline mr-1 text-zinc-700" />
                Aggregator activation provides high-speed access to the underlying provider matrix. Disabling an aggregator will immediately cut all connectivity to its associated games for this casino.
              </p>
            </div>

            <button
              onClick={() => {
                setImpersonationId(selectedClient.id);
                setSelectedClient(null);
              }}
              className="w-full py-4 bg-emerald-600 text-zinc-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <Monitor className="w-4 h-4" />
              Launch Provider Matrix
            </button>

            {/* Account Access Privileges */}
            <div>
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Account Access Privileges</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-900 rounded-lg">
                      <Eye className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Financial Insights</p>
                      <p className="text-[10px] text-zinc-600">Operator can view real-time margin & payout data</p>
                    </div>
                  </div>
                  <div className="w-10 h-5 bg-emerald-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-900 rounded-lg">
                      <Settings className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Self-Service Gating</p>
                      <p className="text-[10px] text-zinc-600">Operator may toggle their own providers/games</p>
                    </div>
                  </div>
                  <div className="w-10 h-5 bg-zinc-800 rounded-full relative opacity-50">
                    <div className="absolute left-1 top-1 w-3 h-3 bg-zinc-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-2xl flex gap-4 items-start">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="text-xs text-amber-200/70 leading-relaxed">
                <span className="font-bold text-amber-500 uppercase tracking-tighter">Compliance Notice:</span> Casino restrictions are absolute. Overrides in the Aggregator Matrix will not bypass casino-level disabling.
              </p>
            </div>

            {/* Sticky Action Bar */}
            <div className="fixed bottom-0 right-0 w-full max-w-xl p-6 bg-zinc-950 border-t border-zinc-800 flex gap-3 z-10 backdrop-blur-xl bg-zinc-950/90 shadow-2xl">
              <button className="flex-1 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl font-black text-[11px] text-zinc-500 hover:text-white transition-all uppercase tracking-widest">
                Audit Logs
              </button>
              <button
                onClick={() => setSelectedClient(null)}
                className="flex-[2] py-4 bg-emerald-600 text-zinc-950 rounded-2xl font-black text-[11px] hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/20 uppercase tracking-widest"
              >
                Commit account settings
              </button>
            </div>
          </div>
        )}
      </SlideOver>
    </div>
  );
}
