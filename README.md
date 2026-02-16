# 🚀 Create Bankr App

**The fastest way to build crypto trading applications with Bankr's powerful API**

Create Bankr App is an interactive CLI tool that scaffolds production-ready crypto trading applications in seconds. Choose from pre-built templates, configure your blockchain, and start building immediately.

## ✨ Features

- 🎯 **10 Application Templates**: Trading Bot, Token Launcher, Portfolio Tracker, Arbitrage Bot, DeFi Yield Farm, NFT Marketplace, Cross-Chain Bridge, Analytics Dashboard, GameFi Platform, DeFi Bank
- ⚡ **Multi-Blockchain Support**: Base, Ethereum, Polygon, Unichain, Solana
- 🎨 **Frontend Options**: React with Vite, Next.js, or Backend-only
- 🛠️ **TypeScript/JavaScript**: Choose your preferred language
- 📚 **Interactive Tutorials**: Built-in learning for each template
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
# Start the interactive CLI
create-bankr-app

# Or create with a name directly
create-bankr-app my-trading-bot
```

The CLI will guide you through:
1. **Project Name**: Choose a name for your application
2. **Template Selection**: Pick from available application types
3. **Frontend Framework**: Choose React, Next.js, or Backend-only
4. **Blockchain Choice**: Select your preferred blockchain
5. **Feature Configuration**: Customize features for your template
6. **Language Preference**: TypeScript or JavaScript
7. **Git Initialization**: Optional git repository setup

## 🎨 Frontend Options

### **🚀 Backend Only (Default)**
- Perfect for API-focused applications
- CLI tools and backend services
- Microservices architecture

### **⚛️ React with Vite**
- Modern React development experience
- Fast development server with HMR
- Optimized build system
- Perfect for SPAs and dashboards

### **🔷 Next.js Full-Stack**
- Full-stack React framework
- Server-side rendering (SSR)
- API routes built-in
- Perfect for production applications

## 🎯 Available Templates

Choose from **10 production-ready templates**:

| Template | Description | Use Case |
|----------|-------------|----------|
| 🤖 **Trading Bot** | Automated trading with limit orders, DCA, and portfolio management | Active trading |
| 🪙 **Token Launcher** | Deploy and manage your own tokens with vesting and fees | Token creation |
| � **Portfolio Tracker** | Monitor and analyze your crypto portfolio across chains | Portfolio management |
| ⚡ **Arbitrage Bot** | Find and execute profitable arbitrage opportunities | Arbitrage trading |
| 💰 **DeFi Yield Farm** | Automated yield farming and liquidity management | Yield farming |
| 🔍 **NFT Marketplace** | Create and manage NFT trading platform | NFT trading |
| 🌐 **Cross-Chain Bridge** | Build multi-chain asset bridge | Asset bridging |
| 📈 **Analytics Dashboard** | Real-time crypto analytics and insights | Data analysis |
| 🎮 **GameFi Platform** | Play-to-earn gaming with crypto rewards | Gaming |
| 🏦 **DeFi Bank** | Complete decentralized banking solution | DeFi banking |

### 🤖 Trading Bot
Automated trading with limit orders, DCA strategies, and portfolio management.

**Features:**
- Real-time balance monitoring
- Trade execution with smart routing
- Limit orders and DCA strategies
- Portfolio tracking and analytics
- Price alerts and risk management

**Use Case:** Automated cryptocurrency trading with customizable strategies

### 🪙 Token Launcher
Deploy and manage your own tokens with vesting schedules and fee management.

**Features:**
- Token deployment and configuration
- Vesting schedule management
- Fee structure setup
- Token analytics and tracking
- Vault and treasury management

**Use Case:** Creating and managing custom cryptocurrency tokens

### 📊 Portfolio Tracker
Monitor and analyze your crypto portfolio across multiple blockchains.

**Features:**
- Multi-chain portfolio tracking
- Real-time price updates
- Performance analytics
- Tax reporting tools
- Portfolio rebalancing suggestions

**Use Case:** Comprehensive portfolio management and analysis

### ⚡ Arbitrage Bot
Find and execute profitable arbitrage opportunities across decentralized exchanges.

**Features:**
- Cross-DEX arbitrage detection
- Automated trade execution
- Slippage and gas optimization
- Profit tracking and analytics
- Risk management controls

**Use Case:** Automated arbitrage trading strategies

### 💰 DeFi Yield Farm
Automated yield farming and liquidity management across DeFi protocols.

**Features:**
- Yield farming automation
- Liquidity pool management
- APY optimization
- Compound strategy automation
- Risk assessment tools

**Use Case:** Automated DeFi yield generation

## 🔧 Supported Blockchains

| Blockchain | Gas Sponsorship | Best For |
|------------|-----------------|----------|
| **Base** ⭐ | ✅ Full | Fast, low-cost trading (Recommended) |
| **Ethereum** | ❌ None | High-value operations |
| **Polygon** | ❌ None | Low-cost with Polymarket support |
| **Unichain** | ❌ None | Uniswap ecosystem integration |
| **Solana** | ⚠️ Limited | High-speed operations |

## 📚 After Creation

Once your project is created, you'll get:

```bash
cd your-project-name
npm install
npm run dev
```

### Available Commands

- `npm run dev` - Start development mode with hot reload
- `npm start` - Start production mode
- `npm test` - Run tests and validate configuration
- `npm run tutorial` - Launch interactive tutorial
- `npm run build` - Build TypeScript to JavaScript (if applicable)

### Interactive Tutorial

Every generated project includes an interactive tutorial:

```bash
npm run tutorial
```

The tutorial covers:
1. API key setup and configuration
2. Connection testing
3. First API calls
4. Template-specific features
5. Best practices and security

## 🔒 Security Best Practices

- **API Keys**: Never commit `.env` files to version control
- **Dedicated Wallets**: Use separate wallets for bot operations
- **Test First**: Always start with small amounts on testnet
- **IP Allowlists**: Restrict API access by IP address in production
- **Monitor Usage**: Track API usage to control costs

## 🛠 Development

### Local Development

```bash
# Clone the repository
git clone https://github.com/bankr-bot/create-bankr-app.git
cd create-bankr-app

# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Link for local testing
npm link
create-bankr-app test-project
```

### Project Structure

```
create-bankr-app/
├── bin/
│   └── index.js              # Main CLI entry point
├── templates/                 # Application templates
│   ├── trading-bot/          # Trading bot template
│   ├── token-launcher/       # Token launcher template
│   ├── portfolio-tracker/    # Portfolio tracker template
│   ├── arbitrage-bot/        # Arbitrage bot template
│   └── defi-yield-farm/      # DeFi yield farm template
├── examples/                 # Example generated projects
├── trials/                   # Test projects directory
├── package.json              # CLI dependencies
├── README.md                 # This file
├── CONTRIBUTING.md            # Contribution guidelines
└── TEMPLATES.md              # Template documentation
```

### Adding New Templates

1. Create a new directory in `templates/`
2. Add your template files with placeholders
3. Update the CLI choices in `bin/index.js`
4. Add template-specific features and configurations

## 📖 Learn More

- [Bankr Documentation](https://docs.bankr.bot/)
- [API Reference](https://docs.bankr.bot/agent-api/overview)
- [Trading Best Practices](https://docs.bankr.bot/guides/trading)
- [Discord Community](https://discord.gg/bankr)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Ensure all tests pass: `npm test`
5. Submit a pull request

## 🐛 Troubleshooting

### Common Issues

**"Command not found" after global install**
```bash
# Clear npm cache
npm cache clean --force

# Reinstall globally
npm install -g create-bankr-app
```

**Template creation fails**
- Check disk space and permissions
- Ensure project name follows naming conventions
- Verify internet connection for template downloads

**API connection issues**
- Verify API key is correctly set in `.env`
- Check network connectivity
- Ensure API key has required permissions

### Getting Help

- 📖 [Documentation](https://docs.bankr.bot/)
- 💬 [Discord Community](https://discord.gg/bankr)
- 🐛 [GitHub Issues](https://github.com/Tevin-Isaac/bankr-bot-tool/issues)
- 📧 [Support Email](mailto:support@bankr.bot)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Bankr Website](https://bankr.bot)
- [Developer Portal](https://docs.bankr.bot)
- [API Dashboard](https://bankr.bot/api)
- [GitHub Repository](https://github.com/Tevin-Isaac/bankr-bot-tool)

---

**Built with ❤️ by the [Bankr Team](https://bankr.bot)**

*Start building your crypto trading application today! 🚀💰*
