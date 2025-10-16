//! 学生身份注册表
//! 管理邮箱哈希与SDKey公钥的绑定关系

use std::collections::HashMap;
use psy_std::storage::StorageMap;
use serde::{Serialize, Deserialize};

#[derive(Default, Serialize, Deserialize)]
pub struct IdentityRegistry {
    // 存储：邮箱哈希 -> SDKey公钥
    email_to_sdkey: StorageMap<String, String>,
}

impl IdentityRegistry {
    pub fn new() -> Self {
        Self::default()
    }

    // 注册学生身份（仅授权机构可调用）
    pub fn register_student(&mut self, email_hash: String, sdkey_pub: String) -> bool {
        if self.email_to_sdkey.contains_key(&email_hash) {
            return false; // 已注册
        }
        self.email_to_sdkey.insert(email_hash, sdkey_pub);
        true
    }

    // 通过邮箱哈希查询SDKey公钥
    pub fn get_sdkey(&self, email_hash: &str) -> Option<String> {
        self.email_to_sdkey.get(email_hash).cloned()
    }

    // 检查SDKey是否已注册
    pub fn is_registered(&self, sdkey_pub: &str) -> bool {
        self.email_to_sdkey.values().any(|v| v == sdkey_pub)
    }
}
