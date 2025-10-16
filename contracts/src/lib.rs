//! ZK-Campus Passport 核心合约
//! 包含身份认证、徽章管理、信誉积分及ZK证明验证功能

pub mod identity;
pub mod badges;
pub mod reputation;
pub mod zk_verifier;

// 导出核心功能供外部调用
pub use identity::IdentityRegistry;
pub use badges::BadgeSystem;
pub use reputation::ReputationLedger;
pub use zk_verifier::ZKVerifier;

// 初始化合约入口（对接Psy SDK）
#[psy_sdk::contract]
pub struct ZKCampusPassport {
    identity: IdentityRegistry,
    badges: BadgeSystem,
    reputation: ReputationLedger,
    zk_verifier: ZKVerifier,
}

impl ZKCampusPassport {
    // 合约初始化函数
    pub fn new() -> Self {
        Self {
            identity: IdentityRegistry::new(),
            badges: BadgeSystem::new(),
            reputation: ReputationLedger::new(),
            zk_verifier: ZKVerifier::new(),
        }
    }
}
