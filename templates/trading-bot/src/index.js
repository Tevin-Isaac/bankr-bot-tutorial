#!/usr/bin/env node

import chalk from 'chalk';
import TradingBot from './trading-bot.js';
import { config } from './config.js';

console.log(chalk.blue.bold(`
🚀 Starting trading-bot
🤖 Launching your Bankr application
`));

async function main() {
  try {
    const bot = new TradingBot();
    
    console.log(chalk.cyan('🔧 Initializing trading bot...'));
    await bot.initialize();
    
    console.log(chalk.green('✅ Trading bot initialized successfully!'));
    
    console.log(chalk.cyan('📊 Setting up market analysis...'));
    console.log(chalk.cyan('💰 Initializing trading engine...'));
    console.log(chalk.cyan('🔔 Configuring notifications...'));
    
    // Start trading bot
    console.log(chalk.cyan('🚀 Starting trading bot...'));
    await bot.start();
    
    // Example usage
    console.log(chalk.yellow('\n📋 Example operations:'));
    console.log(chalk.cyan('await bot.getTokenPrice("ETH");'));
    console.log(chalk.cyan('await bot.executeTrade("ETH", "USDC", "100");'));
    console.log(chalk.cyan('await bot.getPortfolioBalance();'));
    
  } catch (error) {
    console.error(chalk.red('❌ Error starting trading bot:'), error.message);
    
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
  console.log(chalk.yellow('\n🛑 Shutting down trading bot gracefully...'));
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(chalk.yellow('\n🛑 Shutting down trading bot gracefully...'));
  process.exit(0);
});

main();
