#!/usr/bin/env node

import chalk from 'chalk';
import { NFTMarketplace } from './nft-marketplace';
import { config } from './config';

console.log(chalk.blue.bold(`
🎨 NFT Marketplace Starting
🚀 Launching your NFT trading platform
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
    
  } catch (error: any) {
    console.error(chalk.red('❌ Error starting NFT marketplace:'), error.message);
    
    if (error.message.includes('API key')) {
      console.log(chalk.yellow('\n💡 Setup Help:'));
      console.log(chalk.cyan('1. Get your API key from https://bankr.bot/api'));
      console.log(chalk.cyan('2. Add it to your .env file as BANKR_API_KEY'));
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
