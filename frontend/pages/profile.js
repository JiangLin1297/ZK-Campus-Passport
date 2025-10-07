// frontend/pages/profile.js
import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from 'wagmi';
import Layout from "../components/Layout";
import Image from "next/image";

export default function Profile() {
    const { address, isConnected, isLoading } = useAccount();
    const { disconnect } = useDisconnect();

    const [email, setEmail] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [achievements, setAchievements] = useState([]);
    const [scrolled, setScrolled] = useState(false);

    // 滚动动画
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 模拟成就数据
    useEffect(() => {
        if (isConnected && address) {
            const mockData = [
                //此处等待后端接口完善，先用模拟数据
            ];
            setAchievements(mockData);
        } else {
            setAchievements([]);
        }
    }, [isConnected, address]);

    // 从后端获取绑定邮箱
    useEffect(() => {
        async function fetchEmail() {
            if (isConnected && address) {
                const res = await fetch(`/api/user/getEmail?walletAddress=${address}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.email) setEmail(data.email);
                }
            }
        }
        fetchEmail();
    }, [isConnected, address]);

    // 更新邮箱
    const handleUpdateEmail = async () => {
        if (!isConnected) {
            setEmailMessage('请先连接钱包');
            return;
        }
        if (!email) {
            setEmailMessage('邮箱不能为空');
            return;
        }

        const res = await fetch('/api/user/updateEmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ walletAddress: address, email }),
        });
        const data = await res.json();
        setEmailMessage(data.message || '更新成功');
    };

    const formatAddress = (addr) =>
        addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '未连接';

    return (
        <Layout>
            <section className={`cta-section mb-10 ${scrolled ? 'scrolled' : ''}`}>
                <div className="cta-content">
                    <h1 className="hero-title text-white">
                        👤 我的 <span className="highlight">成就档案</span>
                    </h1>
                    <p>查看并管理你的链上身份与邮箱绑定信息</p>
                </div>
            </section>

            <main className="max-w-6xl mx-auto px-6 py-4">
                {/* 钱包信息与邮箱绑定 */}
                <div className="feature-card mb-10">
                    <h2 className="section-title">个人信息</h2>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {/* 钱包绑定信息 */}
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                            <p className="text-gray-600 mb-2">钱包地址</p>
                            {isLoading ? (
                                <p className="font-medium text-blue-600">加载中...</p>
                            ) : (
                                <>
                                    <p className="font-medium text-blue-600 mb-3">
                                        {formatAddress(address)}
                                    </p>
                                    {isConnected ? (
                                        <button
                                            onClick={() => disconnect()}
                                            className="text-sm text-red-600 hover:underline transition-colors"
                                        >
                                            断开连接
                                        </button>
                                    ) : (
                                        <p className="text-sm text-gray-500">请连接钱包</p>
                                    )}
                                </>
                            )}
                        </div>

                        {/* 邮箱绑定与修改 */}
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                            <p className="text-gray-600 mb-2">绑定邮箱</p>
                            {isConnected ? (
                                <>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="请输入邮箱"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                                    />
                                    <button onClick={handleUpdateEmail} className="primary-btn w-full">
                                        绑定 / 修改邮箱
                                    </button>
                                    {emailMessage && (
                                        <p className="text-sm text-gray-600 mt-2">{emailMessage}</p>
                                    )}
                                </>
                            ) : (
                                <p className="text-sm text-gray-500">请先连接钱包后操作</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* 成就展示 */}
                <section>
                    <h2 className="section-title">🎖️ 我的成就</h2>
                    {isConnected ? (
                        achievements.length > 0 ? (
                            <div className="use-cases-grid">
                                {achievements.map((event) => (
                                    <div key={event.id} className="use-case-card">
                                        <div className="use-case-image">
                                            <Image
                                                src={`/event-${event.id}.jpg`}
                                                alt={event.name}
                                                width={400}
                                                height={220}
                                            />
                                        </div>
                                        <h3 className="use-case-title">{event.name}</h3>
                                        <p className="use-case-description">🗓 {event.date}</p>
                                        <p className="use-case-description">成绩: {event.result}</p>
                                        <button className="primary-btn mt-4 w-full">查看链上证明</button>
                                    </div>
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
            </main>
        </Layout>
    );
}
