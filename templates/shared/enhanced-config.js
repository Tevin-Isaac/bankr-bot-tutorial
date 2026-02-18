import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

// Configuration schema
const configSchema = z.object({
  // Bankr API configuration
  bankrApiKey: z.string().optional(),
  bankrApiUrl: z.string().default('https://api.bankr.bot'),
  bankrTimeout: z.number().default(30000),
  
  // Blockchain configuration
  blockchain: z.enum(['base', 'ethereum', 'polygon']).default('base'),
  rpcUrl: z.string().optional(),
  
  // Trading configuration
  tradingEnabled: z.boolean().default(true),
  maxSlippage: z.number().default(0.5),
  minProfitThreshold: z.number().default(0.01),
  
  // Arbitrage configuration
  arbitrageEnabled: z.boolean().default(true),
  scanInterval: z.number().default(5000),
  maxGasPrice: z.number().default(50),
  
  // Security configuration
  privateKey: z.string().optional(),
  walletAddress: z.string().optional(),
  
  // Performance configuration
  useRustPerformance: z.boolean().default(true),
  enableCaching: z.boolean().default(true),
  
  // Logging configuration
  logLevel: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  enableMetrics: z.boolean().default(true)
});

// Create and validate configuration
export function createConfig() {
  try {
    const config = configSchema.parse({
      bankrApiKey: process.env.BANKR_API_KEY,
      bankrApiUrl: process.env.BANKR_API_URL,
      bankrTimeout: process.env.BANKR_TIMEOUT ? parseInt(process.env.BANKR_TIMEOUT) : undefined,
      blockchain: process.env.BLOCKCHAIN,
      rpcUrl: process.env.RPC_URL,
      tradingEnabled: process.env.TRADING_ENABLED !== 'false',
      maxSlippage: process.env.MAX_SLIPPAGE ? parseFloat(process.env.MAX_SLIPPAGE) : undefined,
      minProfitThreshold: process.env.MIN_PROFIT_THRESHOLD ? parseFloat(process.env.MIN_PROFIT_THRESHOLD) : undefined,
      arbitrageEnabled: process.env.ARBITRAGE_ENABLED !== 'false',
      scanInterval: process.env.SCAN_INTERVAL ? parseInt(process.env.SCAN_INTERVAL) : undefined,
      maxGasPrice: process.env.MAX_GAS_PRICE ? parseInt(process.env.MAX_GAS_PRICE) : undefined,
      privateKey: process.env.PRIVATE_KEY,
      walletAddress: process.env.WALLET_ADDRESS,
      useRustPerformance: process.env.USE_RUST_PERFORMANCE !== 'false',
      enableCaching: process.env.ENABLE_CACHING !== 'false',
      logLevel: process.env.LOG_LEVEL,
      enableMetrics: process.env.ENABLE_METRICS !== 'false'
    });

    console.log('🔧 Configuration loaded:', {
      blockchain: config.blockchain,
      tradingEnabled: config.tradingEnabled,
      arbitrageEnabled: config.arbitrageEnabled,
      useRustPerformance: config.useRustPerformance,
      logLevel: config.logLevel
    });

    return config;
  } catch (error) {
    console.error('❌ Configuration error:', error.message);
    process.exit(1);
  }
}

// Export configuration utilities
export function validateConfig(config) {
  if (config.arbitrageEnabled && !config.walletAddress) {
    throw new Error('Wallet address is required for arbitrage');
  }
  
  if (config.tradingEnabled && !config.privateKey) {
    throw new Error('Private key is required for trading');
  }
  
  return true;
}

// Export helper functions
export function getConfigValue(key, defaultValue = null) {
  return process.env[key] || defaultValue;
}

export function setConfigValue(key, value) {
  process.env[key] = value;
}
