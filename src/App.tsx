/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { GamesLibrary } from './pages/GamesLibrary';
import { ServicePacks } from './pages/ServicePacks';
import { Clients } from './pages/Clients';
import { Providers } from './pages/Providers';
import { Updates } from './pages/Updates';

import { ClientPortal } from './pages/ClientPortal';

export default function App() {
  return (
    <Layout>
      {(activeTab, impersonationId, setActiveTab) => {
        // If impersonating, handle portal-specific tabs
        if (impersonationId) {
          switch (activeTab) {
            case 'portal_dashboard':
              return <div className="text-zinc-500 font-black uppercase tracking-widest text-xs p-12">Portal Dashboard Placeholder</div>;
            case 'portal_catalog':
              return <ClientPortal clientId={impersonationId} />;
            case 'portal_games':
              return <div className="text-zinc-500 font-black uppercase tracking-widest text-xs p-12">Portal Games Matrix Placeholder</div>;
            case 'portal_financials':
              return <div className="text-zinc-500 font-black uppercase tracking-widest text-xs p-12">Portal Margin Reports Placeholder</div>;
            case 'portal_settings':
              return <div className="text-zinc-500 font-black uppercase tracking-widest text-xs p-12">Site Config Placeholder</div>;
            default:
              return <ClientPortal clientId={impersonationId} />;
          }
        }

        // Global Admin Routes
        switch (activeTab) {
          case 'dashboard':
            return <Dashboard setActiveTab={setActiveTab} />;
          case 'games':
            return <GamesLibrary />;
          case 'providers':
            return <Providers />;
          case 'packs':
            return <ServicePacks />;
          case 'clients':
            return <Clients />;
          case 'updates':
            return <Updates />;
          default:
            return (
              <div className="flex items-center justify-center h-full text-zinc-500">
                <p>Page under construction</p>
              </div>
            );
        }
      }}
    </Layout>
  );
}
