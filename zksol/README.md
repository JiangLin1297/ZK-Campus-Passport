# ZK Campus Passport

一个基于零知识证明的隐私保护学术成就验证系统。

## 系统要求

### 软件依赖
- **Node.js**: >= 16.0.0 (推荐 18.x 或更高版本)
- **npm**: >= 8.0.0 (或 yarn >= 1.22.0)
- **Git**: 用于克隆项目

### 硬件要求
- **内存**: 至少 4GB RAM (推荐 8GB+)
- **存储**: 至少 2GB 可用空间
- **处理器**: 支持现代 JavaScript 引擎

## 项目结构

```
zksol/
├── contracts/           # 智能合约
│   ├── GPAVerifier.sol     # ZK证明验证器
│   └── ZKCampusPassport.sol # 主要护照合约
├── circuits/            # ZK电路
│   └── gpa_proof.circom    # GPA证明电路
├── scripts/             # 核心脚本
│   ├── deploy.js           # 部署合约
│   ├── demo.js             # 系统演示
│   └── generate_proof.js   # 生成ZK证明
├── setup/               # ZK设置文件
│   ├── gpa_proof_0001.zkey # 证明密钥
│   ├── pot12_final.ptau    # 可信设置
│   └── verification_key.json # 验证密钥
├── proof.json           # 示例证明
├── public.json          # 示例公共输入
├── deployment.json      # 部署信息
└── package.json         # 项目依赖
```

## 安装指南

### 1. 克隆项目
```bash
git clone <repository-url>
cd ZK-Campus-Passport/zksol
```

### 2. 安装依赖
```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install
```

### 3. 环境配置
```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件，配置必要的环境变量
# PRIVATE_KEY=your_private_key_here
# INFURA_API_KEY=your_infura_key_here (可选，用于测试网部署)
```

## 快速开始

### 1. 启动本地区块链网络
```bash
npx hardhat node
```
> 💡 **提示**: 保持此终端运行，它将提供本地以太坊网络

### 2. 部署智能合约
在新的终端窗口中运行：
```bash
npx hardhat run scripts/deploy.js --network localhost
```
> ✅ **成功标志**: 看到合约地址输出，deployment.json 文件被创建

### 3. 运行系统演示
```bash
npx hardhat run scripts/demo.js --network localhost
```
> 🎯 **预期结果**: 看到完整的学生注册、要求创建和证明验证流程

## 详细使用说明

### 生成新的零知识证明
```bash
# 生成自定义 GPA 证明
npx hardhat run scripts/generate_proof.js --network localhost
```

### 部署到测试网络
```bash
# 部署到 Sepolia 测试网
npx hardhat run scripts/deploy.js --network sepolia

# 部署到 Goerli 测试网
npx hardhat run scripts/deploy.js --network goerli
```

### 验证合约 (可选)
```bash
# 在 Etherscan 上验证合约
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

## 核心功能

### 🎓 学生注册
- 使用 GPA 承诺哈希注册系统
- 保护学生隐私信息
- 生成唯一的学生身份标识

### 📋 要求创建
- 管理员创建不同的 GPA 要求
- 支持多种验证场景
- 灵活的要求参数配置

### 🔐 零知识证明
- 在不泄露具体 GPA 的情况下证明满足要求
- 使用 Groth16 算法确保高效验证
- 支持批量验证操作

### 📊 状态查询
- 查询学生的验证状态和记录
- 追踪历史验证记录
- 实时更新验证状态

## 技术特性

- **🔒 隐私保护**: 使用 Groth16 零知识证明算法
- **⛓️ 区块链存储**: 不可篡改的验证记录
- **⚡ 高效验证**: 快速的链上证明验证
- **🔧 灵活应用**: 支持多种学术要求场景
- **🛡️ 安全可靠**: 经过测试的智能合约
- **📱 易于集成**: 标准化的 API 接口

## 应用场景

### 🏆 奖学金申请
- 验证 GPA 是否达到奖学金要求
- 保护申请者的具体成绩隐私
- 自动化审核流程

### 🎖️ 荣誉学会认证
- 验证学术成就资格
- 建立可信的认证体系
- 防止成绩造假

### 🏅 学术竞赛参与
- 验证参赛资格
- 确保公平竞争环境
- 简化报名流程

### 💼 就业 GPA 验证
- 为雇主提供可信的学术验证
- 保护求职者隐私
- 减少背景调查成本

## 故障排除

### 常见问题

**Q: 安装依赖时出现错误**
```bash
# 清理缓存并重新安装
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Q: 合约部署失败**
```bash
# 检查网络连接和配置
npx hardhat node --verbose
```

**Q: 证明生成失败**
```bash
# 检查 setup 目录中的密钥文件是否完整
ls -la setup/
```

### 获取帮助
- 查看 Hardhat 文档: https://hardhat.org/docs
- 检查项目 Issues
- 联系开发团队

## 开发指南

### 运行测试
```bash
npx hardhat test
```

### 编译合约
```bash
npx hardhat compile
```

### 清理构建文件
```bash
npx hardhat clean
```

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](../LICENSE) 文件了解详情。
