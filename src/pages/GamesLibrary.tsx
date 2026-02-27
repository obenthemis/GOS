import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  Smartphone,
  Monitor,
  Gift,
  Coins,
  RotateCcw,
  Zap,
  Info,
  ChevronRight,
  ShieldAlert,
  Gamepad2,
  Calendar,
  Layers,
  Globe
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { SlideOver } from '@/src/components/ui/SlideOver';
import { games as mockGames, providers, aggregators, Game, Provider } from '@/src/data/mockData';

export function GamesLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAggregator, setSelectedAggregator] = useState<string>('all');
  const [selectedProviderId, setSelectedProviderId] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // Filtered Lists
  const availableProviders = useMemo(() => {
    if (selectedAggregator === 'all') return providers;
    return providers.filter(p => p.aggregatorId === selectedAggregator);
  }, [selectedAggregator]);

  const filteredGames = useMemo(() => {
    return mockGames.filter(g => {
      const matchSearch = g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.id.includes(searchTerm);
      const provider = providers.find(p => p.id === g.providerId);
      const matchAgg = selectedAggregator === 'all' || provider?.aggregatorId === selectedAggregator;
      const matchProv = selectedProviderId === 'all' || g.providerId === selectedProviderId;
      const matchType = selectedType === 'all' || g.type === selectedType;
      return matchSearch && matchAgg && matchProv && matchType;
    });
  }, [searchTerm, selectedAggregator, selectedProviderId, selectedType]);

  const gameTypes = Array.from(new Set(mockGames.map(g => g.type)));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">Games Library</h1>
          <p className="text-sm text-zinc-400 mt-1">Centralized repository for all platform titles and variants.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-700 transition-colors border border-zinc-700">
            Export List
          </button>
          <button className="bg-emerald-600 text-zinc-950 px-4 py-2 rounded-md text-sm font-bold hover:bg-emerald-500 transition-colors">
            Add Game
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input
            type="text"
            placeholder="Search by name, ID, or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 focus:border-emerald-500/50 outline-none transition-all placeholder:text-zinc-700"
          />
        </div>

        <div className="flex bg-zinc-950 border border-zinc-800 rounded-lg p-1">
          <select
            value={selectedAggregator}
            onChange={(e) => {
              setSelectedAggregator(e.target.value);
              setSelectedProviderId('all'); // Reset provider if aggregator changes
            }}
            className="bg-transparent text-zinc-400 text-xs font-bold uppercase tracking-wider px-3 py-1 outline-none"
          >
            <option value="all">Any Aggregator</option>
            {aggregators.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
          <div className="w-[1px] bg-zinc-800 self-stretch mx-1" />
          <select
            value={selectedProviderId}
            onChange={(e) => setSelectedProviderId(e.target.value)}
            className="bg-transparent text-zinc-400 text-xs font-bold uppercase tracking-wider px-3 py-1 outline-none min-w-[140px]"
          >
            <option value="all">Any Provider</option>
            {availableProviders.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-zinc-950 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-wider rounded-lg px-3 py-2 outline-none"
        >
          <option value="all">All Types</option>
          {gameTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <button className="flex items-center gap-2 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-xs font-bold text-zinc-300 hover:bg-zinc-700 transition-all">
          <Filter className="w-3.5 h-3.5" />
          More Filters
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950/50 border-b border-zinc-800 text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-6 py-4">Game Identifier</th>
                <th className="px-6 py-4">Provider / Aggregator</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-center">RTP</th>
                <th className="px-6 py-4">Features</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {filteredGames.slice(0, 50).map((game) => {
                const provider = providers.find(p => p.id === game.providerId);
                const aggregator = aggregators.find(a => a.id === provider?.aggregatorId);

                return (
                  <tr
                    key={game.id}
                    onClick={() => setSelectedGame(game)}
                    className="hover:bg-zinc-800/40 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">{game.name}</div>
                      <div className="text-[10px] text-zinc-600 font-mono mt-0.5">{game.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500">
                          {provider?.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-zinc-300 font-semibold text-xs">{provider?.name}</div>
                          <div className="text-[10px] text-zinc-600 font-medium uppercase tracking-tighter">{aggregator?.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px] font-bold border border-zinc-700 uppercase">
                        {game.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="font-mono font-bold text-zinc-200">{game.rtp.toFixed(2)}%</div>
                      <div className="text-[9px] text-zinc-600 font-medium uppercase">{game.metadata.volatility} VOL</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 text-zinc-600">
                        {game.metadata.mobile && <Smartphone className="w-3.5 h-3.5" title="Mobile" />}
                        {game.metadata.hd && <Monitor className="w-3.5 h-3.5" title="HD" />}
                        {game.metadata.bonusBuy && <Gift className="w-3.5 h-3.5 text-emerald-500/50" title="Bonus Buy" />}
                        {game.metadata.jackpot && <Coins className="w-3.5 h-3.5 text-amber-500/50" title="Jackpot" />}
                        {game.metadata.freeSpins && <RotateCcw className="w-3.5 h-3.5 text-blue-500/50" title="Free Spins" />}
                        {game.metadata.multiplier && <Zap className="w-3.5 h-3.5 text-purple-500/50" title="Multiplier" />}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border",
                        game.status === 'Active' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-zinc-800 text-zinc-500 border-zinc-700"
                      )}>
                        <span className={cn("w-1 h-1 rounded-full", game.status === 'Active' ? "bg-emerald-500" : "bg-zinc-500")} />
                        {game.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-100 transition-colors" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="p-4 bg-zinc-950/50 border-t border-zinc-800 flex items-center justify-between">
          <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
            Showing {filteredGames.length} of {mockGames.length} Available Titles
          </div>
          <div className="flex gap-1">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all",
                  page === 1 ? "bg-emerald-600 text-zinc-950 shadow-lg shadow-emerald-500/20" : "text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
                )}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Game Details SlideOver */}
      <SlideOver
        isOpen={!!selectedGame}
        onClose={() => setSelectedGame(null)}
        title="Game Configuration"
      >
        {selectedGame && (
          <div className="space-y-8 pb-20">
            {/* Header Section */}
            <div className="flex gap-6 items-start pb-6 border-b border-zinc-800">
              <div className="w-24 h-24 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center overflow-hidden relative">
                <Gamepad2 className="w-10 h-10 text-emerald-500 opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded bg-emerald-500/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-emerald-500" />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{selectedGame.name}</h3>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">{selectedGame.id}</p>
                  </div>
                  <div className="bg-zinc-800 text-zinc-400 text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter">
                    {selectedGame.type}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-bold text-zinc-400">
                    <Layers className="w-3 h-3" />
                    {providers.find(p => p.id === selectedGame.providerId)?.name}
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-bold text-zinc-400">
                    <Globe className="w-3 h-3" />
                    {aggregators.find(a => a.id === providers.find(p => p.id === selectedGame.providerId)?.aggregatorId)?.name}
                  </div>
                </div>
              </div>
            </div>

            {/* Specialities Grid */}
            <div>
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Supported Specialities</h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'HD Support', val: selectedGame.metadata.hd, icon: Monitor },
                  { label: 'Mobile', val: selectedGame.metadata.mobile, icon: Smartphone },
                  { label: 'Bonus Buy', val: selectedGame.metadata.bonusBuy, icon: Gift },
                  { label: 'Jackpot', val: selectedGame.metadata.jackpot, icon: Coins },
                  { label: 'Free Spins', val: selectedGame.metadata.freeSpins, icon: RotateCcw },
                  { label: 'Multiplier', val: selectedGame.metadata.multiplier, icon: Zap },
                ].map(spec => (
                  <div key={spec.label} className={cn(
                    "p-3 rounded-xl border flex flex-col items-center text-center gap-2 transition-all",
                    spec.val ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400 shadow-inner" : "bg-zinc-950 border-zinc-800 text-zinc-700 opacity-40"
                  )}>
                    <spec.icon className="w-5 h-5" />
                    <span className="text-[9px] font-black uppercase tracking-tighter leading-none">{spec.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Game Intelligence Matrix */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">RTP Certification</p>
                <p className="text-2xl font-black text-white font-mono">{selectedGame.rtp.toFixed(2)}%</p>
              </div>
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Volatility</p>
                <p className="text-2xl font-black text-amber-500 uppercase">{selectedGame.metadata.volatility}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">Intelligence Tags</p>
              <div className="flex flex-wrap gap-2">
                {selectedGame.metadata.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-bold text-zinc-400 uppercase">
                    #{tag.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">Theme</p>
                <p className="text-sm font-bold text-zinc-200 uppercase">{selectedGame.metadata.theme || 'Classic'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">Paylines</p>
                <p className="text-sm font-bold text-zinc-200 uppercase">{selectedGame.metadata.lines || 'N/A'}</p>
              </div>
            </div>

            {/* More Details */}
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-4 h-4 text-zinc-500" />
                  <div>
                    <p className="text-xs font-bold text-zinc-200">Territory Restrictions</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5 font-medium">US, UK, HKG, FRA, DEU restricted by license.</p>
                  </div>
                </div>
                <button className="text-[10px] font-bold text-zinc-400 uppercase">Edit</button>
              </div>

              <div className="flex justify-between items-center p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-zinc-500" />
                  <div>
                    <p className="text-xs font-bold text-zinc-200">Audit & Compliance</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5 font-medium">Last compliance check passed on 12/02/2026.</p>
                  </div>
                </div>
                <Info className="w-4 h-4 text-zinc-800" />
              </div>
            </div>

            {/* Actions */}
            <div className="fixed bottom-0 right-0 w-full max-w-xl p-6 bg-zinc-950 border-t border-zinc-800 grid grid-cols-2 gap-3 z-10">
              <button className="py-3 bg-zinc-900 border border-zinc-800 rounded-xl font-bold text-sm text-zinc-300 hover:bg-zinc-800 transition-all">
                Download Assets
              </button>
              <button className="py-3 bg-emerald-600 text-zinc-950 rounded-xl font-bold text-sm hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/10">
                Update Config
              </button>
            </div>
          </div>
        )}
      </SlideOver>
    </div>
  );
}
