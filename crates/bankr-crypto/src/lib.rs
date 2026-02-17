use wasm_bindgen::prelude::*;
use ed25519_dalek::{Keypair, Signer, PublicKey};
use sha2::{Sha256, Digest};
use hex;

// High-performance cryptographic operations for Bankr
#[wasm_bindgen]
pub struct CryptoEngine {
    keypair: Option<Keypair>,
}

#[wasm_bindgen]
impl CryptoEngine {
    #[wasm_bindgen(constructor)]
    pub fn new() -> CryptoEngine {
        console_error_panic_hook::set_once();
        CryptoEngine { keypair: None }
    }

    #[wasm_bindgen]
    pub fn from_private_key(&mut self, private_key: &str) -> Result<(), JsValue> {
        let private_bytes = hex::decode(private_key)
            .map_err(|e| JsValue::from_str(&format!("Invalid private key: {}", e)))?;
        
        if private_bytes.len() != 32 {
            return Err(JsValue::from_str("Private key must be 32 bytes"));
        }

        let mut key_bytes = [0u8; 32];
        key_bytes.copy_from_slice(&private_bytes);
        
        self.keypair = Some(Keypair::from_bytes(&key_bytes)
            .map_err(|e| JsValue::from_str(&format!("Invalid keypair: {}", e)))?);
        
        Ok(())
    }

    #[wasm_bindgen]
    pub fn get_public_key(&self) -> Result<String, JsValue> {
        let keypair = self.keypair.as_ref()
            .ok_or_else(|| JsValue::from_str("No private key set"))?;
        
        let public_key = keypair.public;
        Ok(hex::encode(public_key.as_bytes()))
    }

    #[wasm_bindgen]
    pub fn sign_transaction(&self, message: &str) -> Result<String, JsValue> {
        let keypair = self.keypair.as_ref()
            .ok_or_else(|| JsValue::from_str("No private key set"))?;
        
        let message_hash = Sha256::digest(message.as_bytes());
        let signature = keypair.sign(&message_hash);
        
        Ok(hex::encode(signature.to_bytes()))
    }

    #[wasm_bindgen]
    pub fn verify_signature(&self, public_key: &str, message: &str, signature: &str) -> Result<bool, JsValue> {
        let public_bytes = hex::decode(public_key)
            .map_err(|e| JsValue::from_str(&format!("Invalid public key: {}", e)))?;
        
        let signature_bytes = hex::decode(signature)
            .map_err(|e| JsValue::from_str(&format!("Invalid signature: {}", e)))?;
        
        let public_key = PublicKey::from_bytes(&public_bytes)
            .map_err(|e| JsValue::from_str(&format!("Invalid public key: {}", e)))?;
        
        let message_hash = Sha256::digest(message.as_bytes());
        
        match public_key.verify(&message_hash, &signature_bytes) {
            Ok(_) => Ok(true),
            Err(_) => Ok(false),
        }
    }

    #[wasm_bindgen]
    pub fn hash_data(&self, data: &str) -> String {
        let hash = Sha256::digest(data.as_bytes());
        hex::encode(hash)
    }

    #[wasm_bindgen]
    pub fn generate_keypair() -> JsValue {
        let keypair = Keypair::generate(&mut rand::thread_rng());
        let result = js_sys::Object::new();
        
        js_sys::Reflect::set(
            &result, 
            &JsValue::from_str("privateKey"), 
            &JsValue::from_str(&hex::encode(keypair.to_bytes()))
        ).unwrap();
        
        js_sys::Reflect::set(
            &result, 
            &JsValue::from_str("publicKey"), 
            &JsValue::from_str(&hex::encode(keypair.public.to_bytes()))
        ).unwrap();
        
        result.into()
    }
}

// Utility functions for performance
#[wasm_bindgen]
pub fn fast_hash(data: &str) -> String {
    let hash = Sha256::digest(data.as_bytes());
    hex::encode(hash)
}

#[wasm_bindgen]
pub fn validate_address(address: &str) -> bool {
    address.len() == 42 && address.starts_with("0x")
}

// Initialize console error panic hook for better debugging
#[wasm_bindgen(start)]
pub fn main() {
    console_error_panic_hook::set_once();
}
