# 🤖 Bankr Trading Bot

A production-ready automated trading bot built with Bankr's powerful API. Execute trades, set limit orders, implement DCA strategies, and monitor your portfolio across multiple blockchains.

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure your API key**
   ```bash
   cp .env.example .env
   # Edit .env and add your BANKR_API_KEY from https://bankr.bot/api
   ```

3. **Test the connection**
   ```bash
   npm test
   ```

4. **Start trading**
   ```bash
   npm run dev
   ```

## 📋 Available Commands

- `npm run dev` - Start the trading bot in development mode
- `npm start` - Start the trading bot in production mode
- `npm test` - Run tests and validate configuration
- `npm run tutorial` - Launch interactive tutorial
- `npm run build` - Build TypeScript to JavaScript (if using TypeScript)

## 🎯 Features

### Core Trading Features
- **Balance Monitoring**: Real-time wallet balance tracking across chains
- **Price Queries**: Get current prices for any supported token
- **Trade Execution**: Buy/sell/swap tokens with smart routing
- **Limit Orders**: Set conditional buy/sell orders
- **DCA Strategies**: Automated dollar-cost averaging
- **Portfolio Tracking**: Real-time portfolio value and performance metrics

### Advanced Features
- **Price Alerts**: Get notified when tokens hit target prices
- **Risk Management**: Built-in stop-loss and position sizing
- **Multi-Chain Support**: Trade on Base, Ethereum, Polygon, and more
- **Gas Optimization**: Smart gas fee management
- **Error Handling**: Comprehensive error recovery and logging

## 🔧 Configuration

Edit `.env` file to customize your trading bot:

```bash
# Required
BANKR_API_KEY=your_api_key_here

# Trading Configuration
DEFAULT_CHAIN=base
TRADE_AMOUNT_USD=10
MAX_TRADES_PER_HOUR=20
STOP_LOSS_PERCENTAGE=5
TAKE_PROFIT_PERCENTAGE=10

# Alert Configuration
PRICE_ALERTS_ENABLED=true
ALERT_WEBHOOK_URL=your_webhook_url

# Risk Management
MAX_POSITION_SIZE_USD=1000
MIN_TRADE_AMOUNT_USD=5
```

## 💡 Usage Examples

### Basic Trading
```javascript
import { TradingBot } from './src/trading-bot.js';

const bot = new TradingBot();

// Check balances
await bot.checkBalances();

// Get current price
const ethPrice = await bot.getPrice('ETH');

// Execute a trade
await bot.executeTrade('buy', 50, 'USDC', 'ETH');

// Set a limit order
await bot.setLimitOrder('buy', 'ETH', 2000, 10);
```

### DCA Strategy
```javascript
// Set up dollar-cost averaging
await bot.setDCA('ETH', 100, 'every day at 9am');

// Monitor DCA performance
const dcaStats = await bot.getDCAStats();
```

### Portfolio Management
```javascript
// Get portfolio overview
const portfolio = await bot.getPortfolio();

// Get performance metrics
const performance = await bot.getPerformanceMetrics();
```

## 📚 Interactive Tutorial

Run the interactive tutorial to learn step-by-step:

```bash
npm run tutorial
```

The tutorial covers:
1. Setting up your API key
2. Testing your connection
3. Making your first trade
4. Setting up limit orders
5. Implementing DCA strategies
6. Monitoring your portfolio

## 🔒 Security Best Practices

- **Never commit** `.env` file to version control
- **Use dedicated wallets** for bot operations
- **Start with small amounts** when testing
- **Enable IP allowlists** for production use
- **Monitor API usage** to avoid unexpected costs
- **Use testnet** for initial development

## 📊 Supported Blockchains

- **Base** (recommended): Fast, low-cost, gas sponsorship available
- **Ethereum**: High-value operations, no gas sponsorship
- **Polygon**: Low-cost, Polymarket support
- **Unichain**: Uniswap's native L2
- **Solana**: High-speed, limited gas sponsorship

## 🚨 Important Disclaimers

- This bot executes **real trades** with real money
- Trading involves **financial risk** - never risk more than you can afford to lose
- Test thoroughly with **small amounts** before deploying significant capital
- Past performance does not guarantee future results
- You are responsible for all trading decisions and outcomes

## 🛠 Development

```bash
# Install dependencies
npm install

# Run in development mode with hot reload
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Start the bot
npm start
```

## 📖 Learn More

- [Bankr Documentation](https://docs.bankr.bot/)
- [API Reference](https://docs.bankr.bot/agent-api/overview)
- [Trading Best Practices](https://docs.bankr.bot/guides/trading)
- [Discord Community](https://discord.gg/bankr)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ using [Bankr](https://bankr.bot)**

*Happy trading! 🚀💰*
