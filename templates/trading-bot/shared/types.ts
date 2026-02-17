// Common types for all Bankr templates
export interface BankrConfig {
  BANKR_API_KEY: string;
  BANKR_BASE_URL: string;
  BANKR_LLM_KEY?: string;
  BANKR_LLM_URL?: string;
  PROJECT_NAME: string;
  TEMPLATE: string;
  BLOCKCHAIN: string;
  TYPESCRIPT: string;
  DEFAULT_CHAIN: string;
  TRADE_AMOUNT_USD?: number;
  MAX_TRADES_PER_HOUR?: number;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Record<string, any>;
}

export interface ListingOptions {
  price: string;
  currency: string;
}

export interface MintResult {
  tokenId: string;
  transactionHash: string;
  transactionData?: any;
}

export interface ListingResult {
  listingId: string;
  status: string;
  transactionData?: any;
}

export interface TradeResult {
  success: boolean;
  transactionHash: string;
  amount: number;
  token: string;
  transactionData?: any;
}

export interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  address: string;
}
