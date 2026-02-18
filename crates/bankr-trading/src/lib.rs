use wasm_bindgen::prelude::*;
use sha2::{Sha256, Digest};
use hex;

// High-performance trading engine for Bankr
#[wasm_bindgen]
pub struct TradingEngine {
    initialized: bool,
}

#[wasm_bindgen]
impl TradingEngine {
    #[wasm_bindgen(constructor)]
    pub fn new() -> TradingEngine {
        TradingEngine {
            initialized: false,
        }
    }

    #[wasm_bindgen]
    pub fn initialize(&mut self) -> String {
        self.initialized = true;
        "Rust trading engine initialized successfully".to_string()
    }

    #[wasm_bindgen]
    pub fn execute_trade(&self, token_in: String, token_out: String, amount_in: String) -> JsValue {
        if !self.initialized {
            return JsValue::from_str("Trading engine not initialized");
        }

        let mut hasher = Sha256::new();
        hasher.update(token_in.as_bytes());
        hasher.update(token_out.as_bytes());
        hasher.update(amount_in.as_bytes());
        let trade_id = hex::encode(hasher.finalize());

        // Simulate ultra-fast trade calculation
        let gas_estimate = 21000 + (amount_in.len() * 100);
        let amount_out = format!("{}.{}", (amount_in.parse::<f64>().unwrap_or(0.0) * 0.997), token_out);

        let result = js_sys::Object::new();
        js_sys::Reflect::set(
            &result,
            &JsValue::from_str("success"),
            &JsValue::from_bool(true),
        );
        js_sys::Reflect::set(
            &result,
            &JsValue::from_str("tradeId"),
            &JsValue::from_str(&trade_id),
        );
        js_sys::Reflect::set(
            &result,
            &JsValue::from_str("amountOut"),
            &JsValue::from_str(&amount_out),
        );
        js_sys::Reflect::set(
            &result,
            &JsValue::from_str("gasEstimate"),
            &JsValue::from_f64(gas_estimate as f64),
        );
        js_sys::Reflect::set(
            &result,
            &JsValue::from_str("slippage"),
            &JsValue::from_str("0.3%"),
        );

        result.into()
    }

    #[wasm_bindgen]
    pub fn get_portfolio_value(&self) -> String {
        if !self.initialized {
            return "Trading engine not initialized".to_string();
        }

        // Simulate portfolio calculation
        let portfolio_value = 100000.0; // $100k portfolio
        let risk_score = 0.15; // 15% risk score

        format!("Portfolio Value: ${:.2}, Risk Score: {:.2}%", portfolio_value, risk_score * 100.0)
    }

    #[wasm_bindgen]
    pub fn calculate_risk(&self) -> String {
        if !self.initialized {
            return "Trading engine not initialized".to_string();
        }

        // Simulate risk calculation
        let volatility = 0.25; // 25% volatility
        let liquidity = 0.85; // 85% liquidity
        let market_depth = 0.90; // 90% market depth

        let risk_score = (volatility * 0.4) + ((1.0 - liquidity) * 0.3) + ((1.0 - market_depth) * 0.3);

        format!("Risk Score: {:.2}% (Volatility: {:.1}%, Liquidity: {:.1}%, Depth: {:.1}%)", 
                risk_score * 100.0, volatility * 100.0, liquidity * 100.0, market_depth * 100.0)
    }

    #[wasm_bindgen]
    pub fn optimize_gas(&self, complexity: i32) -> String {
        if !self.initialized {
            return "Trading engine not initialized".to_string();
        }

        // Simulate gas optimization
        let base_gas = 21000;
        let complexity_multiplier = 1.0 + (complexity as f64 * 0.1);
        let optimized_gas = ((base_gas as f64) * complexity_multiplier) as i32;

        format!("Optimized gas: {} units (complexity: {})", optimized_gas, complexity)
    }
}
