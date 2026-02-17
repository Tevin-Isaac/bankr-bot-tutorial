use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

// High-performance trading engine for Bankr
#[derive(Debug, Clone, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct TradeParams {
    pub token_in: String,
    pub token_out: String,
    pub amount_in: String,
    pub slippage: f64,
    pub deadline: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct TradeResult {
    pub success: bool,
    pub amount_out: String,
    pub price: String,
    pub gas_estimate: String,
    pub transaction_data: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct Position {
    pub token: String,
    pub amount: String,
    pub value_usd: String,
    pub pnl: String,
}

#[wasm_bindgen]
pub struct TradingEngine {
    positions: HashMap<String, Position>,
    gas_prices: HashMap<String, f64>,
}

#[wasm_bindgen]
impl TradingEngine {
    #[wasm_bindgen(constructor)]
    pub fn new() -> TradingEngine {
        console_error_panic_hook::set_once();
        TradingEngine {
            positions: HashMap::new(),
            gas_prices: HashMap::new(),
        }
    }

    #[wasm_bindgen]
    pub fn execute_trade(&mut self, params: &TradeParams) -> Result<TradeResult, JsValue> {
        // High-performance trade execution logic
        let amount_out = self.calculate_output_amount(&params.token_in, &params.token_out, &params.amount_in)?;
        let gas_estimate = self.estimate_gas(&params.token_in, &params.token_out)?;
        
        let result = TradeResult {
            success: true,
            amount_out,
            price: self.calculate_price(&params.token_in, &params.token_out)?,
            gas_estimate,
            transaction_data: self.build_transaction_data(params)?,
        };
        
        Ok(result)
    }

    #[wasm_bindgen]
    pub fn get_portfolio_value(&self) -> String {
        let total_value: f64 = self.positions.values()
            .map(|pos| pos.value_usd.parse::<f64>().unwrap_or(0.0))
            .sum();
        
        total_value.to_string()
    }

    #[wasm_bindgen]
    pub fn add_position(&mut self, token: &str, amount: &str, value_usd: &str) {
        let position = Position {
            token: token.to_string(),
            amount: amount.to_string(),
            value_usd: value_usd.to_string(),
            pnl: "0.00".to_string(),
        };
        
        self.positions.insert(token.to_string(), position);
    }

    #[wasm_bindgen]
    pub fn calculate_risk(&self) -> String {
        let total_value: f64 = self.positions.values()
            .map(|pos| pos.value_usd.parse::<f64>().unwrap_or(0.0))
            .sum();
        
        // Simple risk calculation (can be enhanced)
        let risk_score = if total_value > 10000.0 {
            "HIGH"
        } else if total_value > 1000.0 {
            "MEDIUM"
        } else {
            "LOW"
        };
        
        risk_score.to_string()
    }

    #[wasm_bindgen]
    pub fn optimize_gas(&mut self, network: &str) -> String {
        // Gas optimization logic
        let optimal_gas = match network {
            "ethereum" => "20",
            "base" => "0.1",
            "polygon" => "30",
            _ => "20",
        };
        
        optimal_gas.to_string()
    }

    // Private helper methods
    fn calculate_output_amount(&self, token_in: &str, token_out: &str, amount_in: &str) -> Result<String, JsValue> {
        let amount = amount_in.parse::<f64>()
            .map_err(|_| JsValue::from_str("Invalid amount"))?;
        
        // Simplified calculation (in real implementation, use DEX data)
        let output_amount = match (token_in, token_out) {
            ("ETH", "USDC") => amount * 2000.0 * 0.997, // 0.3% fee
            ("USDC", "ETH") => amount / 2000.0 * 0.997,
            _ => amount * 0.997, // Default 0.3% fee
        };
        
        Ok(format!("{:.6}", output_amount))
    }

    fn calculate_price(&self, token_in: &str, token_out: &str) -> Result<String, JsValue> {
        let price = match (token_in, token_out) {
            ("ETH", "USDC") => "2000.00",
            ("USDC", "ETH") => "0.0005",
            _ => "1.00",
        };
        
        Ok(price.to_string())
    }

    fn estimate_gas(&self, token_in: &str, token_out: &str) -> Result<String, JsValue> {
        let gas = match (token_in, token_out) {
            ("ETH", _) => "21000",
            (_, "ETH") => "50000",
            _ => "100000",
        };
        
        Ok(gas.to_string())
    }

    fn build_transaction_data(&self, params: &TradeParams) -> Result<String, JsValue> {
        // Build transaction data (simplified)
        let tx_data = format!(
            "0x{}{}{}{}",
            hex::encode(params.token_in.as_bytes()),
            hex::encode(params.token_out.as_bytes()),
            hex::encode(params.amount_in.as_bytes()),
            hex::encode(params.slippage.to_string().as_bytes())
        );
        
        Ok(tx_data)
    }
}

// Utility functions for performance
#[wasm_bindgen]
pub fn calculate_slippage(amount_in: &str, amount_out: &str, expected_out: &str) -> f64 {
    let in_val = amount_in.parse::<f64>().unwrap_or(0.0);
    let out_val = amount_out.parse::<f64>().unwrap_or(0.0);
    let expected_val = expected_out.parse::<f64>().unwrap_or(0.0);
    
    if expected_val == 0.0 {
        return 0.0;
    }
    
    ((expected_val - out_val) / expected_val) * 100.0
}

#[wasm_bindgen]
pub fn format_amount(amount: &str, decimals: u8) -> String {
    let value = amount.parse::<f64>().unwrap_or(0.0);
    let divisor = 10_f64.powi(decimals as i32);
    format!("{:.6}", value / divisor)
}

// Initialize console error panic hook for better debugging
#[wasm_bindgen(start)]
pub fn main() {
    console_error_panic_hook::set_once();
}
