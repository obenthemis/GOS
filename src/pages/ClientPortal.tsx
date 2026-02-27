import React, { useState } from 'react';
import {
    Search,
    Building2,
    Lock,
    Unlock,
    Info,
    Filter,
    ChevronRight,
    ChevronDown,
    Layers,
    Zap,
    Globe,
    AlertTriangle,
    LayoutGrid,
    CheckCircle2,
    XCircle,
    Shield,
    Monitor
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { providers as mockProviders, aggregators, clients as mockClients } from '@/src/data/mockData';

interface ClientPortalProps {
    clientId: string;
}

import { SlideOver } from '@/src/components/ui/SlideOver';

interface ProviderDetailPanelProps {
    provider: any;
    clientId: string;
    isOpen: boolean;
    onClose: () => void;
}

function ProviderDetailPanel({ provider, clientId, isOpen, onClose }: ProviderDetailPanelProps) {
    if (!provider) return null;

    const override = provider.clientOverrides?.find((o: any) => o.clientId === clientId);
    const isGloballyActive = provider.status === 'Active';
    const isClientActive = override ? override.status === 'Active' : isGloballyActive;

    const contentTypes = ['Slot', 'Casino', 'Bet', 'Crash', 'Virtual', 'Lottery'];

    return (
        <SlideOver isOpen={isOpen} onClose={onClose} title="Provider Details">
            <div className="space-y-8">
                {/* ID Header */}
                <div className="flex items-center justify-between">
                    <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                        {provider.id || 'NODE-ID-4af168763a'}
                    </p>
                </div>

                {/* Identity Section */}
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Name</p>
                        <h3 className="text-3xl font-black text-white tracking-tighter leading-tight">{provider.name}</h3>
                        <p className="text-sm font-medium text-zinc-500">{provider.name}</p>
                        <p className="text-xs font-mono text-zinc-600">{provider.slug}</p>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <button className={cn(
                                "w-12 h-6 rounded-full relative transition-all duration-300",
                                isClientActive ? "bg-emerald-500 shadow-lg shadow-emerald-500/20" : "bg-rose-500"
                            )}>
                                <div className={cn(
                                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm",
                                    isClientActive ? "right-1" : "left-1"
                                )} />
                            </button>
                            <span className="text-sm font-black text-white uppercase tracking-tighter">{isClientActive ? 'Enabled' : 'Disabled'}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="w-12 h-6 rounded-full relative bg-lime-500 shadow-lg shadow-lime-500/10">
                                <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white shadow-sm" />
                            </button>
                            <span className="text-sm font-black text-white uppercase tracking-tighter">Production Mode</span>
                        </div>
                    </div>
                </div>

                {/* Content Types */}
                <div className="space-y-3">
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Content Types - {provider.contentTypes?.[0] || 'Slot'}</p>
                    <div className="flex flex-wrap gap-2">
                        {contentTypes.map(type => (
                            <div key={type} className={cn(
                                "px-4 py-2 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-all",
                                provider.contentTypes?.includes(type)
                                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500 shadow-lg shadow-emerald-500/5"
                                    : "bg-zinc-900 border-zinc-800 text-zinc-600 opacity-50"
                            )}>
                                {type}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Infrastructure Metadata */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Aggregator / Provider</p>
                        <p className="text-lg font-black text-white tracking-tight uppercase leading-none">Softswiss</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Volatility Spectrum</p>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-white uppercase">{provider.volatility || 'High'}</span>
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={cn("w-1.5 h-3 rounded-sm", i <= 3 ? "bg-amber-500" : "bg-zinc-800")} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Top Engagement Tags</p>
                    <div className="flex flex-wrap gap-2">
                        {(provider.tags || ['Jackpot', 'Free Spins', 'Bonus Buy', 'Megaways']).map((tag: string) => (
                            <span key={tag} className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Regulatory Licenses</p>
                    <div className="flex gap-2">
                        {(provider.licences || ['MGA', 'Curacao', 'UKGC']).map((lic: string) => (
                            <div key={lic} className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950 border border-zinc-900 rounded-lg">
                                <Globe className="w-3 h-3 text-zinc-600" />
                                <span className="text-[10px] font-black text-zinc-400 uppercase">{lic}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-900">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Last Infrastructure Sync</p>
                        <p className="text-sm font-black text-white tracking-tight uppercase leading-none font-mono">{provider.lastSync || '2/27/2026, 9:22:15 PM'}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Node Game Count</p>
                        <p className="text-xl font-black text-emerald-500 tracking-tighter uppercase leading-none">{provider.totalGames || '-'}</p>
                    </div>
                </div>

                {/* Footer Visual Asset */}
                <div className="pt-8 flex justify-center opacity-30 invert">
                    <div className="flex gap-1.5">
                        <div className="w-12 h-12 bg-zinc-800 rounded flex items-center justify-center font-black text-2xl">1</div>
                        <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/30 rounded flex items-center justify-center font-black text-2xl text-amber-500">S</div>
                        <div className="w-12 h-12 bg-zinc-800 rounded flex items-center justify-center font-black text-2xl">P</div>
                        <div className="w-12 h-12 bg-zinc-800 rounded flex items-center justify-center font-black text-2xl">I</div>
                        <div className="w-12 h-12 bg-zinc-800 rounded flex items-center justify-center font-black text-2xl">N</div>
                    </div>
                </div>
            </div>
        </SlideOver>
    );
}

export function ClientPortal({ clientId }: ClientPortalProps) {
    const client = mockClients.find(c => c.id === clientId);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedAggregators, setExpandedAggregators] = useState<string[]>(aggregators.map(a => a.id));
    const [selectedProvider, setSelectedProvider] = useState<any>(null);

    const toggleAggregator = (id: string) => {
        setExpandedAggregators(prev =>
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );
    };

    if (!client) return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-500 gap-4">
            <AlertTriangle className="w-12 h-12 text-rose-500 opacity-20" />
            <p className="font-black uppercase tracking-widest text-xs">Invalid Tenant Context</p>
        </div>
    );

    return (
        <div className="space-y-8 pb-32">
            {/* Portal Header */}
            <div className="flex justify-between items-end">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                            Impersonation Mode
                        </div>
                        <span className="text-zinc-600 font-bold">/</span>
                        <span className="text-zinc-400 font-bold text-xs uppercase tracking-tighter">{client.name} Portal</span>
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tighter leading-none">
                        Provider Enrollment <span className="text-zinc-800">&</span> Catalog
                    </h1>
                    <p className="text-zinc-500 text-sm font-medium">Manage cross-aggregator availability and client-specific restrictions.</p>
                </div>

                <div className="flex gap-3">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-6">
                        <div>
                            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Catalog Status</p>
                            <p className="text-xl font-black text-white mt-1">{client.activeGames} <span className="text-zinc-600 text-xs">Active Titles</span></p>
                        </div>
                        <div className="w-px h-8 bg-zinc-800" />
                        <div>
                            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Compliance</p>
                            <p className="text-xl font-black text-emerald-500 mt-1 uppercase tracking-tighter">{client.license}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Control Bar */}
            <div className="flex justify-between items-center gap-4 bg-zinc-950/50 backdrop-blur-xl p-2 rounded-2xl border border-zinc-800 sticky top-4 z-40 outline outline-4 outline-zinc-950">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                    <input
                        type="text"
                        placeholder="Filter 200+ providers by name, protocol, or technology..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-zinc-950 border-none rounded-xl text-sm text-zinc-200 outline-none focus:ring-1 focus:ring-emerald-500/20 transition-all placeholder:text-zinc-700 font-bold"
                    />
                </div>
                <div className="flex gap-2 pr-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-black text-zinc-400 hover:text-white transition-all uppercase tracking-widest">
                        <Filter className="w-3.5 h-3.5" />
                        Advanced Filters
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-zinc-950 rounded-xl text-xs font-black hover:bg-emerald-500 transition-all uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                        <Zap className="w-3.5 h-3.5" />
                        Batch Activate
                    </button>
                </div>
            </div>

            {/* Matrix Workspace (High-Density Table) */}
            <div className="space-y-6">
                {aggregators.map(aggregator => {
                    const aggregatorProviders = mockProviders.filter(p =>
                        p.aggregatorId === aggregator.id &&
                        (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.id.toLowerCase().includes(searchTerm.toLowerCase()))
                    );

                    if (aggregatorProviders.length === 0 && searchTerm) return null;

                    const isExpanded = expandedAggregators.includes(aggregator.id);

                    return (
                        <div key={aggregator.id} className="bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
                            {/* Aggregator Header */}
                            <button
                                onClick={() => toggleAggregator(aggregator.id)}
                                className="w-full flex items-center justify-between p-6 bg-zinc-950/50 border-b border-zinc-800/50 hover:bg-zinc-900/40 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "p-2.5 rounded-xl border transition-all",
                                        isExpanded ? "bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20" : "bg-zinc-900 border-zinc-800 text-zinc-600"
                                    )}>
                                        <Layers className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-sm font-black text-white uppercase tracking-widest">{aggregator.name} Platform</h3>
                                        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-tight mt-0.5">
                                            {aggregatorProviders.length} Active Nodes found on {aggregator.name} infrastructure
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    {isExpanded ? <ChevronDown className="w-4 h-4 text-zinc-600" /> : <ChevronRight className="w-4 h-4 text-zinc-600" />}
                                </div>
                            </button>

                            {isExpanded && (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-zinc-950/30 border-b border-zinc-800/50">
                                                <th className="px-6 py-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Provider Node</th>
                                                <th className="px-6 py-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest text-center">Catalog Span</th>
                                                <th className="px-6 py-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest text-center text-nowrap">Content Sync</th>
                                                <th className="px-6 py-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Enrollment Status</th>
                                                <th className="px-6 py-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest text-right">Overrides</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-800/20">
                                            {aggregatorProviders.map(provider => {
                                                const override = provider.clientOverrides?.find(o => o.clientId === clientId);
                                                const isGloballyActive = provider.status === 'Active';
                                                const isClientActive = override ? override.status === 'Active' : isGloballyActive;
                                                const isOverridden = !!override;

                                                return (
                                                    <tr
                                                        key={provider.id}
                                                        onClick={() => setSelectedProvider(provider)}
                                                        className={cn(
                                                            "group/row hover:bg-zinc-800/20 transition-all cursor-pointer",
                                                            !isClientActive && "opacity-40 grayscale"
                                                        )}
                                                    >
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center p-1.5 shadow-inner">
                                                                    {provider.logoUrl ? <img src={provider.logoUrl} className="w-full h-full object-contain" /> : <Building2 className="w-5 h-5 text-zinc-800" />}
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-black text-zinc-100 leading-none group-hover/row:text-white transition-colors uppercase tracking-tighter">{provider.name}</p>
                                                                    <p className="text-[9px] text-zinc-600 font-mono mt-1 uppercase">{provider.id}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-full font-mono text-[9px] font-black text-zinc-400">
                                                                {provider.totalGames} <span className="text-zinc-700">GAMES</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <div className="flex flex-col items-center">
                                                                <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{provider.lastSync || 'Never'}</p>
                                                                <div className="w-24 h-1 bg-zinc-900 rounded-full mt-1.5 overflow-hidden">
                                                                    <div className="bg-emerald-500 h-full w-[85%]" />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-6">
                                                                <div className="flex items-center gap-2">
                                                                    {isClientActive ? (
                                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                                    ) : (
                                                                        <XCircle className="w-4 h-4 text-zinc-700" />
                                                                    )}
                                                                    <span className={cn(
                                                                        "text-[9px] font-black uppercase tracking-widest transition-colors",
                                                                        isClientActive ? "text-emerald-500" : "text-zinc-600"
                                                                    )}>
                                                                        {isClientActive ? 'Live & Enrolled' : 'Off-Catalog'}
                                                                    </span>
                                                                </div>
                                                                <button className={cn(
                                                                    "w-10 h-5 rounded-full relative transition-all duration-300 border",
                                                                    isClientActive ? "bg-emerald-600/20 border-emerald-500/30" : "bg-zinc-800 border-zinc-700"
                                                                )}>
                                                                    <div className={cn(
                                                                        "absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all shadow-sm",
                                                                        isClientActive ? "right-0.5 bg-emerald-500" : "left-0.5 bg-zinc-600"
                                                                    )} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            {isOverridden ? (
                                                                <div className="inline-flex items-center gap-2 p-1.5 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                                                                    <p className="text-[9px] text-amber-500 font-bold px-2 italic max-w-[120px] truncate leading-tight">
                                                                        {override.reason || 'Restricted by Admin'}
                                                                    </p>
                                                                    <Shield className="w-3.5 h-3.5 text-amber-500/50" />
                                                                </div>
                                                            ) : (
                                                                <span className="text-[9px] font-black text-zinc-800 uppercase tracking-widest">Inherited</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Persistence Bar */}
            <div className="fixed bottom-0 right-0 w-[calc(100%-256px)] p-6 bg-zinc-950/80 backdrop-blur-2xl border-t border-zinc-800 flex justify-between items-center z-50">
                <div className="flex items-center gap-3">
                    <Info className="w-4 h-4 text-zinc-600" />
                    <p className="text-[10px] text-zinc-500 font-bold max-w-sm">
                        Any changes made here will propagate to the <span className="text-white">API Gateway</span> instantly. Operational toggles affect player connectivity.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl font-black text-[11px] text-zinc-400 hover:text-white transition-all uppercase tracking-widest">
                        Discard Pending
                    </button>
                    <button className="px-12 py-4 bg-emerald-600 text-zinc-950 rounded-2xl font-black text-[11px] hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-500/20 uppercase tracking-widest">
                        Commit Catalog Changes
                    </button>
                </div>
            </div>
            <ProviderDetailPanel
                provider={selectedProvider}
                clientId={clientId}
                isOpen={!!selectedProvider}
                onClose={() => setSelectedProvider(null)}
            />
        </div>
    );
}

// Helper icons
function AdminShield({ className }: { className?: string }) {
    return <Shield className={className} />;
}
