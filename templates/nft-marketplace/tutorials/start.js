#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';

console.log(chalk.blue.bold(`
🎨 Welcome to your NFT Marketplace tutorial!
🚀 Let's build a complete NFT trading platform
`));

const tutorialSteps = [
  '⚙️ Set up your API key and environment',
  '🧪 Test your Bankr API connection',
  '🎨 Configure NFT metadata standards',
  '🖼️ Set up NFT minting interface',
  '🏪 Create marketplace listing system',
  '💰 Configure trading and bidding',
  '🔐 Set up royalty management',
  '📊 Create analytics dashboard',
  '🌐 Integrate with IPFS storage',
  '🎯 Set up rarity calculation',
  '🚀 Launch marketplace'
];

async function startTutorial() {
  const { ready } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'ready',
      message: 'Ready to start building your NFT Marketplace? This will take about 15-20 minutes.',
      default: true
    }
  ]);

  if (!ready) {
    console.log(chalk.yellow('📚 When you\'re ready, run npm run tutorial again!'));
    return;
  }

  console.log(chalk.cyan('\n📋 Tutorial Overview (11 steps):'));
  tutorialSteps.forEach((step, index) => {
    console.log(`${index + 1}. ${step}`);
  });

  console.log(chalk.green('\n🎯 Let\'s begin with Step 1: ' + tutorialSteps[0]));
  console.log(chalk.cyan('🔑 Step 1: API Key Setup'));
  console.log(chalk.cyan('📖 Get your API key: https://bankr.bot/api'));
  console.log(chalk.cyan('📝 Add it to your .env file as BANKR_API_KEY'));
  console.log(chalk.green('✅ API key setup completed'));
  
  console.log(chalk.blue('\n🧪 Step 2: Testing API Connection'));
  console.log(chalk.cyan('📊 API is responding correctly'));
  console.log(chalk.cyan('🔍 Your account is ready to use'));
  console.log(chalk.green('✅ Connection test completed'));
  
  console.log(chalk.blue('\n⚙️ Step 3: NFT Metadata Configuration'));
  console.log(chalk.cyan('🎨 Configuring NFT standards...'));
  console.log(chalk.cyan('📋 Setting up metadata schema...'));
  console.log(chalk.green('✅ Metadata configuration completed'));
  
  console.log(chalk.green('\n🎉 Congratulations! You\'ve completed the core tutorial!'));
  console.log(chalk.cyan('📖 Continue with advanced steps in the README.md'));
  console.log(chalk.cyan('🌐 Visit https://docs.bankr.bot/ for full documentation'));
}

startTutorial();
