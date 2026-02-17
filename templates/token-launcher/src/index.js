#!/usr/bin/env node

import chalk from 'chalk';
import NFTMarketplace from './nft-marketplace.js';
import { config } from './config.js';

console.log(chalk.blue.bold(`
🚀 Starting analytics-dashboard
🤖 Launching your Bankr application
`));

async function main() {
  try {
    const marketplace = new NFTMarketplace(config);
    
    console.log(chalk.cyan('🔧 Initializing NFT marketplace...'));
    await marketplace.initialize();
    
    console.log(chalk.green('✅ NFT marketplace initialized successfully!'));
    
    console.log(chalk.cyan('🎨 Setting up metadata standards...'));
    console.log(chalk.cyan('🖼️ Initializing minting interface...'));
    console.log(chalk.cyan('🏪 Creating marketplace system...'));
    
    // Start marketplace
    console.log(chalk.cyan('🚀 Starting NFT marketplace...'));
    await marketplace.start();
    
    // Example usage
    console.log(chalk.yellow('\n📋 Example operations:'));
    console.log(chalk.cyan('await marketplace.mintNFT({ name: "My NFT", description: "..." });'));
    console.log(chalk.cyan('await marketplace.listNFT("token123", { price: "0.1", currency: "ETH" });'));
    console.log(chalk.cyan('await marketplace.getNFTPrice("collection-address");'));
    console.log(chalk.cyan('await marketplace.getCollectionStats("collection-address");'));
    
  } catch (error) {
    console.error(chalk.red('❌ Error starting NFT marketplace:'), error.message);
    
    if (error.message.includes('API key') || error.message.includes('PRIVATE_KEY')) {
      console.log(chalk.yellow('\n💡 Setup Help:'));
      console.log(chalk.cyan('1. Run: bankr login email user@example.com'));
      console.log(chalk.cyan('2. Or add BANKR_PRIVATE_KEY to your .env file'));
      console.log(chalk.cyan('3. Run npm test to verify your setup'));
    }
    
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log(chalk.yellow('\n🛑 Shutting down NFT marketplace gracefully...'));
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(chalk.yellow('\n🛑 Shutting down NFT marketplace gracefully...'));
  process.exit(0);
});

main();
