// identity.rs - SDKey registry skeleton (placeholder)
// - register_student(email_hash, sdkey_pub)
// - is_registered(sdkey_pub) -> bool
// Replace storage primitives with Psy SDK equivalents when integrating.

use std::collections::HashMap;
use std::sync::Mutex;
use lazy_static::lazy_static;

lazy_static! {
    static ref REGISTRY: Mutex<HashMap<String, String>> = Mutex::new(HashMap::new());
}

pub fn register_student(email_hash: &str, sdkey_pub: &str) -> bool {
    let mut map = REGISTRY.lock().unwrap();
    map.insert(email_hash.to_string(), sdkey_pub.to_string());
    true
}

pub fn lookup_sdkey(email_hash: &str) -> Option<String> {
    let map = REGISTRY.lock().unwrap();
    map.get(email_hash).cloned()
}
