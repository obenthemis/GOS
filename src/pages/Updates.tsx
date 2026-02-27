import React, { useState } from 'react';
import {
    ShieldCheck,
    AlertCircle,
    Clock,
    ArrowRight,
    ChevronRight,
    Search,
    CheckCircle2,
    Trash2,
    Filter,
    Activity,
    Zap,
    Gamepad2,
    Building2
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { pendingChanges, StagingChange } from '@/src/data/mockData';

export function Updates() {
    const [changes, setChanges] = useState<StagingChange[]>(pendingChanges);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedChange, setSelectedChange] = useState<StagingChange | null>(null);

    const filteredChanges = changes.filter(c =>
        c.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.entityId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleApprove = (id: string) => {
        setChanges(prev => prev.map(c => c.id === id ? { ...c, status: 'Approved' } : c));
    };

    const handleDiscard = (id: string) => {
        setChanges(prev => prev.map(c => c.id === id ? { ...c, status: 'Discarded' } : c));
    };

    const getImpactColor = (impact?: string) => {
        switch (impact) {
            case 'Critical': return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
            case 'High': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
            case 'Medium': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
            default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-700/50';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-black tracking-tighter text-white uppercase">Maintenance Queue</h1>
                    <p className="text-sm text-zinc-500 mt-1 uppercase font-black tracking-widest text-[10px]">Staging Environment & Aggregator Diffs</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-4 py-2 rounded-xl text-[10px] font-black hover:text-white transition-all uppercase tracking-widest">
                        Export Manifest
                    </button>
                    <button
                        onClick={() => setChanges(prev => prev.map(c => ({ ...c, status: 'Approved' })))}
                        className="bg-emerald-600 text-zinc-950 px-6 py-2 rounded-xl text-xs font-black hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/10 uppercase tracking-widest"
                    >
                        Bulk Commit (PROD)
                    </button>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: 'Pending Review', value: filteredChanges.filter(c => c.status === 'Pending').length, icon: Clock, color: 'text-amber-500' },
                    { label: 'Potential Risks', value: filteredChanges.filter(c => c.impact === 'Critical').length, icon: AlertCircle, color: 'text-rose-500' },
                    { label: 'Approved', value: filteredChanges.filter(c => c.status === 'Approved').length, icon: CheckCircle2, color: 'text-emerald-500' },
                    { label: 'Sync Health', value: '100%', icon: Activity, color: 'text-blue-500' },
                ].map((stat, i) => (
                    <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4">
                        <div className={cn("p-2 rounded-xl bg-zinc-950 border border-zinc-800", stat.color)}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xl font-black text-white">{stat.value}</p>
                            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* List View */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-2 flex items-center gap-2">
                        <Search className="w-4 h-4 text-zinc-600 ml-2" />
                        <input
                            type="text"
                            placeholder="Filter changes by entity or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none outline-none text-xs text-zinc-300 w-full py-2 placeholder:text-zinc-700"
                        />
                        <div className="w-[1px] h-6 bg-zinc-800 mx-2" />
                        <button className="p-2 hover:bg-zinc-900 rounded-lg text-zinc-500">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-zinc-950 text-zinc-500 font-black uppercase tracking-widest text-[10px] border-b border-zinc-800">
                                    <tr>
                                        <th className="px-6 py-4">Artifact Information</th>
                                        <th className="px-6 py-4">Action Type</th>
                                        <th className="px-6 py-4">Impact Score</th>
                                        <th className="px-6 py-4">Resolution</th>
                                        <th className="px-6 py-4 w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/50">
                                    {filteredChanges.map((change) => (
                                        <tr
                                            key={change.id}
                                            onClick={() => setSelectedChange(change)}
                                            className={cn(
                                                "hover:bg-zinc-800/40 cursor-pointer transition-colors group",
                                                selectedChange?.id === change.id ? "bg-zinc-800/60" : ""
                                            )}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-600">
                                                        {change.itemType === 'Game' ? <Gamepad2 className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{change.entityName}</p>
                                                        <p className="text-[10px] text-zinc-600 font-mono">{change.entityId}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter border",
                                                    change.changeType === 'Addition' ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" :
                                                        change.changeType === 'Removal' ? "text-rose-500 bg-rose-500/10 border-rose-500/20" :
                                                            "text-amber-500 bg-amber-500/10 border-amber-500/20"
                                                )}>
                                                    {change.changeType}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn("px-2 py-0.5 rounded text-[9px] font-black uppercase border", getImpactColor(change.impact))}>
                                                    {change.impact || 'Low'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {change.status === 'Pending' ? (
                                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleApprove(change.id); }}
                                                            className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/20 hover:bg-emerald-500 hover:text-zinc-950 transition-all"
                                                        >
                                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleDiscard(change.id); }}
                                                            className="p-1.5 bg-rose-500/10 text-rose-500 rounded border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className={cn(
                                                        "text-[9px] font-black uppercase italic tracking-widest",
                                                        change.status === 'Approved' ? "text-emerald-500" : "text-rose-500/50"
                                                    )}>
                                                        {change.status}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <ChevronRight className="w-4 h-4 text-zinc-800" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Change Inspector */}
                <div className="lg:col-span-1 space-y-6">
                    {selectedChange ? (
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden animate-in slide-in-from-right duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -mr-16 -mt-16" />

                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div>
                                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Entity Inspection</p>
                                    <h4 className="text-xl font-black text-white uppercase tracking-tight leading-none">{selectedChange.entityName}</h4>
                                </div>
                                <div className={cn("px-2 py-1 rounded text-[10px] font-black border", getImpactColor(selectedChange.impact))}>
                                    {selectedChange.impact}
                                </div>
                            </div>

                            <div className="space-y-6 relative z-10">
                                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3">
                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none flex items-center gap-2">
                                        <Clock className="w-3 h-3" />
                                        Data Source Timeline
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-mono text-zinc-400">Aggregator</span>
                                        <ArrowRight className="w-3 h-3 text-zinc-700" />
                                        <span className="text-xs font-bold text-emerald-500 uppercase">Staging</span>
                                        <ArrowRight className="w-3 h-3 text-zinc-700" />
                                        <span className="text-xs font-bold text-zinc-700 uppercase">Live</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-xs font-black text-zinc-500 uppercase tracking-widest px-1">Attribute Diff Trace</p>
                                    <div className="space-y-3">
                                        {selectedChange.changeType === 'Modification' ? (
                                            Object.keys(selectedChange.newValue).map(key => (
                                                <div key={key} className="bg-zinc-950/50 border border-zinc-800/50 rounded-xl p-4 space-y-3">
                                                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-tight">{key.replace(/([A-Z])/g, ' $1')}</p>
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex-1 line-through text-rose-500/50 font-mono text-lg font-black">{selectedChange.previousValue[key]}%</div>
                                                        <ArrowRight className="w-4 h-4 text-zinc-700" />
                                                        <div className="flex-1 text-emerald-500 font-mono text-lg font-black">{selectedChange.newValue[key]}%</div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-4">
                                                <div className="flex border-b border-zinc-800 pb-3 justify-between items-center">
                                                    <span className="text-[10px] font-black text-zinc-600 uppercase">Artifact Manifest</span>
                                                    <span className="text-[10px] font-black text-emerald-500 uppercase">Verified</span>
                                                </div>
                                                <pre className="text-[10px] font-mono text-zinc-400 leading-relaxed whitespace-pre-wrap">
                                                    {JSON.stringify(selectedChange.newValue, null, 2)}
                                                </pre>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-zinc-800 grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => handleDiscard(selectedChange.id)}
                                        className="py-3 bg-zinc-950 border border-zinc-800 rounded-xl font-bold text-[10px] text-rose-500 hover:bg-rose-500/10 transition-all uppercase tracking-widest"
                                    >
                                        Reject Artifact
                                    </button>
                                    <button
                                        onClick={() => handleApprove(selectedChange.id)}
                                        className="py-3 bg-emerald-600 text-zinc-950 rounded-xl font-black text-[10px] hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/10 uppercase tracking-widest"
                                    >
                                        Accept Change
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-zinc-900 border border-dashed border-zinc-800 rounded-2xl p-12 text-center space-y-4 h-full flex flex-col items-center justify-center">
                            <ShieldCheck className="w-12 h-12 text-zinc-800" />
                            <div className="space-y-2">
                                <p className="text-zinc-500 font-black uppercase tracking-widest text-xs">Artifact Inspector Idle</p>
                                <p className="text-[10px] text-zinc-700 font-medium uppercase tracking-tighter">Select a staging record to initiate deep inspection.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
