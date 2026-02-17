import fs from 'fs-extra';
import path from 'path';
import os from 'os';

/**
 * Hybrid authentication that supports both:
 * 1. Environment variables (current method)
 * 2. @bankr/cli config file (~/.bankr/config.json)
 */

export interface BankrConfig {
  apiKey: string;
  apiUrl?: string;
  llmKey?: string;
  llmUrl?: string;
}

/**
 * Get Bankr API key from multiple sources
 * Priority: Environment variables > ~/.bankr/config.json > Error
 */
export function getBankrApiKey(): string {
  // 1. Check environment variable (current method)
  if (process.env.BANKR_API_KEY) {
    console.log('✅ Using BANKR_API_KEY from environment');
    return process.env.BANKR_API_KEY;
  }

  // 2. Check @bankr/cli config file
  try {
    const configPath = path.join(os.homedir(), '.bankr', 'config.json');
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      if (config.apiKey) {
        console.log('✅ Using API key from @bankr/cli config');
        return config.apiKey;
      }
    }
  } catch (error) {
    console.log('⚠️  Could not read @bankr/cli config');
  }

  // 3. No authentication found
  throw new Error(`
❌ No Bankr API key found!

Option 1: Use environment variables
   export BANKR_API_KEY=bk_your_key

Option 2: Use @bankr/cli (recommended)
   npm install -g @bankr/cli
   bankr login email user@example.com

Option 3: Get key from Bankr Terminal
   Visit: https://bankr.bot/terminal
  `);
}

/**
 * Get full Bankr configuration from @bankr/cli
 */
export function getBankrConfig(): BankrConfig {
  try {
    const configPath = path.join(os.homedir(), '.bankr', 'config.json');
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
  } catch (error) {
    // Config file doesn't exist or is invalid
  }

  // Fallback to environment variables
  return {
    apiKey: process.env.BANKR_API_KEY || '',
    apiUrl: process.env.BANKR_BASE_URL || 'https://api.bankr.bot',
    llmKey: process.env.BANKR_LLM_KEY,
    llmUrl: process.env.BANKR_LLM_URL
  };
}

/**
 * Check if @bankr/cli is installed and authenticated
 */
export function checkBankrCliStatus(): {
  installed: boolean;
  authenticated: boolean;
  config?: BankrConfig;
} {
  try {
    // Check if config exists
    const configPath = path.join(os.homedir(), '.bankr', 'config.json');
    if (!fs.existsSync(configPath)) {
      return { installed: false, authenticated: false };
    }

    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    return {
      installed: true,
      authenticated: !!config.apiKey,
      config
    };
  } catch {
    return { installed: false, authenticated: false };
  }
}

/**
 * Helper function to guide users to proper authentication
 */
export function showAuthenticationHelp(): void {
  const status = checkBankrCliStatus();
  
  console.log(`
🔑 Bankr Authentication Status:
${status.installed ? '✅ @bankr/cli installed' : '❌ @bankr/cli not installed'}
${status.authenticated ? '✅ Authenticated' : '❌ Not authenticated'}

📋 Recommended Setup:
${!status.installed ? `
1. Install @bankr/cli:
   npm install -g @bankr/cli` : ''}

${!status.authenticated ? `
2. Login with email:
   bankr login email user@example.com` : ''}

3. Your app will automatically use the authentication!

🔧 Alternative (Environment Variables):
   export BANKR_API_KEY=bk_your_key
   export BANKR_BASE_URL=https://api.bankr.bot
  `);
}
