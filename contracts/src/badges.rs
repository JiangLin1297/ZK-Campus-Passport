use psy_sdk::{contract, storage::StorageMap, types::Address};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct Badge {
    pub id: String,       // 徽章唯一ID
    pub event: String,    // 关联赛事/活动
    pub issued_at: u64,   // 颁发时间（时间戳）
    pub issuer: Address,  // 颁发机构地址
}

contract! {
    storage {
        badges: StorageMap<(Address, String), Badge>,  // (学生地址, 徽章ID) -> 徽章信息
        issuers: StorageMap<Address, bool>,            // 授权颁发机构
    }

    // 初始化：设置默认颁发机构
    init(default_issuer: Address) {
        storage.issuers.insert(default_issuer, true);
    }

    // 授权新的颁发机构（仅合约拥有者）
    pub fn add_issuer(&mut self, issuer: Address) {
        assert!(self.env.caller() == self.env.owner(), "Only owner can add issuers");
        storage.issuers.insert(issuer, true);
    }

    // 颁发徽章（仅授权机构）
    pub fn issue_badge(&mut self, student: Address, badge: Badge) {
        let caller = self.env.caller();
        assert!(storage.issuers.get(&caller).unwrap_or(false), "Unauthorized issuer");
        
        // 存储徽章（学生地址+徽章ID作为键，避免重复）
        storage.badges.insert((student, badge.id.clone()), badge.clone());
        
        // 发射事件
        self.env.emit_event("BadgeIssued", (student, badge.id));
    }

    // 查询学生的徽章
    pub fn get_student_badges(&self, student: Address) -> Vec<Badge> {
        storage.badges.iter()
            .filter(|((addr, _), _)| *addr == student)
            .map(|(_, badge)| badge.clone())
            .collect()
    }
}