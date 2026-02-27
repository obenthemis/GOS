import React, { useState, useMemo } from 'react';
import {
  Building2,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MoreVertical,
  Plus,
  ArrowRight,
  Monitor,
  Smartphone,
  Zap,
  Tag as TagIcon,
  ChevronRight,
  Layers,
  Globe,
  Database,
  Pencil,
  Infinity
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { SlideOver } from '@/src/components/ui/SlideOver';
import { providers as mockProviders, aggregators, Provider, FeeGroup } from '@/src/data/mockData';

export function Providers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAggregator, setSelectedAggregator] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [showFetchModal, setShowFetchModal] = useState(false);

  // Filter Logic
  const filteredProviders = useMemo(() => {
    return mockProviders.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchAgg = selectedAggregator === 'all' || p.aggregatorId === selectedAggregator;
      const matchStatus = selectedStatus === 'all' || p.status.toLowerCase() === selectedStatus.toLowerCase();
      return matchSearch && matchAgg && matchStatus;
    });
  }, [searchTerm, selectedAggregator, selectedStatus]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'passive': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'disabled': return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
      default: return 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">Providers Catalog</h1>
          <p className="text-sm text-zinc-400 mt-1">Administrative control center for game producers and delivery nodes.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowFetchModal(true)}
            className="bg-zinc-950 border border-zinc-700 text-zinc-100 px-4 py-2 rounded-md text-sm font-bold hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/5"
          >
            <Zap className="w-4 h-4 text-emerald-500" />
            Fetch Games
          </button>
          <button className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-700 transition-colors border border-zinc-700">
            Export Matrix
          </button>
          <button className="bg-emerald-600 text-zinc-950 px-4 py-2 rounded-md text-sm font-bold hover:bg-emerald-500 transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/10">
            <Plus className="w-4 h-4" />
            Provision Provider
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input
            type="text"
            placeholder="Search by provider name, production ID, or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 focus:border-emerald-500/50 outline-none transition-all placeholder:text-zinc-700"
          />
        </div>

        <div className="flex bg-zinc-950 border border-zinc-800 rounded-lg p-1">
          <select
            value={selectedAggregator}
            onChange={(e) => setSelectedAggregator(e.target.value)}
            className="bg-transparent text-zinc-400 text-xs font-bold uppercase tracking-widest px-3 py-1 outline-none"
          >
            <option value="all">Any Aggregator</option>
            {aggregators.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>

        <div className="flex bg-zinc-950 border border-zinc-800 rounded-lg p-1">
          {['All', 'Active', 'Passive', 'Disabled'].map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status.toLowerCase())}
              className={cn(
                "px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter transition-all",
                selectedStatus === status.toLowerCase()
                  ? "bg-zinc-800 text-emerald-400 shadow-sm"
                  : "text-zinc-600 hover:text-zinc-400"
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* High-Density Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950/50 border-b border-zinc-800 text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-6 py-4">Provider Entity</th>
                <th className="px-6 py-4">Routing / Aggregator</th>
                <th className="px-6 py-4 text-center">Feature Groups</th>
                <th className="px-6 py-4 text-center">Inventory</th>
                <th className="px-6 py-4">Capabilities</th>
                <th className="px-6 py-4 text-center">Operational Status</th>
                <th className="px-6 py-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {filteredProviders.map((provider) => {
                const aggregator = aggregators.find(a => a.id === provider.aggregatorId);
                const isActive = provider.status === 'Active';

                return (
                  <tr
                    key={provider.id}
                    onClick={() => setSelectedProvider(provider)}
                    className="hover:bg-zinc-800/40 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-emerald-500 transition-colors overflow-hidden">
                          {provider.logoUrl ? <img src={provider.logoUrl} className="w-full h-full object-cover" /> : <Building2 className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">{provider.name}</div>
                          <div className="text-[10px] text-zinc-600 font-mono mt-0.5">{provider.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-semibold text-xs text-zinc-300">
                        <Globe className="w-3 h-3 text-zinc-600" />
                        {aggregator?.name}
                      </div>
                      <div className="text-[9px] text-zinc-600 font-black uppercase tracking-tighter mt-0.5">Primary Node</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-2 px-2 py-1 bg-zinc-950 border border-zinc-800 rounded-lg">
                        <TagIcon className="w-3 h-3 text-emerald-500" />
                        <span className="font-mono font-bold text-zinc-200">{provider.feeGroups.length}</span>
                        <span className="text-[9px] text-zinc-600 font-black uppercase">Groups</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="font-mono font-bold text-zinc-200">{provider.totalGames}</div>
                      <div className="text-[9px] text-zinc-600 font-black uppercase tracking-widest mt-0.5">Total Titles</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3 text-zinc-700">
                        <Smartphone className={cn("w-3.5 h-3.5", provider.mobileSupport ? "text-zinc-400" : "opacity-20")} />
                        <Zap className={cn("w-3.5 h-3.5", provider.liveSupport ? "text-amber-500/50" : "opacity-20")} />
                        <div className="flex gap-1">
                          {provider.contentTypes.slice(0, 2).map(t => (
                            <span key={t} className="text-[8px] font-black uppercase tracking-tighter bg-zinc-950 px-1 border border-zinc-800 text-zinc-600">{t}</span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-4">
                          <span className={cn(
                            "text-[9px] font-black uppercase tracking-wider",
                            isActive ? "text-emerald-500" : "text-zinc-600"
                          )}>
                            {provider.status}
                          </span>
                          <button className={cn(
                            "w-8 h-4 rounded-full relative transition-all",
                            isActive ? "bg-emerald-600" : "bg-zinc-800"
                          )} onClick={(e) => e.stopPropagation()}>
                            <div className={cn(
                              "absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all",
                              isActive ? "right-0.5" : "left-0.5 bg-zinc-500"
                            )} />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ChevronRight className="w-4 h-4 text-zinc-800 group-hover:text-zinc-100 transition-colors" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Action Footer */}
        <div className="p-4 bg-zinc-950/50 border-t border-zinc-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
              <Database className="w-3 h-3" />
              Data Integrity: Verified
            </div>
          </div>
          <div className="flex gap-1">
            {[1, 2].map(p => (
              <button key={p} className={cn(
                "w-7 h-7 flex items-center justify-center rounded text-[10px] font-black transition-all",
                p === 1 ? "bg-zinc-800 text-emerald-400" : "text-zinc-600 hover:text-zinc-300"
              )}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Provider Details SlideOver - ALIGNED WITH REFERENCE IMAGE */}
      <SlideOver
        isOpen={!!selectedProvider}
        onClose={() => setSelectedProvider(null)}
        title="Provider Details"
      >
        {selectedProvider && (
          <div className="space-y-8 pb-10">
            {/* Header section - Strict Alignment with Toggle Reference */}
            <div className="pt-2 flex justify-between items-start">
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Name</p>
                  <h3 className="text-3xl font-black text-white tracking-tight leading-none">{selectedProvider.name}</h3>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-zinc-400">{selectedProvider.producer}</p>
                  <p className="text-xs font-mono text-zinc-500">{selectedProvider.slug}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {/* Operation Toggle */}
                <div className="flex items-center gap-3">
                  <button className={cn(
                    "w-12 h-6 rounded-full relative transition-all duration-300",
                    selectedProvider.status === 'Active' ? "bg-emerald-600 shadow-lg shadow-emerald-500/20" : "bg-rose-500 shadow-lg shadow-rose-500/20"
                  )}>
                    <div className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm",
                      selectedProvider.status === 'Active' ? "right-1" : "left-1"
                    )} />
                  </button>
                  <span className="text-sm font-bold text-white tracking-tight">{selectedProvider.status === 'Active' ? 'Enabled' : 'Disabled'}</span>
                </div>

                {/* Production Mode Toggle */}
                <div className="flex items-center gap-3">
                  <button className="w-12 h-6 rounded-full relative bg-lime-800/50 border border-lime-500/30">
                    <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-zinc-400 shadow-sm" />
                  </button>
                  <span className="text-sm font-bold text-zinc-500 tracking-tight">Production Mode</span>
                </div>
              </div>
            </div>

            {/* Metrics Labeled Row */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-xs font-semibold text-zinc-500 mb-1">Aggregator</p>
                <p className="text-zinc-100 font-bold text-lg">{aggregators.find(a => a.id === selectedProvider.aggregatorId)?.name}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-500 mb-1">Total Games</p>
                <p className="text-zinc-100 font-bold text-lg">{selectedProvider.totalGames} Games</p>
              </div>
            </div>

            {/* Colored Badges Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-zinc-500 mb-3">Live Games Support</p>
                <span className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tight inline-block",
                  selectedProvider.liveSupport ? "bg-lime-500 text-zinc-950" : "bg-rose-500 text-white"
                )}>
                  {selectedProvider.liveSupport ? 'Supported' : 'Not Supported'}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-500 mb-3">Mobile Games Support</p>
                <span className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tight inline-block",
                  selectedProvider.mobileSupport ? "bg-lime-500 text-zinc-950" : "bg-rose-500 text-white"
                )}>
                  {selectedProvider.mobileSupport ? 'Supported' : 'Not Supported'}
                </span>
              </div>
            </div>

            {/* Game Content Types Selection Grid */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Game Content Types</h4>
              <div className="flex flex-wrap gap-2">
                {['Slot', 'Casino', 'Bet', 'Crash', 'Virtual', 'Lottery'].map(type => (
                  <div
                    key={type}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-xs font-bold border transition-all",
                      selectedProvider.contentTypes.includes(type)
                        ? "bg-emerald-500 text-zinc-950 border-emerald-400"
                        : "bg-zinc-800/50 text-zinc-400 border-zinc-700/50 opacity-80"
                    )}
                  >
                    {type}
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Groups List */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Feature Groups</h4>
              <div className="space-y-2">
                {selectedProvider.feeGroups.map((fg, index) => (
                  <div key={fg.id} className="flex items-center gap-3">
                    <div className="bg-zinc-800 text-zinc-500 text-[10px] font-bold px-1.5 py-1 rounded w-6 flex items-center justify-center">
                      #{index + 2}
                    </div>
                    <div className="flex-1 bg-zinc-800/40 border border-zinc-800 rounded px-4 py-2 flex items-center justify-between">
                      <span className="text-white font-bold text-sm">{fg.name}</span>
                      <div className="flex gap-2">
                        <span className="bg-zinc-800 text-zinc-400 text-[10px] px-2 py-1 rounded font-bold uppercase">{fg.gameCount} Games</span>
                        <span className="bg-emerald-500/10 text-emerald-500 text-[10px] px-2 py-1 rounded font-bold uppercase border border-emerald-500/20">{fg.ggr}% GGR</span>
                        <span className="bg-emerald-500/10 text-emerald-500 text-[10px] px-2 py-1 rounded font-bold uppercase border border-emerald-500/20">{fg.baseRate}% GGR Base</span>
                      </div>
                    </div>
                    <button className="p-2 bg-amber-600/20 text-amber-500 rounded-full hover:bg-amber-600/40 transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Feature Group Box */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 mt-8">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Group Name"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 outline-none focus:border-emerald-500 transition-all text-sm"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="GGR %"
                    className="px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 outline-none focus:border-emerald-500 transition-all text-sm font-mono"
                  />
                  <input
                    type="text"
                    placeholder="Base %"
                    className="px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 outline-none focus:border-emerald-500 transition-all text-sm font-mono"
                  />
                </div>
                <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  Append Feature Group
                </button>
              </div>
            </div>
          </div>
        )}
      </SlideOver>

      {/* Fetch Simulation Modal */}
      {showFetchModal && (
        <FetchSimulationModal onClose={() => setShowFetchModal(false)} />
      )}
    </div>
  );
}

function FetchSimulationModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<'syncing' | 'completed'>('syncing');
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    if (step === 'syncing') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep('completed'), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        {step === 'syncing' ? (
          <div className="p-12 text-center space-y-8">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full" />
              <div
                className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"
                style={{ animationDuration: '1s' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className="w-10 h-10 text-emerald-500 animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white tracking-tight uppercase">Aggregator Node Sync</h3>
              <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest">Bridging SoftSwiss & Nivo Infrastructure...</p>
            </div>

            <div className="space-y-4">
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                <span>{progress < 40 ? 'Connecting Nodes' : progress < 80 ? 'Streaming Catalog' : 'Calculating Diffs'}</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-[600px]">
            <div className="p-8 border-b border-zinc-800 bg-zinc-950/50 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">SYNC COMPLETED</h3>
                <p className="text-emerald-500 text-xs font-black uppercase tracking-widest mt-1">Staging Manifest Generated</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-zinc-800 rounded-full text-zinc-500 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-inner">
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Titles Processed</p>
                  <p className="text-3xl font-black text-white">1,850</p>
                  <p className="text-[10px] font-bold text-emerald-500 mt-2">+122 New Artifacts</p>
                </div>
                <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-inner">
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Active Nodes</p>
                  <p className="text-3xl font-black text-white">77</p>
                  <p className="text-[10px] font-bold text-zinc-500 mt-2">Aggregated Sources</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Incremental Changelog (Review Required)</h4>
                <div className="space-y-3">
                  {[
                    { type: 'NEW', entity: 'Game', label: 'Maca Mystery 777', detail: 'Provider: NetEnt', color: 'text-emerald-500 bg-emerald-500/10' },
                    { type: 'MOD', entity: 'Setting', label: 'RTP Optimization', detail: '98.45% → 96.20% (Pragmatic Play)', color: 'text-amber-500 bg-amber-500/10' },
                    { type: 'NEW', entity: 'Provider', label: 'BetGames.TV', detail: 'Nivo Gateway Integration', color: 'text-blue-500 bg-blue-500/10' },
                    { type: 'DEL', entity: 'Game', label: 'Legacy Reel 1', detail: 'Decommissioned by Evolution', color: 'text-rose-500 bg-rose-500/10' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-zinc-950 border border-zinc-800 rounded-xl group hover:border-zinc-700 transition-all">
                      <span className={cn("px-2 py-1 rounded text-[9px] font-black uppercase tracking-tighter", item.color)}>
                        {item.type}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white leading-none">{item.label}</p>
                        <p className="text-[10px] text-zinc-500 mt-1 uppercase font-bold tracking-widest">{item.detail}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-700" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-zinc-950 border-t border-zinc-800 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-zinc-900 border border-zinc-800 rounded-xl font-bold text-sm text-zinc-300 hover:bg-zinc-800 transition-all uppercase tracking-widest"
              >
                Shadow Discard
              </button>
              <button
                onClick={() => {
                  onClose();
                  // In a real app we'd navigate here
                  window.dispatchEvent(new CustomEvent('nav', { detail: 'updates' }));
                }}
                className="flex-[2] py-3 bg-emerald-600 text-zinc-950 rounded-xl font-black text-sm hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/10 uppercase tracking-widest"
              >
                Proceed to Staging Review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
