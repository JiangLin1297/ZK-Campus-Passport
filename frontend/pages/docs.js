import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Docs() {
    const [scrolled, setScrolled] = useState(false);

    // 监听滚动事件，用于导航栏样式变化
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 滚动动画效果
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
            <section className="hero-section docs-hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        ZK-Campus <span className="highlight">文档中心</span>
                    </h1>
                    <p className="hero-subtitle">
                        快速了解如何使用校园链上信誉系统
                    </p>
                    <p className="hero-description">
                        从基础入门到高级功能，全面掌握ZK-Campus Passport的使用方法
                    </p>
                    <div className="hero-cta">
                        <Link href="#quickstart" className="primary-btn">
                            快速开始
                        </Link>
                        <Link href="#faq" className="secondary-btn">
                            常见问题
                        </Link>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="docs-hero-image">
                        <svg width="500" height="400" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="100" y="100" width="300" height="250" rx="10" fill="white" stroke="#0070f3" strokeWidth="2" />
                            <line x1="150" y1="150" x2="350" y2="150" stroke="#0070f3" strokeWidth="1" />
                            <line x1="150" y1="190" x2="350" y2="190" stroke="#0070f3" strokeWidth="1" />
                            <line x1="150" y1="230" x2="300" y2="230" stroke="#0070f3" strokeWidth="1" />
                            <line x1="150" y1="270" x2="320" y2="270" stroke="#0070f3" strokeWidth="1" />
                            <line x1="150" y1="310" x2="280" y2="310" stroke="#0070f3" strokeWidth="1" />
                            <circle cx="80" cy="150" r="15" fill="#0070f3" opacity="0.7" />
                            <path d="M80,200 Q250,100 420,200" stroke="#0070f3" strokeWidth="2" fill="none" />
                        </svg>
                    </div>
                </div>
            </section>

            <main className="max-w-6xl mx-auto px-6 py-16">
                {/* 文档导航栏 */}
                <section className="mb-16 fade-in">
                    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                        <h2 className="section-title">文档导航</h2>
                        <div className="features-grid">
                            <Link href="#intro" className="doc-nav-card">
                                <div className="doc-nav-icon">📚</div>
                                <h3 className="doc-nav-title">项目简介</h3>
                                <p className="doc-nav-desc">了解系统核心功能与价值</p>
                            </Link>
                            <Link href="#quickstart" className="doc-nav-card">
                                <div className="doc-nav-icon">🚀</div>
                                <h3 className="doc-nav-title">快速开始</h3>
                                <p className="doc-nav-desc">用户操作指南（学生/组织者）</p>
                            </Link>
                            <Link href="#faq" className="doc-nav-card">
                                <div className="doc-nav-icon">❓</div>
                                <h3 className="doc-nav-title">常见问题</h3>
                                <p className="doc-nav-desc">解决使用中的常见疑问</p>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 项目简介 */}
                <section id="intro" className="mb-20 fade-in features-section">
                    <h2 className="section-title">项目简介</h2>
                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
                        <div className="space-y-8 text-gray-700 leading-relaxed">
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-blue-600">1. 什么是 ZK-Campus Passport？</h3>
                                <p>
                                    基于零知识证明（ZK）和区块链技术的校园成就认证系统，为学生提供跨校园、跨组织的信誉记录服务，
                                    可安全存储学术竞赛、社团活动、志愿服务等成就，同时保护个人隐私数据。
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-blue-600">2. 核心价值</h3>
                                <div className="features-grid">
                                    <div className="feature-card-small">
                                        <div className="feature-small-icon">🔒</div>
                                        <p className="feature-small-text">隐私保护：零知识证明技术实现"证明不泄露"</p>
                                    </div>
                                    <div className="feature-card-small">
                                        <div className="feature-small-icon">⛓️</div>
                                        <p className="feature-small-text">不可篡改：区块链存储确保成就记录真实可信</p>
                                    </div>
                                    <div className="feature-card-small">
                                        <div className="feature-small-icon">🌐</div>
                                        <p className="feature-small-text">跨校互认：打破校园壁垒，成就可跨平台验证</p>
                                    </div>
                                    <div className="feature-card-small">
                                        <div className="feature-small-icon">⏳</div>
                                        <p className="feature-small-text">长期有效：链上记录永久保存，支持未来使用</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-blue-600">3. 技术架构</h3>
                                <p className="mb-4">系统采用四层架构设计，确保稳定性与扩展性：</p>
                                <div className="features-grid">
                                    <div className="tech-card">
                                        <h4 className="tech-title">前端层</h4>
                                        <p className="tech-desc">Next.js + React，支持响应式设计</p>
                                    </div>
                                    <div className="tech-card">
                                        <h4 className="tech-title">合约层</h4>
                                        <p className="tech-desc">基于EVM的智能合约，处理成就上链与验证</p>
                                    </div>
                                    <div className="tech-card">
                                        <h4 className="tech-title">ZK证明层</h4>
                                        <p className="tech-desc">生成零知识证明，保护用户隐私</p>
                                    </div>
                                    <div className="tech-card">
                                        <h4 className="tech-title">存储层</h4>
                                        <p className="tech-desc">去中心化存储，保存成就凭证</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 快速开始 */}
                <section id="quickstart" className="mb-20 fade-in features-section">
                    <h2 className="section-title">快速开始</h2>
                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
                        {/* 学生指南 */}
                        <div className="mb-12">
                            <h3 className="text-xl font-semibold mb-6 text-indigo-600 flex items-center">
                                <span className="mr-2">👨‍🎓</span> 学生用户指南
                            </h3>
                            <div className="steps-container">
                                <div className="step-item">
                                    <div className="step-number">1</div>
                                    <div className="step-content">
                                        <h4 className="step-title">注册与登录</h4>
                                        <p className="step-desc">连接钱包（如MetaMask），系统自动生成链上身份，无需额外注册</p>
                                    </div>
                                </div>
                                <div className="step-item">
                                    <div className="step-number">2</div>
                                    <div className="step-content">
                                        <h4 className="step-title">查看成就</h4>
                                        <p className="step-desc">进入「个人档案」页面，查看已认证的成就记录（竞赛/社团/志愿）</p>
                                    </div>
                                </div>
                                <div className="step-item">
                                    <div className="step-number">3</div>
                                    <div className="step-content">
                                        <h4 className="step-title">申请成就认证</h4>
                                        <p className="step-desc">
                                            1. 点击「申请认证」→ 选择成就类型（如"学术竞赛"）<br />
                                            2. 填写活动信息并上传凭证（如获奖证书）<br />
                                            3. 等待主办方审核，审核通过后自动上链
                                        </p>
                                    </div>
                                </div>
                                <div className="step-item">
                                    <div className="step-number">4</div>
                                    <div className="step-content">
                                        <h4 className="step-title">分享成就</h4>
                                        <p className="step-desc">生成成就证明链接，分享给学校/企业用于验证</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 组织者指南 */}
                        <div>
                            <h3 className="text-xl font-semibold mb-6 text-purple-600 flex items-center">
                                <span className="mr-2">🏢</span> 主办方指南
                            </h3>
                            <div className="steps-container">
                                <div className="step-item">
                                    <div className="step-number">1</div>
                                    <div className="step-content">
                                        <h4 className="step-title">入驻申请</h4>
                                        <p className="step-desc">进入「主办方入驻」页面，提交组织信息（学校/社团/赛事方），审核通过后获得认证权限</p>
                                    </div>
                                </div>
                                <div className="step-item">
                                    <div className="step-number">2</div>
                                    <div className="step-content">
                                        <h4 className="step-title">发布活动</h4>
                                        <p className="step-desc">填写活动详情（名称、时间、规则等），发布至平台供学生报名参与</p>
                                    </div>
                                </div>
                                <div className="step-item">
                                    <div className="step-number">3</div>
                                    <div className="step-content">
                                        <h4 className="step-title">认证成就</h4>
                                        <p className="step-desc">活动结束后，上传参与者成就数据，系统自动生成零知识证明并上链</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 常见问题 */}
                <section id="faq" className="fade-in features-section">
                    <h2 className="section-title">常见问题</h2>
                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
                        <div className="faq-container">
                            <div className="faq-item">
                                <h3 className="faq-question">什么是零知识证明？它如何保护我的隐私？</h3>
                                <p className="faq-answer">
                                    零知识证明是一种密码学技术，允许你在不泄露具体信息的情况下，向他人证明某件事情的真实性。
                                    例如，你可以证明自己获得了"校级竞赛一等奖"，而不必展示具体分数或其他敏感信息。
                                </p>
                            </div>
                            <div className="faq-item">
                                <h3 className="faq-question">我需要了解区块链技术才能使用这个平台吗？</h3>
                                <p className="faq-answer">
                                    不需要。我们的平台对用户隐藏了复杂的区块链技术细节，你只需像使用普通应用一样操作即可。
                                    钱包连接和链上操作都已简化，无需了解底层技术原理。
                                </p>
                            </div>
                            <div className="faq-item">
                                <h3 className="faq-question">我的成就数据存储在哪里？安全吗？</h3>
                                <p className="faq-answer">
                                    你的成就数据存储在区块链和去中心化存储系统中，这意味着没有单一机构可以控制或修改你的数据。
                                    只有经过你授权，他人才能验证你的成就，确保了数据的安全性和隐私性。
                                </p>
                            </div>
                            <div className="faq-item">
                                <h3 className="faq-question">哪些学校或组织认可这个平台的成就证明？</h3>
                                <p className="faq-answer">
                                    目前已有多所高校的计算机相关社团加入我们的联盟，包括华南理工大学、中山大学等。
                                    我们正在积极拓展合作院校和组织，不断扩大平台的认可度。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* 行动号召 */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>还有其他问题？</h2>
                    <p>查看完整文档或联系我们的技术支持团队</p>
                    <div className="cta-buttons">
                        <a href="/contact" className="primary-btn">
                            联系支持
                        </a>
                        <a href="/" className="secondary-btn">
                            返回首页
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
                .docs-hero {
                    margin-top: 2rem;
                }
                
                .docs-hero-image {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                }
                
                .doc-nav-card {
                    background: white;
                    border-radius: 1rem;
                    padding: 2rem;
                    text-align: center;
                    text-decoration: none;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                
                .doc-nav-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
                }
                
                .doc-nav-icon {
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                    color: #0070f3;
                }
                
                .doc-nav-title {
                    font-size: 1.3rem;
                    margin-bottom: 0.5rem;
                    color: #1a1a2e;
                    font-weight: 600;
                }
                
                .doc-nav-desc {
                    color: #666;
                    font-size: 0.95rem;
                }
                
                .feature-card-small {
                    background: #f9f9f9;
                    border-radius: 0.8rem;
                    padding: 1.5rem;
                    display: flex;
                    align-items: flex-start;
                }
                
                .feature-small-icon {
                    font-size: 1.5rem;
                    margin-right: 1rem;
                    color: #0070f3;
                    min-width: 30px;
                }
                
                .tech-card {
                    background: #f0f7ff;
                    border-radius: 0.8rem;
                    padding: 1.5rem;
                    text-align: center;
                }
                
                .tech-title {
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: #1a1a2e;
                }
                
                .tech-desc {
                    color: #666;
                    font-size: 0.95rem;
                }
                
                .steps-container {
                    position: relative;
                    padding-left: 2rem;
                }
                
                .steps-container::before {
                    content: '';
                    position: absolute;
                    left: 19px;
                    top: 0;
                    bottom: 0;
                    width: 2px;
                    background: #0070f3;
                    opacity: 0.3;
                }
                
                .step-item {
                    position: relative;
                    margin-bottom: 2.5rem;
                }
                
                .step-number {
                    position: absolute;
                    left: -2rem;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #0070f3;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                }
                
                .step-content {
                    background: #f9f9f9;
                    border-radius: 0.8rem;
                    padding: 1.2rem;
                }
                
                .step-title {
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: #1a1a2e;
                }
                
                .step-desc {
                    color: #666;
                    line-height: 1.6;
                }
                
                .faq-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                
                .faq-item {
                    border-bottom: 1px solid #eee;
                    padding-bottom: 1.5rem;
                }
                
                .faq-item:last-child {
                    border-bottom: none;
                }
                
                .faq-question {
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: #1a1a2e;
                    display: flex;
                    align-items: center;
                }
                
                .faq-question::before {
                    content: 'Q:';
                    color: #0070f3;
                    margin-right: 0.5rem;
                    font-weight: bold;
                }
                
                .faq-answer {
                    color: #666;
                    line-height: 1.6;
                    padding-left: 1.5rem;
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