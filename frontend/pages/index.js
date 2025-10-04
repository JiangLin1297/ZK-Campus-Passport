// frontend/pages/index.js
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useAccount } from 'wagmi';

export default function Home() {
    const { isConnected } = useAccount();
    const [scrolled, setScrolled] = useState(false);

    // 监听滚动事件，用于导航栏样式变化
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Layout>
            {/* 英雄区域 */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        🔐 ZK-Campus <span className="highlight">Passport</span>
                    </h1>
                    <p className="hero-subtitle">
                        基于零知识证明和SDKeys的校园赛事信誉护照
                    </p>
                    <p className="hero-description">
                        打造跨社团、跨学校、跨链的学生成绩与信誉记录系统，
                        让你的成就得到可信认证与广泛认可。
                    </p>
                    <div className="hero-cta">
                        {isConnected ? (
                            <Link href="/profile" className="primary-btn">
                                查看我的档案
                            </Link>
                        ) : (
                            <Link href="/events" className="primary-btn">
                                探索赛事
                            </Link>
                        )}
                        <Link href="#features" className="secondary-btn">
                            了解更多
                        </Link>
                    </div>
                </div>
                <div className="hero-image">
                    <Image
                        src="/campus-passport-hero.png"
                        alt="校园护照概念图"
                        width={600}
                        height={400}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ5gMmR8QAAAABJRU5ErkJggg=="
                    />
                </div>
            </section>

            {/* 特点介绍 */}
            <section id="features" className="features-section">
                <h2 className="section-title">核心特点</h2>
                <div className="features-grid">
                    <FeatureCard
                        icon="🔒"
                        title="隐私保护"
                        description="基于零知识证明技术，展示成就的同时保护个人隐私数据"
                    />
                    <FeatureCard
                        icon="🔗"
                        title="跨平台认可"
                        description="打破校园和社团壁垒，实现成绩与信誉的跨平台认可"
                    />
                    <FeatureCard
                        icon="📜"
                        title="不可篡改"
                        description="利用区块链技术确保成绩记录真实可信，防止篡改"
                    />
                    <FeatureCard
                        icon="🎯"
                        title="专注校园"
                        description="专为校园赛事和活动设计，贴合学生和组织者需求"
                    />
                </div>
            </section>

            {/* 使用场景 */}
            <section className="use-cases-section">
                <h2 className="section-title">适用场景</h2>
                <div className="use-cases-grid">
                    <UseCaseCard
                        title="学术竞赛"
                        description="记录各类学术竞赛成绩，成为保研和求职的有力证明"
                        imageUrl="/academic-competition.jpg"
                    />
                    <UseCaseCard
                        title="社团活动"
                        description="展示在社团中的贡献和成就，丰富个人校园履历"
                        imageUrl="/club-activities.jpg"
                    />
                    <UseCaseCard
                        title="志愿活动"
                        description="记录志愿时长和表现，为奖学金申请提供支持"
                        imageUrl="/volunteer-activities.jpg"
                    />
                </div>
            </section>

            {/* 行动号召 */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>准备好开始你的校园信誉之旅了吗？</h2>
                    <p>加入我们，让你的每一份努力都得到认可</p>
                    <div className="cta-buttons">
                        <Link href="/organizer" className="primary-btn">
                            作为主办方入驻
                        </Link>
                        <Link href="/events" className="secondary-btn">
                            浏览赛事
                        </Link>
                    </div>
                </div>
            </section>

            {/* 页脚 */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-logo">ZK-Campus Passport</div>
                    <div className="footer-links">
                        <Link href="/about">关于我们</Link>
                        <Link href="/docs">使用文档</Link>
                        <Link href="/contact">联系我们</Link>
                    </div>
                    <div className="footer-copyright">
                        © 2025 ZK-Campus Passport. 保留所有权利。
                    </div>
                </div>
            </footer>

            <style jsx>{`
        .hero-section {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 4rem 2rem;
          gap: 2rem;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4eaf1 100%);
          border-radius: 1rem;
          margin: 2rem 0;
        }

        .hero-content {
          flex: 1;
          max-width: 600px;
        }

        .hero-title {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #1a1a2e;
        }

        .highlight {
          color: #0070f3;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: #4a4a68;
        }

        .hero-description {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          color: #666;
        }

        .hero-cta {
          display: flex;
          gap: 1rem;
        }

        .hero-image {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .section-title {
          text-align: center;
          font-size: 2.2rem;
          margin-bottom: 3rem;
          color: #1a1a2e;
          position: relative;
          padding-bottom: 1rem;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: #0070f3;
          border-radius: 2px;
        }

        .features-section {
          padding: 5rem 2rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .use-cases-section {
          padding: 5rem 2rem;
          background-color: #f9f9f9;
        }

        .use-cases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem;
        }

        .cta-section {
          padding: 6rem 2rem;
          background: linear-gradient(135deg, #0070f3 0%, #0051aa 100%);
          color: white;
          text-align: center;
          margin: 3rem 0;
          border-radius: 1rem;
        }

        .cta-content h2 {
          font-size: 2.2rem;
          margin-bottom: 1.5rem;
        }

        .cta-content p {
          font-size: 1.2rem;
          margin-bottom: 2.5rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
        }

        .footer {
          background-color: #1a1a2e;
          color: white;
          padding: 4rem 2rem 2rem;
          margin-top: 5rem;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-logo {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 2rem;
          color: #0070f3;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-links a {
          color: #ddd;
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-links a:hover {
          color: white;
        }

        .footer-copyright {
          color: #aaa;
          font-size: 0.9rem;
          padding-top: 2rem;
          border-top: 1px solid #333;
        }

        .primary-btn {
          display: inline-block;
          padding: 0.8rem 1.8rem;
          background-color: #0070f3;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }

        .primary-btn:hover {
          background-color: #0051aa;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 112, 243, 0.3);
        }

        .secondary-btn {
          display: inline-block;
          padding: 0.8rem 1.8rem;
          background-color: white;
          color: #0070f3;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: 1px solid #0070f3;
          cursor: pointer;
          font-size: 1rem;
        }

        .secondary-btn:hover {
          background-color: #f0f7ff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 112, 243, 0.15);
        }

        @media (max-width: 768px) {
          .hero-section {
            flex-direction: column;
            text-align: center;
          }

          .hero-title {
            font-size: 2.2rem;
          }

          .hero-cta {
            justify-content: center;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .cta-content h2 {
            font-size: 1.8rem;
          }
        }
      `}</style>
        </Layout>
    );
}

// 特点卡片组件
function FeatureCard({ icon, title, description }) {
    return (
        <div className="feature-card">
            <div className="feature-icon">{icon}</div>
            <h3 className="feature-title">{title}</h3>
            <p className="feature-description">{description}</p>
            <style jsx>{`
        .feature-card {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
        }

        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: #0070f3;
        }

        .feature-title {
          font-size: 1.4rem;
          margin-bottom: 1rem;
          color: #1a1a2e;
        }

        .feature-description {
          color: #666;
          line-height: 1.6;
        }
      `}</style>
        </div>
    );
}

// 使用场景卡片组件
function UseCaseCard({ title, description, imageUrl }) {
    return (
        <div className="use-case-card">
            <div className="use-case-image">
                <Image
                    src={imageUrl}
                    alt={title}
                    width={400}
                    height={220}
                    borderRadius="8px"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ5gMmR8QAAAABJRU5ErkJggg=="
                />
            </div>
            <h3 className="use-case-title">{title}</h3>
            <p className="use-case-description">{description}</p>
            <style jsx>{`
        .use-case-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .use-case-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
        }

        .use-case-image {
          width: 100%;
          height: 220px;
          overflow: hidden;
        }

        .use-case-title {
          font-size: 1.4rem;
          margin: 1.5rem;
          color: #1a1a2e;
        }

        .use-case-description {
          color: #666;
          line-height: 1.6;
          margin: 0 1.5rem 1.5rem;
        }
      `}</style>
        </div>
    );
}