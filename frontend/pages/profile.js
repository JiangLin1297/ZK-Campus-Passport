import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from 'wagmi';
import Layout from "../components/Layout";
import Image from "next/image";

export default function Profile() {
    // 钱包状态管理
    const { address, isConnected, isLoading } = useAccount();
    const { disconnect } = useDisconnect();
    const [scrolled, setScrolled] = useState(false);

    // 邮箱注册状态管理
    const [email, setEmail] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [emailMessage, setEmailMessage] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    // 滚动动画与导航栏样式逻辑
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach(element => {
                const position = element.getBoundingClientRect();
                if (position.top < window.innerHeight && position.bottom >= 0) {
                    element.classList.add('visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 模拟从链上获取成就数据
    const [achievements, setAchievements] = useState([]);
    useEffect(() => {
        if (isConnected && address) {
            // 实际项目中替换为真实接口请求
            const mockData = [
                { id: 1, name: "Hackathon 2025 @ SCUT", result: "一等奖", date: "2025-03-15" },
                { id: 2, name: "区块链创新大赛", result: "二等奖", date: "2024-11-08" }
            ];
            setAchievements(mockData);

            // 模拟已验证邮箱（实际项目中从后端获取）
            setIsEmailVerified(true);
            setEmail('student@scut.edu.cn');
        } else {
            setAchievements([]);
            setIsEmailVerified(false);
            setEmail('');
        }
    }, [isConnected, address]);

    // 格式化钱包地址
    const formatAddress = (addr) => {
        if (!addr) return '未连接';
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    // 邮箱注册处理
    const handleEmailRegister = (e) => {
        e.preventDefault();
        if (!email) {
            setEmailMessage('请输入邮箱地址');
            return;
        }

        // 简单验证校园邮箱格式
        const campusDomains = ['scut.edu.cn', 'sysu.edu.cn', 'gdut.edu.cn'];
        const isValidDomain = campusDomains.some(domain => email.endsWith(`@${domain}`));

        if (!isValidDomain) {
            setEmailMessage('请使用校园邮箱注册（支持：scut.edu.cn、sysu.edu.cn、gdut.edu.cn）');
            return;
        }

        setIsRegistering(true);
        setEmailMessage('');

        // 模拟邮箱验证过程
        setTimeout(() => {
            setIsEmailVerified(true);
            setEmailMessage('邮箱验证成功！');
            setIsRegistering(false);
        }, 1500);
    };

    return (
        <Layout>
            {/* 头部横幅 */}
            <section className={`cta-section mb-10 ${scrolled ? 'scrolled' : ''}`}>
                <div className="cta-content">
                    <h1 className="hero-title text-white">
                        👤 我的 <span className="highlight">成就档案</span>
                    </h1>
                    <p>查看你的链上成就记录与认证状态，管理个人信誉护照</p>
                </div>
            </section>

            <main className="max-w-6xl mx-auto px-6 py-4">
                {/* 链上身份与邮箱认证卡片 */}
                <div className="feature-card fade-in mb-16">
                    <h2 className="section-title">个人信息认证</h2>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {/* 钱包信息 */}
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                            <p className="text-gray-600 mb-2">已绑定钱包</p>
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
                                        <p className="text-sm text-gray-500">请连接钱包以使用完整功能</p>
                                    )}
                                </>
                            )}
                        </div>

                        {/* 邮箱认证 */}
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                            <p className="text-gray-600 mb-2">校园邮箱认证</p>

                            {isEmailVerified ? (
                                <div>
                                    <p className="font-medium text-green-600 mb-2">
                                        已验证：{email}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        校园邮箱认证可提升成就可信度
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleEmailRegister} className="space-y-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="输入校园邮箱（如：xxx@scut.edu.cn）"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={!isConnected || isRegistering}
                                    />
                                    <button
                                        type="submit"
                                        className="primary-btn w-full"
                                        disabled={!isConnected || isRegistering || !email}
                                    >
                                        {isRegistering ? '验证中...' : '验证邮箱'}
                                    </button>
                                    {emailMessage && (
                                        <p className={`text-sm ${emailMessage.includes('成功') ? 'text-green-600' : 'text-red-600'}`}>
                                            {emailMessage}
                                        </p>
                                    )}
                                    {isConnected && !email && (
                                        <p className="text-xs text-gray-400">
                                            仅支持合作高校校园邮箱认证
                                        </p>
                                    )}
                                    {!isConnected && (
                                        <p className="text-sm text-gray-500">
                                            请先连接钱包再进行邮箱认证
                                        </p>
                                    )}
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* 成就列表区域 */}
                <section className="fade-in">
                    <h2 className="section-title">🎖️ 已认证成就</h2>

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
                                                placeholder="blur"
                                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ5gMmR8QAAAABJRU5ErkJggg=="
                                            />
                                        </div>
                                        <h3 className="use-case-title">{event.name}</h3>
                                        <p className="use-case-description">🗓 {event.date}</p>
                                        <p className={`use-case-description font-medium ${event.result === "一等奖" ? "text-yellow-600" :
                                                event.result === "二等奖" ? "text-gray-600" : "text-green-600"
                                            }`}>
                                            成绩: {event.result}
                                        </p>
                                        <button className="primary-btn mt-4 w-full">
                                            查看链上证明
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="feature-card text-center p-10">
                                <p className="text-gray-500 mb-6">尚未有已认证成就</p>
                                <a href="/events" className="primary-btn">
                                    浏览赛事
                                </a>
                            </div>
                        )
                    ) : (
                        <div className="feature-card text-center p-10">
                            <p className="text-gray-500 mb-6">请先连接钱包查看你的成就</p>
                            <p className="text-gray-400 text-sm">连接后将自动同步你的链上成就数据</p>
                        </div>
                    )}
                </section>
            </main>

            <style jsx>{`
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .use-case-card .primary-btn {
          margin: 1.5rem;
        }
        .feature-card .grid {
          margin-top: 2rem;
        }
        .cta-section.scrolled {
          padding: 2rem 2rem;
        }
        input:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }
      `}</style>
        </Layout>
    );
}