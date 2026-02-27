import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useImpersonation } from '@/src/lib/ImpersonationContext';

interface LayoutProps {
  children: (activeTab: string, impersonationId: string | null, setActiveTab: (tab: string) => void) => React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { impersonationId } = useImpersonation();

  React.useEffect(() => {
    const handleNav = (e: any) => {
      if (e.detail) setActiveTab(e.detail);
    };
    window.addEventListener('nav', handleNav);
    return () => window.removeEventListener('nav', handleNav);
  }, []);

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden font-sans text-zinc-300 antialiased">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar setActiveTab={setActiveTab} />
        <main className="flex-1 overflow-y-auto p-6">
          {children(activeTab, impersonationId, setActiveTab)}
        </main>
      </div>
    </div>
  );
}
