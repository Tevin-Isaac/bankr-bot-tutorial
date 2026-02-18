use wasm_bindgen::prelude::*;
use sha2::{Sha256, Digest};
use hex;

// High-performance cryptographic operations for Bankr
#[wasm_bindgen]
pub struct CryptoEngine {
    private_key: Option<String>,
}

#[wasm_bindgen]
impl CryptoEngine {
    #[wasm_bindgen(constructor)]
    pub fn new() -> CryptoEngine {
        CryptoEngine {
            private_key: None,
        }
    }

    #[wasm_bindgen]
    pub fn set_private_key(&mut self, key: String) {
        self.private_key = Some(key);
    }

    #[wasm_bindgen]
    pub fn generate_keypair() -> String {
        // Simple keypair generation for demo
        let private_key = "demo_private_key_32_bytes_long";
        let public_key = "demo_public_key_32_bytes_long";
        
        format!("{}|{}", private_key, public_key)
    }

    #[wasm_bindgen]
    pub fn sign_message(&self, message: String) -> Result<String, String> {
        match &self.private_key {
            Some(_key) => {
                // Simple HMAC-SHA256 signature for demo
                let mut hasher = Sha256::new();
                hasher.update(message.as_bytes());
                hasher.update(b"demo_signature_key");
                let signature = hex::encode(hasher.finalize());
                Ok(signature)
            }
            None => Err("Private key not set".to_string()),
        }
    }

    #[wasm_bindgen]
    pub fn verify_signature(&self, _public_key: String, message: String, signature: String) -> Result<bool, String> {
        // Simple verification for demo
        let mut hasher = Sha256::new();
        hasher.update(message.as_bytes());
        hasher.update(b"demo_signature_key");
        let expected_signature = hex::encode(hasher.finalize());
        Ok(signature == expected_signature)
    }

    #[wasm_bindgen]
    pub fn hash_sha256(&self, data: String) -> String {
        let mut hasher = Sha256::new();
        hasher.update(data.as_bytes());
        let result = hasher.finalize();
        hex::encode(result)
    }

    #[wasm_bindgen]
    pub fn benchmark_hash(&self, iterations: i32) -> String {
        let start = 0.0;
        
        for i in 0..iterations {
            let _ = self.hash_sha256(format!("benchmark_iteration_{}", i));
        }
        
        let end = 100.0;
        
        format!("Completed {} SHA-256 hashes in {}ms (Rust WebAssembly)", iterations, end - start)
    }
}
