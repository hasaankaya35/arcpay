# ⚡ ArcPay — Pay-per-Query AI Chat on Arc Network

> AI-powered conversations with USDC micropayments. Pay only for what you use — $0.001 per query, settled instantly on Arc blockchain via Circle Nanopayments.

![ArcPay](https://img.shields.io/badge/Built%20on-Arc%20Network-6366f1?style=for-the-badge)
![USDC](https://img.shields.io/badge/Payments-USDC-06d6a0?style=for-the-badge)
![Nanopayments](https://img.shields.io/badge/Circle-Nanopayments-818cf8?style=for-the-badge)

## 🎯 What is ArcPay?

ArcPay demonstrates the future of **usage-based AI monetization** using Circle Nanopayments on Arc blockchain. Instead of expensive monthly subscriptions, users pay **$0.001 USDC per query** — making AI accessible to everyone.

### The Problem
- ChatGPT Plus costs $20/month — too expensive for casual users
- Many users only need a few queries per day
- Traditional payment rails can't handle sub-cent transactions efficiently

### The Solution
- **Pay-per-query**: Each AI response costs just $0.001 USDC
- **Gas-free**: Circle Nanopayments batch transactions off-chain
- **Instant settlement**: Sub-second finality on Arc blockchain
- **No subscriptions**: Use and pay only for what you need

## 🏗️ Architecture

```
User Query → ArcPay Frontend → AI Processing
                                    ↓
                              Generate Response
                                    ↓
Payment Authorization ←── Circle Nanopayments (off-chain, gas-free)
        ↓
Batch Settlement → Arc Blockchain (USDC)
        ↓
   Transaction Confirmed ✓
```

### How Nanopayments Work
1. **User sends a query** — signed payment authorization created off-chain (zero gas)
2. **AI processes the request** — response generated instantly
3. **Payment verified** — merchant confirms the authorization
4. **Batch settlement** — Circle Gateway aggregates thousands of payments
5. **On-chain settlement** — single transaction on Arc, splitting costs across all payments

This makes payments as small as **$0.000001 USDC** economically viable!

## 🚀 Features

| Feature | Description |
|---------|-------------|
| 💬 AI Chat | Natural language conversations about Arc, crypto, and blockchain |
| 💰 USDC Micropayments | $0.001 per query via Circle Nanopayments |
| 📊 Payment Dashboard | Real-time balance tracking and transaction history |
| 🔗 Transaction Hashes | Verifiable on-chain payment records |
| ⚡ Gas-Free | Off-chain authorization, batched settlement |
| 🎨 Premium UI | Dark mode, glassmorphism, smooth animations |

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: Vanilla CSS with custom design system
- **Blockchain**: Arc Network (Layer-1 by Circle)
- **Payments**: Circle Nanopayments + USDC
- **Standard**: ERC-8183 (Agentic Commerce)

## 📦 Getting Started

```bash
# Clone the repository
git clone https://github.com/hayrullahkayar/arcpay.git
cd arcpay

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🌐 Hackathon Track

**Agentic Economy on Arc Hackathon** (April 20-26, 2026)

- **Track**: Per-API Monetization
- **Prize Pool**: $10,000
- **Theme**: Building economically viable, sub-cent, on-chain transactions

### Why Per-API Monetization?
ArcPay demonstrates how any API service can be monetized at the per-call level using Nanopayments. This model works for:
- 🤖 AI/ML inference APIs
- 📡 Data feeds and oracles
- 🖼️ Image generation services
- 🔍 Search and analytics APIs
- 📊 Compute-as-a-service

## 📈 Business Model

```
Traditional Model:          ArcPay Model:
$20/month subscription  →   $0.001/query
~600 queries included   →   Pay only for what you use
Wasted unused capacity  →   Zero waste
High barrier to entry   →   Accessible to everyone
```

**Example savings:**
- Light user (10 queries/day): $0.30/month vs $20/month → **98.5% savings**
- Heavy user (100 queries/day): $3.00/month vs $20/month → **85% savings**

## 🔮 Roadmap

- [x] Core chat interface with micropayment tracking
- [x] USDC balance management
- [x] Transaction history and analytics
- [x] **Real Web3 Smart Contract deployed to Arc Testnet**
- [x] **MetaMask (ethers.js) Wallet Integration**
- [ ] Circle Wallet SDK integration (mainnet)
- [ ] Real Nanopayments API integration (currently using Arc native L1 transactions)
- [ ] Multi-model AI support (GPT, Claude, Gemini)
- [ ] API marketplace for third-party services
- [ ] Mobile-responsive PWA

## 🏛️ About Arc Network

Arc is Circle's Layer-1 blockchain — the Economic Operating System for the internet.

- 💰 **USDC-native gas** — predictable, dollar-denominated fees
- ⚡ **Sub-second finality** — powered by Malachite consensus
- 🔐 **Opt-in privacy** — enterprise-grade compliance
- 🛡️ **Quantum-resistant** — post-quantum security roadmap
- 🏦 **100+ institutions** — BlackRock, Visa, Mastercard, Goldman Sachs

## 👤 Built By

**Hayrullah Hasan Kayar** — Web3 Developer @ Jaeger
- Arc House Creator
- ArcScan Block Explorer Developer
- İzmir, Turkey 🇹🇷

---

*Built for the Agentic Economy on Arc Hackathon 2026*
