import React from 'react';
import {
  Building,
  Search,
  MoreVertical,
  Link2,
  Activity,
  ShieldCheck,
  Globe,
  Plus,
  BarChart3,
  Palette,
  Eye,
  Settings,
  DollarSign,
  AlertTriangle,
  Layers,
  Shield,
  Lock,
  Unlock,
  Info,
  Monitor, // Added Monitor import
  Zap
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { SlideOver } from '@/src/components/ui/SlideOver';
import { providers as mockProviders, aggregators, clients as mockClients } from '@/src/data/mockData';
import { useImpersonation } from '@/src/lib/ImpersonationContext';

export function Clients() {
  const [selectedClient, setSelectedClient] = React.useState<any>(null);
  const [isAddCasinoOpen, setIsAddCasinoOpen] = React.useState(false);
  const { impersonationId, setImpersonationId } = useImpersonation();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">Casinos</h1>
          <p className="text-sm text-zinc-400 mt-1">Manage operator identities and their assigned aggregator configurations.</p>
        </div>
        <button
          onClick={() => setIsAddCasinoOpen(true)}
          className="bg-emerald-600 text-zinc-950 px-4 py-2 rounded-md text-sm font-bold hover:bg-emerald-500 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Casino
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/50">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
            <input
              type="text"
              placeholder="Search casinos by name, region or license..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 focus:border-emerald-500/50 outline-none transition-all placeholder:text-zinc-700"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950/50 border-b border-zinc-800 text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-6 py-4">Casino Entity</th>
                <th className="px-6 py-4">Region & License</th>
                <th className="px-6 py-4">Authorized Aggregators</th>
                <th className="px-6 py-4">Activity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {mockClients.map((client) => (
                <tr
                  key={client.id}
                  onClick={() => setSelectedClient(client)}
                  className="hover:bg-zinc-800/40 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-5">
                    <div className="font-bold text-zinc-100">{client.name}</div>
                    <div className="text-[10px] text-zinc-600 font-mono mt-0.5">{client.id}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-zinc-300">
                      <Globe className="w-4 h-4 text-zinc-500" />
                      <span className="font-semibold text-xs">{client.region}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] font-bold mt-1 uppercase">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {client.license}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-1.5">
                      {client.packs.map((pack, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-800 text-zinc-400 text-[10px] font-black border border-zinc-700 uppercase">
                          <Link2 className="w-3 h-3 text-zinc-600" />
                          {pack}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 sm:hidden" />
                      <span className="font-mono font-bold text-zinc-200">{client.activeGames.toLocaleString()}</span>
                      <span className="text-[10px] text-zinc-600 font-bold uppercase">Games</span>
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-1 flex items-center gap-1 font-medium">
                      <Activity className="w-3 h-3 text-zinc-700" />
                      Synced {client.lastSync}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest",
                      client.status === 'Active'
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : "bg-red-500/10 text-red-500 border-red-500/20"
                    )}>
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        client.status === 'Active' ? "bg-emerald-500" : "bg-red-500"
                      )}></span>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-1.5 text-zinc-600 hover:text-zinc-100 rounded-md hover:bg-zinc-800 transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

            {/* Site Admin Access Controls - For Platform Admin only */}
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
              <button className="flex-[2] py-4 bg-emerald-600 text-zinc-950 rounded-2xl font-black text-[11px] hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/20 uppercase tracking-widest">
                Commit account settings
              </button>
            </div>
          </div>
        )}
      </SlideOver>
      <SlideOver
        isOpen={isAddCasinoOpen}
        onClose={() => setIsAddCasinoOpen(false)}
        title="Provision New Casino Node"
      >
        <div className="space-y-8 pb-32">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white tracking-tighter uppercase">Casino Onboarding</h3>
            <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest">Global platform enrollment process</p>
          </div>

          {/* Onboarding Form */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Casino Identity Name</label>
                <input
                  type="text"
                  placeholder="e.g., Diamond Palace Int."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Internal Protocol Slug (ID)</label>
                <div className="flex">
                  <span className="bg-zinc-900 border border-r-0 border-zinc-800 rounded-l-xl px-4 py-3 text-xs text-zinc-500 font-bold">cl_</span>
                  <input
                    type="text"
                    placeholder="diamond_palace"
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-r-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Primary Jurisdiction</label>
                <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer">
                  <option>Malta (MGA)</option>
                  <option>Curacao (GC)</option>
                  <option>Isle of Man</option>
                  <option>Philippines (PAGCOR)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Initial License</label>
                <input
                  type="text"
                  placeholder="B2C-109-2024"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Infrastructure Connectivity</label>
              <div className="grid grid-cols-1 gap-2">
                {aggregators.map(agg => (
                  <label key={agg.id} className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl cursor-pointer hover:border-zinc-700 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-zinc-950 rounded-lg group-hover:text-emerald-500 transition-colors">
                        <Layers className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-zinc-200">{agg.name} Platform</span>
                    </div>
                    <input type="checkbox" className="w-5 h-5 bg-zinc-950 border-zinc-800 rounded accent-emerald-500" />
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-2xl flex gap-4">
            <Info className="w-5 h-5 text-emerald-500 shrink-0" />
            <p className="text-[10px] text-zinc-400 leading-relaxed uppercase font-bold tracking-tight">
              Provisioning a new casino node creates an isolated tenant environment. You will be able to customize the UI theme and game limits after initial setup.
            </p>
          </div>

          <div className="fixed bottom-0 right-0 w-full max-w-xl p-6 bg-zinc-950 border-t border-zinc-800 flex gap-3 z-10 backdrop-blur-xl bg-zinc-950/90">
            <button
              onClick={() => setIsAddCasinoOpen(false)}
              className="flex-1 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl font-black text-[11px] text-zinc-500 hover:text-white transition-all uppercase tracking-widest"
            >
              Cancel Setup
            </button>
            <button
              onClick={() => setIsAddCasinoOpen(false)}
              className="flex-[2] py-4 bg-emerald-600 text-zinc-950 rounded-2xl font-black text-[11px] hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/20 uppercase tracking-widest"
            >
              Initialize Casino Node
            </button>
          </div>
        </div>
      </SlideOver>
    </div>
  );
}
