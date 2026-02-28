import React from 'react';
import {
  LayoutDashboard,
  Gamepad2,
  Building2,
  Package,
  Settings,
  LogOut,
  Shield
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useImpersonation } from '@/src/lib/ImpersonationContext';

interface NavItem {
  id: string;
  label: string;
  icon: any;
  badge?: number;
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { impersonationId, setImpersonationId } = useImpersonation();
  const adminNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Global Insights', icon: LayoutDashboard },
    { id: 'games', label: 'Games Library', icon: Gamepad2 },
    { id: 'providers', label: 'Providers Catalog', icon: Building2 },
    { id: 'packs', label: 'Aggregator Matrix', icon: Package },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  const clientNavItems: NavItem[] = [
    { id: 'portal_dashboard', label: 'My Casino Stats', icon: LayoutDashboard },
    { id: 'portal_catalog', label: 'Provider Matrix', icon: Package },
    { id: 'portal_games', label: 'Game Gating', icon: Gamepad2 },
    { id: 'portal_financials', label: 'Margin Reports', icon: LogOut },
    { id: 'portal_settings', label: 'Site Config', icon: Settings },
  ];

  const navItems = impersonationId ? clientNavItems : adminNavItems;

  return (
    <div className="flex flex-col w-64 bg-zinc-950 text-zinc-300 h-screen border-r border-zinc-800">
      <div className="p-6 flex items-center gap-4">
        <img
          src="/ctrl-alt-bet.png"
          alt="Game Orchestration System"
          className="h-12 w-auto object-contain"
        />
        <div className="flex flex-col leading-[1.1]">
          <div className="flex flex-col">
            <span className="text-xs font-black text-white uppercase tracking-tighter">
              <span className="text-emerald-500 text-sm">G</span>ame
            </span>
            <span className="text-xs font-black text-white uppercase tracking-tighter">
              <span className="text-emerald-500 text-sm">O</span>rchestration
            </span>
            <span className="text-xs font-black text-white uppercase tracking-tighter">
              <span className="text-emerald-500 text-sm">S</span>ystem
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left",
              activeTab === item.id
                ? "bg-zinc-800 text-white"
                : "hover:bg-zinc-800/50 hover:text-white"
            )}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-800 space-y-2">
        {impersonationId && (
          <button
            onClick={() => {
              setImpersonationId(null);
              setActiveTab('clients');
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-black text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all uppercase tracking-widest"
          >
            <Shield className="w-4 h-4" />
            Global Platform View
          </button>
        )}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
