import dotenv from 'dotenv';
import { z } from 'zod';
import { getBankrApiKey, getBankrConfig, showAuthenticationHelp } from './auth-helpers.js';

// Load environment variables
dotenv.config();

// Type definitions
interface BankrConfig {
  apiKey?: string;
  apiUrl?: string;
  llmKey?: string;
  llmUrl?: string;
  email?: string;
}

// Enhanced configuration schema
const configSchema = z.object({
  // Bankr API Configuration (with @bankr/cli integration)
  BANKR_API_KEY: z.string().min(1, 'Bankr API key is required'),
  BANKR_BASE_URL: z.string().url().default('https://api.bankr.bot'),
  BANKR_LLM_KEY: z.string().optional(),
  BANKR_LLM_URL: z.string().url().optional(),
  
  // Project Configuration
  PROJECT_NAME: z.string().default('bankr-app'),
  TEMPLATE: z.string().default('trading-bot'),
  BLOCKCHAIN: z.string().default('base'),
  TYPESCRIPT: z.string().transform(val => val === 'true').default('true'),
  
  // Template-specific configurations
  DEFAULT_CHAIN: z.string().default('base'),
  TRADE_AMOUNT_USD: z.number().default(10),
  MAX_TRADES_PER_HOUR: z.number().default(20),
  
  // Advanced Options
  USE_BANKR_CLI: z.string().transform((val: string) => val === 'true').default('true'),
  CLI_INTEGRATION: z.string().transform((val: string) => val === 'true').default('true'),
});

/**
 * Enhanced configuration that integrates with @bankr/cli
 */
export function createConfig() {
  try {
    // Try to get API key from @bankr/cli first if enabled
    let apiKey = process.env.BANKR_API_KEY;
    let bankrConfig: BankrConfig = getBankrConfig();
    
    if (!apiKey && bankrConfig.apiKey) {
      apiKey = bankrConfig.apiKey;
      console.log('🔗 Using @bankr/cli authentication');
    }
    
    if (!apiKey) {
      showAuthenticationHelp();
      throw new Error('No Bankr API key available');
    }

    // Parse configuration
    const parsedConfig = configSchema.parse({
      BANKR_API_KEY: apiKey,
      BANKR_BASE_URL: process.env.BANKR_BASE_URL || bankrConfig.apiUrl || 'https://api.bankr.bot',
      BANKR_LLM_KEY: process.env.BANKR_LLM_KEY || bankrConfig.llmKey,
      BANKR_LLM_URL: process.env.BANKR_LLM_URL || bankrConfig.llmUrl,
      PROJECT_NAME: process.env.PROJECT_NAME,
      TEMPLATE: process.env.TEMPLATE,
      BLOCKCHAIN: process.env.BLOCKCHAIN,
      TYPESCRIPT: process.env.TYPESCRIPT,
      DEFAULT_CHAIN: process.env.DEFAULT_CHAIN,
      TRADE_AMOUNT_USD: Number(process.env.TRADE_AMOUNT_USD) || 10,
      MAX_TRADES_PER_HOUR: Number(process.env.MAX_TRADES_PER_HOUR) || 20,
      USE_BANKR_CLI: process.env.USE_BANKR_CLI,
      CLI_INTEGRATION: process.env.CLI_INTEGRATION,
    });

    return parsedConfig;
  } catch (error) {
    console.error('❌ Configuration failed:', error.message);
    process.exit(1);
  }
}

export const config = createConfig();

export type Config = z.infer<typeof configSchema>;

/**
 * Validate configuration and show helpful errors
 */
export function validateConfig(): boolean {
  try {
    configSchema.parse(config);
    console.log('✅ Configuration validated successfully');
    return true;
  } catch (error) {
    console.error('❌ Configuration validation failed:', error);
    showAuthenticationHelp();
    return false;
  }
}

/**
 * Show integration status
 */
export function showIntegrationStatus(): void {
  const bankrConfig = getBankrConfig();
  
  console.log(`
🔗 Bankr CLI Integration Status:
✅ API Key: ${config.BANKR_API_KEY ? 'Configured' : 'Missing'}
✅ API URL: ${config.BANKR_BASE_URL}
✅ LLM Gateway: ${config.BANKR_LLM_KEY ? 'Configured' : 'Not configured'}
✅ @bankr CLI: ${bankrConfig.apiKey ? 'Authenticated' : 'Not authenticated'}

📋 Available Commands:
- bankr prompt "what is the price of ETH?"
- bankr whoami
- bankr submit tx --to 0x...

🔧 Your app can now:
- Use Bankr API for automated trading
- Leverage @bankr/cli for manual operations
- Switch between CLI and app seamlessly
  `);
}
