import React from 'react';
import { Search, Bell, User, Shield, ChevronDown, Monitor, Settings } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { clients as mockClients } from '@/src/data/mockData';

import { useImpersonation } from '@/src/lib/ImpersonationContext';

export function Topbar({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const { impersonationId, setImpersonationId } = useImpersonation();
  const selectedClient = mockClients.find(c => c.id === impersonationId);

  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-6 flex-1">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input
            type="text"
            placeholder="Search providers, games, global nodes..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-200 focus:border-emerald-500/50 outline-none transition-all placeholder:text-zinc-700"
          />
        </div>

        {/* Global Context Switcher (Admin Tool) */}
        {!impersonationId || impersonationId ? (
          <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
            <div className={cn(
              "p-2 rounded-lg",
              impersonationId ? "bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20" : "bg-zinc-900 text-zinc-600"
            )}>
              <Monitor className="w-4 h-4" />
            </div>
            <div className="flex-1 flex flex-col min-w-0">
              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-none mb-1">Casino Operations</p>
              <div className="relative group">
                <button className="flex items-center gap-2 text-xs font-bold text-zinc-300 hover:text-white transition-colors">
                  {selectedClient ? selectedClient.name : 'Global Platform View'}
                  <ChevronDown className="w-3 h-3 text-zinc-600" />
                </button>

                <div className="absolute top-full left-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60]">
                  <div className="p-2 border-b border-zinc-800 bg-zinc-950/50">
                    <p className="text-[9px] font-black text-zinc-600 uppercase px-2 mb-1">Select Casino Context</p>
                  </div>
                  <button
                    onClick={() => setImpersonationId(null)}
                    className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-zinc-800 transition-colors border-b border-zinc-800/50 flex items-center justify-between group/item"
                  >
                    <span className={cn(!impersonationId ? "text-emerald-500" : "text-zinc-400")}>Global Admin</span>
                    {!impersonationId && <Shield className="w-3 h-3 text-emerald-500" />}
                  </button>
                  {mockClients.map(client => (
                    <button
                      key={client.id}
                      onClick={() => setImpersonationId(client.id)}
                      className="w-full text-left px-4 py-2 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors flex items-center justify-between"
                    >
                      <span className={cn(impersonationId === client.id ? "text-emerald-500" : "text-zinc-400")}>{client.name}</span>
                      {impersonationId === client.id && <Shield className="w-3 h-3 text-emerald-500" />}
                    </button>
                  ))}
                  <div className="p-2 border-t border-zinc-800 bg-zinc-950/30">
                    <button
                      onClick={() => {
                        setImpersonationId(null);
                        setActiveTab('clients');
                      }}
                      className="w-full py-2 text-[10px] font-black text-zinc-500 hover:text-white uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                    >
                      <Settings className="w-3 h-3" />
                      Manage All Casinos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-4">
        {/* Maintenance Queue indicator */}
        <button
          onClick={() => setActiveTab('updates')}
          className="relative p-2 text-zinc-500 hover:text-emerald-400 transition-colors group"
          title="Maintenance Queue"
        >
          <Shield className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 text-zinc-950 text-[9px] font-black rounded-full flex items-center justify-center border-2 border-zinc-950 shadow-lg shadow-emerald-500/20">
            12
          </span>
          <div className="absolute top-full right-0 mt-2 py-1 px-2 bg-zinc-900 border border-zinc-800 rounded text-[9px] font-black text-zinc-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Maintenance Queue
          </div>
        </button>

        <button className="relative p-2 text-zinc-500 hover:text-emerald-400 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-zinc-950"></span>
        </button>
        <div className="h-4 w-px bg-zinc-800"></div>
        <button className="flex items-center gap-3 hover:opacity-80 transition-opacity pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-zinc-100 leading-none">Admin User</p>
            <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mt-1">Superadmin</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-emerald-500 transition-colors shadow-inner">
            <User className="w-5 h-5" />
          </div>
        </button>
      </div>
    </header>
  );
}
