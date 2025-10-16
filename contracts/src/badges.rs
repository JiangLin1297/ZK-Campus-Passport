//! 成就徽章系统
//! 管理学生获得的各类校园成就（竞赛、志愿活动等）

use std::collections::HashMap;
use psy_std::storage::StorageMap;
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Badge {
    pub badge_id: String,       // 徽章唯一标识
    pub metadata_uri: String,   // 徽章元数据（描述、图标等）
    pub issuer: String,         // 发行机构SDKey
    pub issued_at: u64,         // 发行时间戳
}

#[derive(Default, Serialize, Deserialize)]
pub struct BadgeSystem {
    // 存储：学生SDKey -> 徽章列表
    student_badges: StorageMap<String, Vec<Badge>>,
}

impl BadgeSystem {
    pub fn new() -> Self {
        Self::default()
    }

    // 发行徽章（仅授权机构可调用）
    pub fn issue_badge(&mut self, student_sdkey: String, badge: Badge) -> bool {
        let entry = self.student_badges.entry(student_sdkey).or_insert_with(Vec::new);
        entry.push(badge);
        true
    }

    // 查询学生的所有徽章
    pub fn get_student_badges(&self, student_sdkey: &str) -> Vec<Badge> {
        self.student_badges.get(student_sdkey).cloned().unwrap_or_default()
    }

    // 验证徽章是否存在
    pub fn has_badge(&self, student_sdkey: &str, badge_id: &str) -> bool {
        self.student_badges
            .get(student_sdkey)
            .map_or(false, |badges| badges.iter().any(|b| b.badge_id == badge_id))
    }
}
