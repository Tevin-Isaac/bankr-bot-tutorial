#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

/**
 * Helper scripts to integrate with @bankr/cli
 */

export class BankrCliHelper {
  constructor() {
    this.configPath = path.join(require('os').homedir(), '.bankr', 'config.json');
  }

  /**
   * Check if @bankr/cli is installed
   */
  isCliInstalled() {
    try {
      execSync('bankr --version', { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    try {
      if (fs.existsSync(this.configPath)) {
        const config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
        return !!config.apiKey;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Get authentication status
   */
  getAuthStatus() {
    return {
      installed: this.isCliInstalled(),
      authenticated: this.isAuthenticated(),
      configPath: this.configPath
    };
  }

  /**
   * Install @bankr/cli
   */
  async installCli() {
    console.log('📦 Installing @bankr/cli...');
    try {
      execSync('npm install -g @bankr/cli', { stdio: 'inherit' });
      console.log('✅ @bankr/cli installed successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to install @bankr/cli:', error.message);
      return false;
    }
  }

  /**
   * Guide user through authentication
   */
  showAuthGuide() {
    const status = this.getAuthStatus();
    
    console.log(`
🔗 Bankr CLI Integration Status:
${status.installed ? '✅ @bankr/cli installed' : '❌ @bankr/cli not installed'}
${status.authenticated ? '✅ Authenticated' : '❌ Not authenticated'}

📋 Quick Setup:
${!status.installed ? `
1. Install @bankr/cli:
   npm install -g @bankr/cli` : ''}

${!status.authenticated ? `
2. Login with email:
   bankr login email user@example.com
   
   Or login with existing API key:
   bankr login --api-key bk_your_key` : ''}

3. Your app will automatically use the authentication!

🚀 Once authenticated, you can:
- Use your app for automated trading
- Use @bankr/cli for manual operations
- Switch between both seamlessly

💡 Pro tip: Run 'bankr whoami' to verify your setup
    `);
  }

  /**
   * Execute bankr command and return result
   */
  async executeBankrCommand(command, args = []) {
    try {
      const fullCommand = `bankr ${command} ${args.join(' ')}`;
      const result = execSync(fullCommand, { encoding: 'utf8', stdio: 'pipe' });
      return { success: true, output: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Get user info from @bankr/cli
   */
  async getUserInfo() {
    const result = await this.executeBankrCommand('whoami');
    if (result.success) {
      console.log('👤 Bankr User Info:');
      console.log(result.output);
    }
    return result;
  }

  /**
   * Show available skills
   */
  async showSkills() {
    const result = await this.executeBankrCommand('skills');
    if (result.success) {
      console.log('🛠️  Available Bankr Skills:');
      console.log(result.output);
    }
    return result;
  }

  /**
   * Quick price check using @bankr/cli
   */
  async getPrice(token) {
    const result = await this.executeBankrCommand('prompt', [`what is the price of ${token}?`]);
    if (result.success) {
      console.log(`💰 ${token} Price:`);
      console.log(result.output);
    }
    return result;
  }

  /**
   * Setup integration for the current project
   */
  async setupIntegration() {
    const status = this.getAuthStatus();
    
    console.log('🔗 Setting up @bankr/cli integration...');
    
    if (!status.installed) {
      console.log('📦 Installing @bankr/cli...');
      const installed = await this.installCli();
      if (!installed) {
        console.log('❌ Please install @bankr/cli manually: npm install -g @bankr/cli');
        return false;
      }
    }

    if (!status.authenticated) {
      console.log('🔑 Please authenticate with @bankr/cli:');
      console.log('   bankr login email user@example.com');
      console.log('   Or: bankr login --api-key bk_your_key');
      console.log('\n💡 After authentication, your app will automatically use it!');
      return false;
    }

    console.log('✅ @bankr/cli integration ready!');
    await this.getUserInfo();
    return true;
  }
}

// CLI interface for standalone usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const helper = new BankrCliHelper();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'status':
      helper.showAuthGuide();
      break;
    case 'setup':
      helper.setupIntegration();
      break;
    case 'whoami':
      helper.getUserInfo();
      break;
    case 'skills':
      helper.showSkills();
      break;
    case 'price':
      const token = process.argv[3];
      if (token) {
        helper.getPrice(token);
      } else {
        console.log('Usage: node cli-helpers.js price <token>');
      }
      break;
    default:
      console.log(`
Bankr CLI Helper Commands:
  status    - Show authentication status
  setup     - Setup @bankr/cli integration
  whoami    - Show user info
  skills    - Show available skills
  price     - Get token price (usage: price <token>)
      `);
  }
}

export default BankrCliHelper;
