// badges.rs - Badge issuance skeleton (placeholder)
// - issue_badge(sdkey_pub, badge_id, metadata_uri)
// - get_badges(sdkey_pub) -> Vec<Badge>

use std::collections::HashMap;
use std::sync::Mutex;
use serde::{Serialize, Deserialize};
use lazy_static::lazy_static;

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Badge {
    pub badge_id: String,
    pub metadata_uri: String,
    pub issuer: String,
}

lazy_static! {
    static ref BADGES: Mutex<HashMap<String, Vec<Badge>>> = Mutex::new(HashMap::new());
}

pub fn issue_badge(sdkey: &str, badge: Badge) -> bool {
    let mut map = BADGES.lock().unwrap();
    let entry = map.entry(sdkey.to_string()).or_insert_with(Vec::new);
    entry.push(badge);
    true
}

pub fn get_badges(sdkey: &str) -> Vec<Badge> {
    let map = BADGES.lock().unwrap();
    map.get(sdkey).cloned().unwrap_or_default()
}
