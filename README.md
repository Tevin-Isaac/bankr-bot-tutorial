# 🚀 Create Bankr App

**The fastest way to build crypto applications with modern frontend frameworks**

Create Bankr App is an interactive CLI tool that helps developers quickly create production-ready crypto applications. Choose from 10 templates, add React/Next.js frontend, and start building immediately.

## ✨ Features

- 🎯 **10 Application Templates**: Trading Bot, Token Launcher, Portfolio Tracker, Arbitrage Bot, DeFi Yield Farm, NFT Marketplace, Cross-Chain Bridge, Analytics Dashboard, GameFi Platform, DeFi Bank
- 🎨 **Frontend Options**: React with Vite, Next.js, or Backend-only
- ⚡ **Multi-Blockchain Support**: Base, Ethereum, Polygon, Unichain, Solana
- 🛠️ **TypeScript/JavaScript**: Choose your preferred language
- 📚 **Interactive Tutorials**: 11-step built-in learning for each template
- 🧪 **Testing Setup**: Pre-configured testing environment
- 🔧 **Environment Configuration**: Ready-to-use configuration files
- 📊 **Logging & Monitoring**: Comprehensive error handling and logging

## 🚀 Quick Start

### Installation
```bash
# Install globally
npm install -g create-bankr-app

# Or use npx (no installation required)
npx create-bankr-app
```

### Create Your First App
```bash
# Start interactive CLI
create-bankr-app

# Or create with a name directly
create-bankr-app my-trading-bot
```

## 🎯 How It Works

### **Simple 3-Step Process:**

1. **CLI Asks Questions**:
   - **Project Name**: User enters `my-trading-bot` (or whatever they choose)
   - **Template**: User selects `trading-bot` (or 9 other options)
   - **Frontend**: User selects `react` (or `next.js`, or `none`)
   - **Blockchain**: User selects `base` (or other chains)
   - **Features**: User chooses which features to include

2. **CLI Creates Project Structure**:
   ```
   my-trading-bot/                    # ← This is what user named it
   ├── backend/                    # ← Crypto backend (trading-bot template)
   │   ├── index.ts               # Main application
   │   ├── config.ts              # Configuration
   │   └── trading-bot.ts         # Business logic
   ├── frontend/                   # ← Only if user chose React/Next.js
   │   ├── src/
   │   │   ├── main.jsx         # React app entry
   │   │   ├── App.jsx          # Main component
   │   │   └── index.css        # Styling
   │   ├── package.json            # Frontend dependencies
   │   └── vite.config.js         # Build config
   ├── tutorials/                   # ← Always created
   │   └── start.js              # 11-step interactive guide
   ├── package.json                 # ← Dependencies for BOTH backend + frontend
   ├── README.md                   # ← Complete documentation
   └── .env.example                # ← Environment template
   ```

3. **Developer Starts Building**:
   ```bash
   cd my-trading-bot           # ← Go into their new project
   npm install                   # ← Install ALL dependencies
   npm run dev                   # ← Start backend (and frontend if exists)
   ```

**Result**: User has a working crypto application with optional React/Next.js frontend!

## 🎨 Frontend Options

### **🚀 Backend Only (Default)**
- Perfect for API-focused applications
- CLI tools and microservices
- Lightweight and fast

### **⚛️ React with Vite**
- Modern React development
- Fast hot reload (HMR)
- Optimized builds
- Great for SPAs and dashboards

### **🔷 Next.js Full-Stack**
- Full-stack React framework
- Server-side rendering (SSR)
- Built-in API routes
- Production-ready deployment

## 🎯 Available Templates

| Template | Description | Frontend Options |
|----------|-------------|----------------|
| 🤖 **Trading Bot** | Automated trading with limit orders, DCA, and portfolio management | All |
| 🪙 **Token Launcher** | Deploy and manage tokens with vesting and fees | All |
| 📊 **Portfolio Tracker** | Monitor portfolio across chains | All |
| ⚡ **Arbitrage Bot** | Find and execute arbitrage opportunities | All |
| 💰 **DeFi Yield Farm** | Automated yield farming and liquidity management | All |
| 🔍 **NFT Marketplace** | Create and manage NFT trading platform | All |
| 🌐 **Cross-Chain Bridge** | Build multi-chain asset bridge | All |
| 📈 **Analytics Dashboard** | Real-time crypto analytics and insights | All |
| 🎮 **GameFi Platform** | Play-to-earn gaming with crypto rewards | All |
| 🏦 **DeFi Bank** | Complete decentralized banking solution | All |

## 📚 Interactive Tutorials

Each template includes **11 comprehensive steps**:

### **Example: Trading Bot Tutorial**
1. ⚙️ Set up API key and environment
2. 🧪 Test Bankr API connection  
3. 🔍 Explore wallet balances
4. 💰 Get current token prices
5. 📈 Execute first trade
6. 🎯 Set up limit orders
7. 📊 Configure portfolio tracking
8. 🔔 Set up price alerts
9. ⚡ Implement DCA strategy
10. 🛡️ Configure risk management
11. 📈 Monitor performance metrics

### **Frontend-Specific Steps** (if React/Next.js selected)
12. 🎨 Set up React/Next.js frontend
13. 🔗 Connect frontend to backend API
14. 📱 Build responsive dashboard
15. 🚀 Deploy full-stack app

## 🚀 Development Commands

```bash
cd your-project
npm install
npm run dev          # Start development
npm run build         # Build for production  
npm run test          # Run tests
npm run tutorial       # Interactive tutorial
```

## 💡 Why This Helps Bankr

### **For Bankr Team:**
- **Developer Adoption**: Makes it easy for developers to start building
- **Ecosystem Growth**: More applications = more Bankr API usage
- **Community Building**: Provides starting point for Bankr developers
- **Education**: Teaches crypto development best practices

### **For Developers:**
- **Quick Start**: No need to build from scratch
- **Best Practices**: Pre-configured with security patterns
- **Learning**: Interactive tutorials guide step-by-step
- **Flexibility**: Choose backend/frontend combination
- **Modern Development**: React, Next.js, TypeScript support

## 🔗 Links

- [Bankr Website](https://bankr.bot)
- [Bankr Documentation](https://docs.bankr.bot/)
- [Developer Portal](https://docs.bankr.bot/getting-started/overview)
- [GitHub Repository](https://github.com/Tevin-Isaac/bankr-bot-tool)
- [npm Package](https://www.npmjs.com/package/create-bankr-app)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by [Bankr Community](https://bankr.bot)**

*Start building your crypto application today! 🚀💰*

---

**📖 For detailed explanation: See [HOW_IT_WORKS.md](HOW_IT_WORKS.md)**
