// reputation.rs - simple reputation ledger (placeholder)
// - add_points(sdkey, points)
// - query_points(sdkey) -> u64

use std::collections::HashMap;
use std::sync::Mutex;
use lazy_static::lazy_static;

lazy_static! {
    static ref REPUTE: Mutex<HashMap<String, u64>> = Mutex::new(HashMap::new());
}

pub fn add_points(sdkey: &str, points: u64) -> u64 {
    let mut map = REPUTE.lock().unwrap();
    let v = map.entry(sdkey.to_string()).or_insert(0);
    *v += points;
    *v
}

pub fn query_points(sdkey: &str) -> u64 {
    let map = REPUTE.lock().unwrap();
    *map.get(sdkey).unwrap_or(&0)
}
