import { useEffect } from "react";
import Layout from "../components/Layout"; // 统一使用Layout组件，与index保持一致
import Image from "next/image";

export default function Profile() {
    // 滚动动画逻辑（与index页面保持一致）
    useEffect(() => {
        const handleScroll = () => {
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

    // 模拟赛事数据
    const joinedEvents = [
        { id: 1, name: "Hackathon 2025 @ SCUT", result: "一等奖", date: "2025-03-15", location: "华南理工大学" },
        { id: 2, name: "数学建模竞赛", result: "参与中", date: "2025-05-20", location: "线上" },
        { id: 3, name: "区块链创新大赛", result: "二等奖", date: "2024-11-08", location: "中山大学" },
    ];

    return (
        <Layout>
            {/* 头部横幅（复用index的CTA区域渐变样式） */}
            <section className="cta-section mb-10">
                <div className="cta-content">
                    <h1 className="hero-title text-white">
                        👤 我的 <span className="highlight">成就档案</span>
                    </h1>
                    <p>查看你的链上成就记录与认证状态，管理个人信誉护照</p>
                </div>
            </section>

            <main className="max-w-6xl mx-auto px-6 py-4">
                {/* 链上身份卡片（复用index的feature-card样式） */}
                <div className="feature-card fade-in mb-16">
                    <h2 className="section-title">链上身份</h2>
                    <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                            <p className="text-gray-600 mb-2">已绑定钱包</p>
                            <p className="font-medium text-blue-600">0x1234...abcd</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                            <p className="text-gray-600 mb-2">校园邮箱</p>
                            <p className="font-medium text-green-600">已验证（scut.edu.cn）</p>
                        </div>
                    </div>
                </div>

                {/* 成就列表区域（复用index的use-case-card样式） */}
                <section className="fade-in">
                    <h2 className="section-title">🎖️ 已报名 / 获奖赛事</h2>

                    {joinedEvents.length > 0 ? (
                        <div className="use-cases-grid">
                            {joinedEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="use-case-card"
                                >
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
                                    <p className="use-case-description">📍 {event.location}</p>
                                    <p className="use-case-description">🗓 {event.date}</p>
                                    <p className={`use-case-description font-medium ${event.result === "一等奖" ? "text-yellow-600" :
                                            event.result === "二等奖" ? "text-gray-600" : "text-green-600"
                                        }`}>
                                        成绩: {event.result}
                                    </p>
                                    <button className="primary-btn mt-4 w-full">
                                        查看证明
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="feature-card text-center p-10">
                            <p className="text-gray-500 mb-6">暂无赛事记录，快去报名参与吧！</p>
                            <a
                                href="/events"
                                className="primary-btn"
                            >
                                浏览赛事
                            </a>
                        </div>
                    )}
                </section>
            </main>

            <style jsx>{`
        /* 复用index页面的动画样式 */
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* 适配卡片内按钮样式 */
        .use-case-card .primary-btn {
          margin: 1.5rem;
        }

        /* 身份卡片内部样式微调 */
        .feature-card .grid {
          margin-top: 2rem;
        }
      `}</style>
        </Layout>
    );
}