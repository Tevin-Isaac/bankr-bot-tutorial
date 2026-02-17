use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

// High-performance analytics engine for Bankr
#[derive(Debug, Clone, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct MarketData {
    pub timestamp: u64,
    pub price: f64,
    pub volume: f64,
    pub liquidity: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct AnalyticsResult {
    pub avg_price: f64,
    pub volume_24h: f64,
    pub price_change_24h: f64,
    pub volatility: f64,
    pub trend: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct PortfolioMetrics {
    pub total_value: f64,
    pub pnl_24h: f64,
    pub sharpe_ratio: f64,
    pub max_drawdown: f64,
    pub win_rate: f64,
}

#[wasm_bindgen]
pub struct AnalyticsEngine {
    market_data: HashMap<String, Vec<MarketData>>,
    portfolio_history: Vec<PortfolioMetrics>,
}

#[wasm_bindgen]
impl AnalyticsEngine {
    #[wasm_bindgen(constructor)]
    pub fn new() -> AnalyticsEngine {
        console_error_panic_hook::set_once();
        AnalyticsEngine {
            market_data: HashMap::new(),
            portfolio_history: Vec::new(),
        }
    }

    #[wasm_bindgen]
    pub fn add_market_data(&mut self, token: &str, timestamp: u64, price: f64, volume: f64, liquidity: f64) {
        let data = MarketData {
            timestamp,
            price,
            volume,
            liquidity,
        };
        
        self.market_data
            .entry(token.to_string())
            .or_insert_with(Vec::new)
            .push(data);
    }

    #[wasm_bindgen]
    pub fn calculate_analytics(&self, token: &str) -> Result<AnalyticsResult, JsValue> {
        let data = self.market_data.get(token)
            .ok_or_else(|| JsValue::from_str("No data available"))?;
        
        if data.len() < 2 {
            return Err(JsValue::from_str("Insufficient data"));
        }

        let prices: Vec<f64> = data.iter().map(|d| d.price).collect();
        let volumes: Vec<f64> = data.iter().map(|d| d.volume).collect();
        
        let avg_price = prices.iter().sum::<f64>() / prices.len() as f64;
        let volume_24h = volumes.iter().sum::<f64>();
        
        let price_change_24h = if prices.len() >= 2 {
            ((prices.last().unwrap() - prices.first().unwrap()) / prices.first().unwrap()) * 100.0
        } else {
            0.0
        };
        
        let volatility = self.calculate_volatility(&prices);
        let trend = if price_change_24h > 0.0 {
            "BULLISH".to_string()
        } else if price_change_24h < 0.0 {
            "BEARISH".to_string()
        } else {
            "NEUTRAL".to_string()
        };

        Ok(AnalyticsResult {
            avg_price,
            volume_24h,
            price_change_24h,
            volatility,
            trend,
        })
    }

    #[wasm_bindgen]
    pub fn calculate_portfolio_metrics(&self, initial_value: f64, current_value: f64, risk_free_rate: f64) -> PortfolioMetrics {
        let pnl_24h = ((current_value - initial_value) / initial_value) * 100.0;
        
        // Simplified Sharpe ratio calculation
        let excess_return = pnl_24h - risk_free_rate;
        let sharpe_ratio = if pnl_24h != 0.0 {
            excess_return / pnl_24h.abs()
        } else {
            0.0
        };
        
        // Simplified max drawdown (would need more historical data)
        let max_drawdown = if current_value < initial_value {
            ((initial_value - current_value) / initial_value) * 100.0
        } else {
            0.0
        };
        
        // Simplified win rate (would need trade history)
        let win_rate = if pnl_24h > 0.0 {
            100.0
        } else {
            0.0
        };

        PortfolioMetrics {
            total_value: current_value,
            pnl_24h,
            sharpe_ratio,
            max_drawdown,
            win_rate,
        }
    }

    #[wasm_bindgen]
    pub fn detect_arbitrage_opportunities(&self, token1: &str, token2: &str) -> JsValue {
        let opportunities = js_sys::Array::new();
        
        // Simplified arbitrage detection
        if let (Some(data1), Some(data2)) = (self.market_data.get(token1), self.market_data.get(token2)) {
            if let (Some(last1), Some(last2)) = (data1.last(), data2.last()) {
                let price_diff = (last1.price - last2.price).abs();
                let opportunity_threshold = last1.price * 0.01; // 1% threshold
                
                if price_diff > opportunity_threshold {
                    let opportunity = js_sys::Object::new();
                    js_sys::Reflect::set(
                        &opportunity,
                        &JsValue::from_str("token1"),
                        &JsValue::from_str(token1)
                    ).unwrap();
                    js_sys::Reflect::set(
                        &opportunity,
                        &JsValue::from_str("token2"),
                        &JsValue::from_str(token2)
                    ).unwrap();
                    js_sys::Reflect::set(
                        &opportunity,
                        &JsValue::from_str("price_difference"),
                        &JsValue::from_str(&price_diff.to_string())
                    ).unwrap();
                    
                    opportunities.push(&opportunity);
                }
            }
        }
        
        opportunities.into()
    }

    #[wasm_bindgen]
    pub fn calculate_yield_farming_apy(&self, pool_address: &str, total_staked: f64, rewards_per_day: f64) -> f64 {
        // Simplified APY calculation
        let daily_rate = rewards_per_day / total_staked;
        (daily_rate * 365.0) * 100.0
    }

    #[wasm_bindgen]
    pub fn analyze_liquidity_pool(&self, token1: &str, token2: &str) -> JsValue {
        let analysis = js_sys::Object::new();
        
        if let (Some(data1), Some(data2)) = (self.market_data.get(token1), self.market_data.get(token2)) {
            let total_liquidity = data1.iter().map(|d| d.liquidity).sum::<f64>()
                + data2.iter().map(|d| d.liquidity).sum::<f64>();
            
            let avg_volume = (data1.iter().map(|d| d.volume).sum::<f64>()
                + data2.iter().map(|d| d.volume).sum::<f64>()) / 2.0;
            
            js_sys::Reflect::set(
                &analysis,
                &JsValue::from_str("total_liquidity"),
                &JsValue::from_str(&total_liquidity.to_string())
            ).unwrap();
            
            js_sys::Reflect::set(
                &analysis,
                &JsValue::from_str("average_volume"),
                &JsValue::from_str(&avg_volume.to_string())
            ).unwrap();
            
            js_sys::Reflect::set(
                &analysis,
                &JsValue::from_str("efficiency_score"),
                &JsValue::from_str(&(avg_volume / total_liquidity).to_string())
            ).unwrap();
        }
        
        analysis.into()
    }

    // Private helper methods
    fn calculate_volatility(&self, prices: &[f64]) -> f64 {
        if prices.len() < 2 {
            return 0.0;
        }

        let mean = prices.iter().sum::<f64>() / prices.len() as f64;
        let variance = prices.iter()
            .map(|price| (price - mean).powi(2))
            .sum::<f64>() / (prices.len() - 1) as f64;
        
        variance.sqrt()
    }
}

// Utility functions for performance
#[wasm_bindgen]
pub fn calculate_moving_average(prices: &[f64], period: usize) -> Vec<f64> {
    if prices.len() < period {
        return prices.to_vec();
    }

    prices.windows(period)
        .map(|window| window.iter().sum::<f64>() / period as f64)
        .collect()
}

#[wasm_bindgen]
pub fn calculate_rsi(prices: &[f64], period: usize) -> Vec<f64> {
    if prices.len() < period {
        return vec![50.0; prices.len()];
    }

    let mut rsi_values = Vec::new();
    let mut gains = Vec::new();
    let mut losses = Vec::new();

    for i in 1..prices.len() {
        let change = prices[i] - prices[i - 1];
        if change > 0.0 {
            gains.push(change);
            losses.push(0.0);
        } else {
            gains.push(0.0);
            losses.push(change.abs());
        }
    }

    for i in period..gains.len() {
        let avg_gain = gains[i - period..i].iter().sum::<f64>() / period as f64;
        let avg_loss = losses[i - period..i].iter().sum::<f64>() / period as f64;
        
        let rs = if avg_loss != 0.0 { avg_gain / avg_loss } else { 0.0 };
        let rsi = 100.0 - (100.0 / (1.0 + rs));
        rsi_values.push(rsi);
    }

    rsi_values
}

// Initialize console error panic hook for better debugging
#[wasm_bindgen(start)]
pub fn main() {
    console_error_panic_hook::set_once();
}
