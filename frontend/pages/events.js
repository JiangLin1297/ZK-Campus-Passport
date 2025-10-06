import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import Image from "next/image";

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("all");
    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        // 滚动到顶部
        window.scrollTo(0, 0);

        // 获取赛事数据
        fetch("/api/events")
            .then((res) => res.json())
            .then((data) => {
                setEvents(data);
                setFilteredEvents(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load events:", err);
                setLoading(false);
            });
    }, []);

    // 筛选赛事
    useEffect(() => {
        if (category === "all") {
            setFilteredEvents(events);
        } else {
            setFilteredEvents(events.filter(event => event.type === category));
        }
    }, [category, events]);

    // 获取状态对应的样式类
    const getStatusClass = (status) => {
        switch (status) {
            case "报名中": return "status-open";
            case "即将开始": return "status-upcoming";
            case "进行中": return "status-active";
            case "已结束": return "status-ended";
            default: return "";
        }
    };

    return (
        <Layout>
            {/* 头部横幅 */}
            <section className="hero-section events-hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        校园 <span className="highlight">赛事广场</span>
                    </h1>
                    <p className="hero-subtitle">
                        发现并参与各类校园活动，获取链上成就认证
                    </p>
                    <p className="hero-description">
                        浏览最新赛事，展示你的才华，积累可信的校园成就记录
                    </p>
                </div>
                <div className="hero-image">
                    <div className="events-hero-image">
                        <svg width="500" height="400" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="250" cy="200" r="150" fill="white" stroke="#0070f3" strokeWidth="2" />
                            <circle cx="250" cy="200" r="120" fill="white" stroke="#0070f3" strokeWidth="1" strokeDasharray="5,5" />
                            <circle cx="250" cy="200" r="90" fill="white" stroke="#0070f3" strokeWidth="1" strokeDasharray="5,5" />
                            <rect x="200" y="100" width="100" height="60" rx="5" fill="#0070f3" opacity="0.7" />
                            <rect x="150" y="200" width="100" height="60" rx="5" fill="#0070f3" opacity="0.7" />
                            <rect x="250" y="200" width="100" height="60" rx="5" fill="#0070f3" opacity="0.7" />
                            <rect x="200" y="300" width="100" height="60" rx="5" fill="#0070f3" opacity="0.7" />
                        </svg>
                    </div>
                </div>
            </section>

            <main className="max-w-6xl mx-auto px-6 py-12">
                {/* 赛事筛选 */}
                <section className="filters-section mb-10">
                    <div className="filters-container">
                        <h2 className="filters-title">赛事分类</h2>
                        <div className="filters-buttons">
                            <button
                                className={`filter-btn ${category === "all" ? "active" : ""}`}
                                onClick={() => setCategory("all")}
                            >
                                全部
                            </button>
                            <button
                                className={`filter-btn ${category === "学术竞赛" ? "active" : ""}`}
                                onClick={() => setCategory("学术竞赛")}
                            >
                                学术竞赛
                            </button>
                            <button
                                className={`filter-btn ${category === "社团活动" ? "active" : ""}`}
                                onClick={() => setCategory("社团活动")}
                            >
                                社团活动
                            </button>
                            <button
                                className={`filter-btn ${category === "志愿服务" ? "active" : ""}`}
                                onClick={() => setCategory("志愿服务")}
                            >
                                志愿服务
                            </button>
                            <button
                                className={`filter-btn ${category === "创新创业" ? "active" : ""}`}
                                onClick={() => setCategory("创新创业")}
                            >
                                创新创业
                            </button>
                        </div>
                    </div>
                </section>

                {/* 赛事列表 */}
                {loading ? (
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <p>正在加载赛事...</p>
                    </div>
                ) : filteredEvents.length === 0 ? (
                    <div className="no-events">
                        <p>暂无符合条件的赛事</p>
                        {category !== "all" && (
                            <button
                                className="secondary-btn mt-4"
                                onClick={() => setCategory("all")}
                            >
                                查看全部赛事
                            </button>
                        )}
                        <Link href="/organizer" className="primary-btn mt-4">
                            发布新赛事
                        </Link>
                    </div>
                ) : (
                    <div className="events-grid">
                        {filteredEvents.map((event) => (
                            <div
                                key={event.id}
                                className="event-card"
                            >
                                <div className="event-image">
                                    <Image
                                        src={`/event-${event.type}.jpg`}
                                        alt={event.name}
                                        width={400}
                                        height={200}
                                        placeholder="blur"
                                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ5gMmR8QAAAABJRU5ErkJggg=="
                                    />
                                </div>
                                <div className="event-info">
                                    <div className="event-type">{event.type}</div>
                                    <h2 className="event-title">{event.name}</h2>
                                    <div className="event-details">
                                        <div className="event-detail">
                                            <span className="detail-icon">📍</span>
                                            <span className="detail-text">{event.location}</span>
                                        </div>
                                        <div className="event-detail">
                                            <span className="detail-icon">🗓</span>
                                            <span className="detail-text">{event.date}</span>
                                        </div>
                                    </div>
                                    <div className={`event-status ${getStatusClass(event.status)}`}>
                                        {event.status}
                                    </div>
                                    <div className="event-actions">
                                        <button className="primary-btn">
                                            报名参加
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* 行动号召 */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>没有找到感兴趣的赛事？</h2>
                    <p>创建自己的赛事活动，邀请同学参与</p>
                    <div className="cta-buttons">
                        <Link href="/organizer" className="primary-btn">
                            发布赛事
                        </Link>
                        <Link href="/docs#quickstart" className="secondary-btn">
                            了解如何参与
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
        .events-hero {
          margin-top: 2rem;
        }
        
        .events-hero-image {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }
        
        .filters-section {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        
        .filters-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .filters-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1a1a2e;
        }
        
        .filters-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
        }
        
        .filter-btn {
          padding: 0.5rem 1.2rem;
          border: 1px solid #ddd;
          border-radius: 20px;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
        }
        
        .filter-btn:hover {
          border-color: #0070f3;
          color: #0070f3;
        }
        
        .filter-btn.active {
          background-color: #0070f3;
          color: white;
          border-color: #0070f3;
        }
        
        .loading-state {
          text-align: center;
          padding: 5rem 1rem;
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          margin: 0 auto 1rem;
          border: 4px solid #f0f0f0;
          border-top: 4px solid #0070f3;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .no-events {
          text-align: center;
          padding: 5rem 1rem;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        
        .no-events p {
          color: #666;
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }
        
        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .event-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
        }
        
        .event-image {
          width: 100%;
          height: 180px;
          overflow: hidden;
        }
        
        .event-info {
          padding: 1.5rem;
        }
        
        .event-type {
          display: inline-block;
          padding: 0.3rem 0.8rem;
          background: #f0f7ff;
          color: #0070f3;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 0.8rem;
        }
        
        .event-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        
        .event-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.2rem;
        }
        
        .event-detail {
          display: flex;
          align-items: center;
          font-size: 0.9rem;
          color: #666;
        }
        
        .detail-icon {
          margin-right: 0.5rem;
          min-width: 20px;
        }
        
        .event-status {
          display: inline-block;
          padding: 0.3rem 0.8rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1.2rem;
        }
        
        .status-open {
          background-color: #e6f7ff;
          color: #1890ff;
        }
        
        .status-upcoming {
          background-color: #fff7e6;
          color: #fa8c16;
        }
        
        .status-active {
          background-color: #f6ffed;
          color: #52c41a;
        }
        
        .status-ended {
          background-color: #fff2f0;
          color: #f5222d;
        }
        
        .event-actions {
          margin-top: auto;
        }
      `}</style>
        </Layout>
    );
}