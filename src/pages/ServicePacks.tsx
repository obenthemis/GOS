import React, { useState } from 'react';
import {
  Package,
  Search,
  ArrowRight,
  CheckCircle2,
  Settings2,
  Users,
  Building2,
  Globe,
  Tag,
  ShieldCheck,
  Zap,
  MapPin,
  Filter,
  AlertTriangle,
  X
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { aggregators, providers, Provider } from '@/src/data/mockData';

export function ServicePacks() {
  const [selectedAggregator, setSelectedAggregator] = useState(aggregators[0]);
  const [showRuleConfig, setShowRuleConfig] = useState<string | null>(null);

  const aggregatorProviders = providers.filter(p => p.aggregatorId === selectedAggregator.id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">Aggregator Matrix</h1>
          <p className="text-sm text-zinc-400 mt-1">Platform-wide management panel for defining game availability and regional rules.</p>
        </div>
        <button className="bg-emerald-600 text-zinc-950 px-4 py-2 rounded-md text-sm font-bold hover:bg-emerald-500 transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/10">
          <Package className="w-4 h-4" />
          Provision Aggregator
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Aggregator Sidebar */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-2 mb-2">Selected Aggregator</h3>
          {aggregators.map((agg) => (
            <button
              key={agg.id}
              onClick={() => setSelectedAggregator(agg)}
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left group",
                selectedAggregator.id === agg.id
                  ? "bg-zinc-900 border-emerald-500/50 shadow-lg shadow-emerald-500/5 text-emerald-400"
                  : "bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  selectedAggregator.id === agg.id ? "bg-emerald-500 animate-pulse" : "bg-zinc-800"
                )} />
                <span className="font-bold text-sm">{agg.name}</span>
              </div>
              <ArrowRight className={cn(
                "w-4 h-4 transition-transform",
                selectedAggregator.id === agg.id ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
              )} />
            </button>
          ))}
        </div>

        {/* Aggregator Matrix Detail */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-zinc-800 bg-zinc-950/50">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-500" />
                    {selectedAggregator.name} Matrix
                  </h2>
                  <p className="text-sm text-zinc-500 mt-1">Define availability rules for country, provider, type, and games.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">Global Status</p>
                    <p className="text-[10px] font-black text-emerald-500 uppercase">Operational</p>
                  </div>
                  <div className="w-[1px] h-8 bg-zinc-800" />
                  <Settings2 className="w-5 h-5 text-zinc-700" />
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Availability Rules Quick Bar */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-500/10 rounded-md">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Active Regional Rules: <span className="text-zinc-100">12</span></span>
                </div>
                <div className="h-4 w-[1px] bg-zinc-800" />
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-500/10 rounded-md">
                    <Filter className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Exclusions: <span className="text-zinc-100">4 Providers</span></span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-zinc-100">Provider & Capability Overrides</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                  <input
                    type="text"
                    placeholder="Search matrix nodes..."
                    className="pl-9 pr-4 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-400 focus:border-emerald-500/50 outline-none transition-all placeholder:text-zinc-700 w-64"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {aggregatorProviders.map((p: Provider) => (
                  <div key={p.id} className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden group">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 group-hover:text-emerald-500 transition-colors">
                          {p.logoUrl ? <img src={p.logoUrl} className="w-full h-full object-cover" /> : <Building2 className="w-5 h-5" />}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-zinc-100">{p.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-zinc-500 font-mono">{p.slug}</span>
                            <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest px-1 bg-amber-500/5 border border-amber-500/10 rounded">3 Rules</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex flex-col items-center gap-1">
                          <p className="text-[9px] font-black text-zinc-700 uppercase tracking-tighter">Status</p>
                          <button className={cn(
                            "w-10 h-5 rounded-full relative transition-all",
                            p.status === 'Active' ? "bg-emerald-600" : "bg-zinc-800"
                          )}>
                            <div className={cn(
                              "absolute top-1 w-3 h-3 rounded-full bg-white transition-all",
                              p.status === 'Active' ? "right-1" : "left-1 bg-zinc-500"
                            )} />
                          </button>
                        </div>
                        <button
                          onClick={() => setShowRuleConfig(showRuleConfig === p.id ? null : p.id)}
                          className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-all",
                            showRuleConfig === p.id ? "bg-emerald-500 text-zinc-950 border-emerald-400" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                          )}
                        >
                          <Settings2 className="w-3.5 h-3.5" />
                          {showRuleConfig === p.id ? 'Close Rules' : 'Manage Rules'}
                        </button>
                      </div>
                    </div>

                    {/* Rules Configuration Panel (Strict Brief Compliance) */}
                    {showRuleConfig === p.id && (
                      <div className="bg-zinc-900/50 border-t border-zinc-800 p-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
                            <div className="flex justify-between items-center mb-3">
                              <h5 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Regional Availability</h5>
                              <button className="text-emerald-500 text-[10px] font-black uppercase tracking-widest hover:text-emerald-400">+ Add Region</button>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between bg-zinc-900 p-2 rounded border border-zinc-800/50">
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                                  <span className="text-xs text-zinc-300 font-bold">Turkey (TR)</span>
                                </div>
                                <span className="text-[9px] font-black text-red-500 uppercase bg-red-500/10 px-1.5 py-0.5 rounded">Disabled</span>
                              </div>
                              <div className="flex items-center justify-between bg-zinc-900 p-2 rounded border border-zinc-800/50">
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                                  <span className="text-xs text-zinc-300 font-bold">United Kingdom (UK)</span>
                                </div>
                                <span className="text-[9px] font-black text-emerald-500 uppercase bg-emerald-500/10 px-1.5 py-0.5 rounded">Enabled</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
                            <div className="flex justify-between items-center mb-3">
                              <h5 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Individual Game Gating</h5>
                              <button className="text-emerald-500 text-[10px] font-black uppercase tracking-widest hover:text-emerald-400">View Catalog</button>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between bg-zinc-900 p-2 rounded border border-zinc-800/50">
                                <span className="text-xs text-zinc-300 font-medium">Gates of Olympus</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] text-zinc-600 font-mono">ID: 40375</span>
                                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                                </div>
                              </div>
                              <div className="p-2 border-2 border-dashed border-zinc-800 rounded text-center">
                                <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest italic leading-relaxed">All other games follow provider status.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                          <div className="flex items-center gap-2 text-amber-500">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Rule Conflict Detected: TR Region restriction overrides global provider status.</span>
                          </div>
                          <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest transition-all">Clear All Rules</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-zinc-950/50 border-t border-zinc-800 flex justify-end gap-3 px-6">
              <button className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-widest">Discard Matrix Overrides</button>
              <button className="px-6 py-2 bg-emerald-600 text-zinc-950 shadow-lg shadow-emerald-500/10 rounded-lg text-xs font-black hover:bg-emerald-500 transition-all uppercase tracking-widest">
                Save Platform Matrix
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
