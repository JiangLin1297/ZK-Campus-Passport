// frontend/pages/profile.js
import { useState, useEffect } from "react";
import { useAccount, useContractRead } from 'wagmi';
import { useSignMessage } from 'wagmi';
import toast from 'react-hot-toast';
import Layout from "../components/Layout";
import ProfileCard from "../components/ProfileCard"; // 复用原有卡片组件

// 成就合约ABI
const ACHIEVEMENT_ABI = [
    {
        "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
        "name": "getUserAchievements",
        "outputs": [
            {
                "components": [
                    { "internalType": "uint256", "name": "id", "type": "uint256" },
                    { "internalType": "string", "name": "name", "type": "string" },
                    { "internalType": "string", "name": "date", "type": "string" },
                    { "internalType": "string", "name": "organizer", "type": "string" },
                    { "internalType": "string", "name": "result", "type": "string" }
                ],
                "internalType": "struct Achievement[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
const ACHIEVEMENT_CONTRACT = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // 替换为实际地址

export default function Profile() {
    const { address, isConnected } = useAccount();
    const [email, setEmail] = useState('');
    const [achievements, setAchievements] = useState([]);

    // 从链上读取用户成就（替换原mockData）
    const { data: onChainAchievements, isLoading: isLoadingAchievements } = useContractRead({
        address: ACHIEVEMENT_CONTRACT,
        abi: ACHIEVEMENT_ABI,
        functionName: "getUserAchievements",
        args: [address],
        enabled: isConnected, // 仅在连接钱包后调用
    });

    // 同步链上数据到本地状态
    useEffect(() => {
        if (onChainAchievements) {
            setAchievements(onChainAchievements);
        }
    }, [onChainAchievements]);

    // 邮箱绑定签名功能（新增）
    const { signMessage, isLoading: isSigning } = useSignMessage({
        onSuccess: (signature) => {
            // 发送签名到后端验证（保持原有交互逻辑）
            fetch('/api/user/updateEmail', {
                method: 'POST',
                body: JSON.stringify({ address, email, signature }),
            }).then(res => {
                if (res.ok) toast.success("邮箱绑定成功");
            });
        }
    });

    const handleEmailBind = () => {
        if (!email) {
            toast.error("请输入邮箱");
            return;
        }
        // 生成待签名消息
        const message = `绑定邮箱: ${email}，时间: ${new Date().toISOString()}`;
        signMessage({ message });
    };

    return (
        <Layout>
            {/* 原有个人信息部分保持不变 */}
            <section className="profile-header">
                {/* 内容与原代码一致，仅修改邮箱绑定按钮 */}
                <div className="email-binding">
                    <input
                        type="email"
                        placeholder="输入邮箱地址"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        className="primary-btn"
                        onClick={handleEmailBind}
                        disabled={isSigning}
                    >
                        {isSigning ? "签名中..." : "绑定邮箱"}
                    </button>
                </div>
            </section>

            {/* 成就展示部分（使用原有ProfileCard组件） */}
            <section>
                <h2 className="section-title">🎖️ 我的成就</h2>
                {isConnected ? (
                    isLoadingAchievements ? (
                        <div className="loading-state">加载链上成就中...</div>
                    ) : achievements.length > 0 ? (
                        <div className="use-cases-grid">
                            {achievements.map((result) => (
                                <ProfileCard key={result.id} result={result} /> // 复用原有卡片样式
                            ))}
                        </div>
                    ) : (
                        <div className="feature-card text-center p-10">
                            <p className="text-gray-500 mb-6">尚未有已认证成就</p>
                            <a href="/events" className="primary-btn">浏览赛事</a>
                        </div>
                    )
                ) : (
                    <div className="feature-card text-center p-10">
                        <p className="text-gray-500 mb-6">请连接钱包查看你的成就</p>
                    </div>
                )}
            </section>
        </Layout>
    );
}