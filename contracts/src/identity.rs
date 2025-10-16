use psy_sdk::{contract, storage::StorageMap, types::Address};
use serde::{Serialize, Deserialize};

// 学生信息结构体（可序列化）
#[derive(Serialize, Deserialize, Clone)]
pub struct Student {
    pub sdkey: String,  // 学生唯一标识
    pub name: String,   // 可选：姓名（按需存储）
}

// 链上存储：Address（钱包地址）-> Student
contract! {
    storage {
        registry: StorageMap<Address, Student>,
        authority: Address,  // 管理员地址（仅允许其注册学生）
    }

    // 初始化合约（设置管理员）
    init(authority: Address) {
        storage.authority.set(authority);
    }

    // 仅管理员可注册学生
    pub fn register_student(&mut self, student_addr: Address, sdkey: String, name: String) {
        // 权限校验：仅管理员可调用
        assert!(self.env.caller() == storage.authority.get().unwrap(), "Unauthorized");
        
        // 存储学生信息
        storage.registry.insert(
            student_addr,
            Student { sdkey: sdkey.clone(), name }
        );

        // 发射事件（供前端监听）
        self.env.emit_event("StudentRegistered", (student_addr, sdkey));
    }

    // 查询学生信息（公开可读）
    pub fn lookup_sdkey(&self, addr: Address) -> Option<String> {
        storage.registry.get(&addr).map(|s| s.sdkey.clone())
    }
}