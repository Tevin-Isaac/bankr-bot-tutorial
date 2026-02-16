# 🔍 NFT Marketplace

A complete NFT marketplace platform with minting, trading, and royalty management built on Bankr's powerful API.

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

4. **Start the marketplace**
   ```bash
   npm run dev
   ```

## 📋 Available Commands

- `npm run dev` - Start marketplace in development mode
- `npm start` - Start marketplace in production mode
- `npm test` - Run tests and validate configuration
- `npm run tutorial` - Launch interactive tutorial
- `npm run build` - Build TypeScript to JavaScript (if using TypeScript)

## 🎯 Features

### Core NFT Features
- **NFT Minting**: Create and mint new NFTs with custom metadata
- **Marketplace Trading**: Buy, sell, and trade NFTs with bidding system
- **Royalty Management**: Automatic royalty distribution to creators
- **IPFS Integration**: Decentralized storage for NFT assets
- **Metadata Standards**: Support for ERC-721 and ERC-1155 standards

### Advanced Features
- **Rarity Calculation**: Automated rarity scoring system
- **Analytics Dashboard**: Track sales, volume, and user engagement
- **Collection Management**: Organize and categorize NFT collections
- **Multi-Chain Support**: Deploy on multiple blockchains
- **Smart Contract Integration**: Secure and automated transactions

## 🔧 Configuration

Edit `.env` file to customize your NFT marketplace:

```bash
# Required
BANKR_API_KEY=your_api_key_here

# Marketplace Configuration
DEFAULT_CHAIN=base
MARKETPLACE_FEE_PERCENTAGE=2.5
ROYALTY_PERCENTAGE=10

# NFT Configuration
MAX_FILE_SIZE_MB=50
SUPPORTED_FORMATS=jpg,png,gif,webp
IPFS_GATEWAY=https://ipfs.io/ipfs/

# Trading Configuration
MIN_BID_INCREMENT=0.01
AUCTION_DURATION_HOURS=24
MAX_LISTINGS_PER_USER=100
```

## 💡 Usage Examples

### Minting an NFT
```javascript
import { NFTMarketplace } from './src/nft-marketplace.js';

const marketplace = new NFTMarketplace();

// Mint a new NFT
const nft = await marketplace.mintNFT({
  name: 'My Awesome NFT',
  description: 'A unique digital collectible',
  image: './path/to/image.png',
  attributes: [
    { trait_type: 'Rarity', value: 'Rare' },
    { trait_type: 'Color', value: 'Blue' }
  ]
});
```

### Listing NFT for Sale
```javascript
// List NFT on marketplace
await marketplace.listNFT(nft.tokenId, {
  price: 0.5, // in ETH
  auction: false,
  duration: 7 // days
});
```

### Managing Royalties
```javascript
// Set up royalties for creator
await marketplace.setRoyalties(nft.tokenId, {
  creator: '0x...',
  percentage: 10 // 10% royalty
});
```

## 📚 Interactive Tutorial

Run the interactive tutorial to learn step-by-step:

```bash
npm run tutorial
```

The tutorial covers:
1. Setting up your API key
2. Testing your connection
3. Configuring NFT metadata standards
4. Setting up NFT minting interface
5. Creating marketplace listing system
6. Configuring trading and bidding
7. Setting up royalty management
8. Creating analytics dashboard
9. Integrating with IPFS storage
10. Setting up rarity calculation
11. Launching marketplace

## 🔒 Security Best Practices

- **Never commit** `.env` file to version control
- **Use IPFS** for decentralized NFT storage
- **Implement proper access controls** for marketplace operations
- **Validate all user inputs** to prevent exploits
- **Use secure smart contracts** for all transactions
- **Regular security audits** of marketplace contracts

## 📊 Supported Blockchains

- **Base** (recommended): Fast, low-cost, gas sponsorship available
- **Ethereum**: High-value NFT operations, no gas sponsorship
- **Polygon**: Low-cost with strong NFT ecosystem
- **Solana**: High-speed NFT minting and trading

## 🚨 Important Disclaimers

- This marketplace handles **real NFT transactions** with real value
- NFT trading involves **financial risk** - understand market volatility
- Test thoroughly with **test NFTs** before mainnet launch
- Ensure compliance with **local regulations** for NFT trading
- Users are responsible for **their own trading decisions**

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

# Start the marketplace
npm start
```

## 📖 Learn More

- [Bankr Documentation](https://docs.bankr.bot/)
- [NFT Standards](https://docs.bankr.bot/nft/standards)
- [Marketplace Best Practices](https://docs.bankr.bot/guides/marketplace)
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

*Happy NFT trading! 🎨💰*
