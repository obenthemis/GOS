# CtrlAltBet GOS
### Game Orchestration System

CtrlAltBet GOS is a premium, high-density administrative platform designed for iGaming aggregators and operators to orchestrate game content, manage multi-tenant casino environments, and control global distribution logistics.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🛠 Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Vanilla CSS Architecture)
- **Icons**: Lucide React
- **Charts**: Recharts

## 🌌 Key Modules

- **Global Command Dashboard**: Real-time infrastructure health, revenue flow (GGR), and operational logs.
- **Providers Catalog**: Master inventory management with "Discovery Sync" (Fetch Games) simulation and Change Queue review.
- **Aggregator Matrix**: Technical logistics panel for regional gating, provider exclusions, and individual game connectivity rules.
- **Casino Registry**: Deep management of operator identities, financial configurations, and aggregator enrollment.
- **Maintenance Queue**: Staging area for platform-wide data integrity review with side-by-side diffing.

## 🛡️ Security & Integrity

The platform utilizes a **Staging-to-Production** workflow. All data updates fetched from aggregators must be reviewed and audited in the **Maintenance Queue** before propagation to the live catalog.

---
© 2026 CtrlAltBet GOS. All rights reserved.
