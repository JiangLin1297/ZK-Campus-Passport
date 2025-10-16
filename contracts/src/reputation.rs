//! 信誉积分 ledger
//! 记录学生的信誉积分变化（基于活动参与、成就等）

use psy_std::storage::StorageMap;
use serde::{Serialize, Deserialize};

#[derive(Default, Serialize, Deserialize)]
pub struct ReputationLedger {
    // 存储：学生SDKey -> 积分
    scores: StorageMap<String, u64>,
}

impl ReputationLedger {
    pub fn new() -> Self {
        Self::default()
    }

    // 增加积分（仅授权机构可调用）
    pub fn add_points(&mut self, student_sdkey: String, points: u64) -> u64 {
        let current = self.scores.get(&student_sdkey).copied().unwrap_or(0);
        let new_score = current + points;
        self.scores.insert(student_sdkey, new_score);
        new_score
    }

    // 查询积分
    pub fn get_points(&self, student_sdkey: &str) -> u64 {
        self.scores.get(student_sdkey).copied().unwrap_or(0)
    }
}
