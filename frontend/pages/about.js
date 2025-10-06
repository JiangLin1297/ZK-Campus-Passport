import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function About() {
    const [scrolled, setScrolled] = useState(false);

    // 监听滚动事件，用于导航栏样式变化
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 滚动动画逻辑
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

    return (
        <Layout>
            {/* 头部横幅 */}
            <section className="hero-section about-hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        关于 <span className="highlight">ZK-Campus Passport</span>
                    </h1>
                    <p className="hero-subtitle">
                        重新定义校园成就认证方式
                    </p>
                    <p className="hero-description">
                        构建基于零知识证明的去中心化信誉体系，让每一份努力都得到可信认证
                    </p>
                </div>
                <div className="hero-image">
                    <div className="about-hero-image">
                        <svg width="500" height="400" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100,300 Q250,100 400,300" stroke="#0070f3" strokeWidth="2" fill="none" />
                            <circle cx="100" cy="300" r="20" fill="#0070f3" opacity="0.7" />
                            <circle cx="250" cy="200" r="30" fill="#0070f3" opacity="0.5" />
                            <circle cx="400" cy="300" r="20" fill="#0070f3" opacity="0.7" />
                            <rect x="150" y="150" width="200" height="100" rx="10" fill="white" stroke="#0070f3" strokeWidth="2" />
                            <text x="250" y="205" textAnchor="middle" fill="#0070f3" fontSize="16" fontWeight="bold">ZK 证明</text>
                        </svg>
                    </div>
                </div>
            </section>

            <main className="max-w-6xl mx-auto px-6 py-16">
                {/* 使命与愿景 */}
                <section className="mb-24 fade-in features-section">
                    <h2 className="section-title">我们的使命</h2>
                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 max-w-3xl mx-auto">
                        <p className="text-lg text-gray-600 mb-4 leading-relaxed text-center">
                            ZK-Campus Passport 致力于解决校园成就认证中的信任难题，通过零知识证明（ZK）技术，让学生能够安全、隐私地展示自己的学术和课外活动成就。
                        </p>
                        <p className="text-lg text-gray-600 mb-4 leading-relaxed text-center">
                            传统认证体系存在信息孤岛、验证繁琐、隐私泄露等问题。我们的解决方案通过区块链不可篡改特性与零知识证明的隐私保护能力，构建一个跨校园、跨组织的可信成就记录系统。
                        </p>
                    </div>
                </section>

                {/* 核心技术优势 */}
                <section className="mb-24 fade-in features-section">
                    <h2 className="section-title">核心技术优势</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h3 className="feature-title">隐私保护认证</h3>
                            <p className="feature-description">
                                采用零知识证明技术，学生可在不泄露具体成绩的情况下，证明自己达到特定成就标准，平衡隐私与认证需求。
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⛓️</div>
                            <h3 className="feature-title">不可篡改记录</h3>
                            <p className="feature-description">
                                基于区块链技术的成就记录，确保数据一旦上链即不可篡改，为学生成就提供长期可信的证明。
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔄</div>
                            <h3 className="feature-title">跨平台互认</h3>
                            <p className="feature-description">
                                打破校园与社团壁垒，建立标准化的成就认证体系，实现跨学校、跨组织的成就互认机制。
                            </p>
                        </div>
                    </div>
                </section>

                {/* 技术架构 */}
                <section className="mb-24 fade-in features-section">
                    <h2 className="section-title">技术架构</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">💻</div>
                            <h3 className="feature-title">前端层</h3>
                            <p className="feature-description">
                                Next.js + React 构建的用户友好界面，支持响应式设计，适配各种设备
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📜</div>
                            <h3 className="feature-title">合约层</h3>
                            <p className="feature-description">
                                基于EVM的智能合约系统，处理成就上链与验证逻辑
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔍</div>
                            <h3 className="feature-title">ZK证明层</h3>
                            <p className="feature-description">
                                高效零知识证明生成与验证，保护用户隐私数据
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🗄️</div>
                            <h3 className="feature-title">存储层</h3>
                            <p className="feature-description">
                                去中心化存储解决方案，安全保存成就凭证与证明
                            </p>
                        </div>
                    </div>
                </section>

                {/* 团队介绍 */}
                <section className="fade-in features-section">
                    <h2 className="section-title">团队介绍</h2>
                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
                        <div className="team-member">
                            <div className="team-avatar">👤</div>
                            <h3 className="team-name">JiangLin</h3>
                            <p className="team-role">创始人 & 技术负责人</p>
                            <p className="team-bio">
                                来自华南理工大学区块链与Web3协会，专注于零知识证明在教育领域的应用研究。
                                拥有多年区块链开发经验，致力于通过去中心化技术解决传统教育认证体系的痛点。
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* 行动号召 */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>准备好加入我们了吗？</h2>
                    <p>成为早期用户，率先体验校园信誉新体系</p>
                    <div className="cta-buttons">
                        <a href="/events" className="primary-btn">
                            探索赛事
                        </a>
                        <a href="/contact" className="secondary-btn">
                            联系我们
                        </a>
                    </div>
                </div>
            </section>

            {/* 页脚 */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-logo">ZK-Campus Passport</div>
                    <div className="footer-links">
                        <a href="/about">关于我们</a>
                        <a href="/docs">使用文档</a>
                        <a href="/contact">联系我们</a>
                    </div>
                    <div className="footer-copyright">
                        © 2025 ZK-Campus Passport. 保留所有权利。
                    </div>
                </div>
            </footer>

            <style jsx>{`
                .about-hero {
                    margin-top: 2rem;
                }
                
                .about-hero-image {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                }
                
                .feature-card {
                    background: white;
                    border-radius: 1rem;
                    padding: 2rem;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                
                .feature-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
                }
                
                .feature-icon {
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                    color: #0070f3;
                }
                
                .feature-title {
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                    color: #1a1a2e;
                }
                
                .feature-description {
                    color: #666;
                    line-height: 1.6;
                }
                
                .team-member {
                    text-align: center;
                    padding: 2rem 0;
                }
                
                .team-avatar {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }
                
                .team-name {
                    font-size: 1.8rem;
                    margin-bottom: 0.5rem;
                    color: #1a1a2e;
                }
                
                .team-role {
                    color: #0070f3;
                    margin-bottom: 1.5rem;
                    font-weight: 600;
                }
                
                .team-bio {
                    color: #666;
                    line-height: 1.6;
                    max-width: 80%;
                    margin: 0 auto;
                }
                
                .fade-in {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                }
                
                .fade-in.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
        </Layout>
    );
}