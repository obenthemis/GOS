import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { ImpersonationProvider } from './lib/ImpersonationContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ImpersonationProvider>
      <App />
    </ImpersonationProvider>
  </StrictMode>,
);
