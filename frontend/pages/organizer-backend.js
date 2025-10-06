import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function OrganizerBackend() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [scoreInput, setScoreInput] = useState({}); // { wallet: score }
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // 滚动到顶部
        window.scrollTo(0, 0);

        // 获取所有赛事
        fetch('/api/events')
            .then(res => res.json())
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(err => {
                setMessage('❌ 加载赛事失败');
                setLoading(false);
            });
    }, []);

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setScoreInput({});
        setMessage('');
    };

    const handleScoreChange = (wallet, value) => {
        setScoreInput(prev => ({ ...prev, [wallet]: value }));
    };

    const handleSubmitScore = async (eventId, wallet) => {
        const score = scoreInput[wallet];
        if (!score) {
            setMessage("请输入成绩！");
            return;
        }

        try {
            setMessage('更新中...');
            const res = await fetch('/api/events', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventId, wallet, score })
            });

            if (res.ok) {
                const updatedEvent = await res.json();
                setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
                setSelectedEvent(updatedEvent);
                setMessage("✅ 成绩已更新！");
            } else {
                setMessage("❌ 更新失败");
            }
        } catch (error) {
            setMessage("❌ 网络错误，请重试");
        }
    };

    return (
        <Layout>
            {/* 头部横幅 */}
            <section className="hero-section organizer-backend-hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        赛事 <span className="highlight">管理后台</span>
                    </h1>
                    <p className="hero-subtitle">
                        管理赛事参与者与成就认证
                    </p>
                    <p className="hero-description">
                        查看报名情况，录入比赛成绩，为参与者颁发链上成就证明
                    </p>
                    <div className="hero-cta">
                        <a href="/organizer" className="primary-btn">
                            发布新赛事
                        </a>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="organizer-backend-hero-image">
                        <svg width="500" height="400" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="100" y="80" width="300" height="250" rx="10" fill="white" stroke="#0070f3" strokeWidth="2" />
                            <line x1="150" y1="130" x2="350" y2="130" stroke="#0070f3" strokeWidth="1" />
                            <line x1="150" y1="170" x2="350" y2="170" stroke="#0070f3" strokeWidth="1" />
                            <line x1="150" y1="210" x2="350" y2="210" stroke="#0070f3" strokeWidth="1" />
                            <line x1="150" y1="250" x2="350" y2="250" stroke="#0070f3" strokeWidth="1" />
                            <line x1="250" y1="80" x2="250" y2="330" stroke="#0070f3" strokeWidth="1" />
                            <circle cx="420" cy="200" r="15" fill="#0070f3" />
                        </svg>
                    </div>
                </div>
            </section>

            <main className="max-w-6xl mx-auto px-6 py-12">
                {/* 赛事选择 */}
                <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
                    <h2 className="section-title">赛事管理</h2>

                    {loading ? (
                        <div className="loading">加载中...</div>
                    ) : events.length === 0 ? (
                        <div className="no-events">
                            <p>暂无赛事数据</p>
                            <a href="/organizer" className="primary-btn mt-4">
                                发布第一个赛事
                            </a>
                        </div>
                    ) : (
                        <div className="events-list">
                            {events.map(event => (
                                <div
                                    key={event.id}
                                    className={`event-item ${selectedEvent?.id === event.id ? 'selected' : ''}`}
                                    onClick={() => handleSelectEvent(event)}
                                >
                                    <div className="event-info">
                                        <h3 className="event-name">{event.name}</h3>
                                        <div className="event-meta">
                                            <span className="event-date">🗓 {event.date}</span>
                                            <span className={`event-status ${event.status}`}>
                                                {event.status}
                                            </span>
                                        </div>
                                    </div>
                                    <button className="event-manage-btn">
                                        管理
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* 管理选中赛事 */}
                {selectedEvent && (
                    <section className="bg-white rounded-xl shadow-lg p-8">
                        <div className="selected-event-header">
                            <h2 className="selected-event-title">管理赛事: {selectedEvent.name}</h2>
                            <div className="selected-event-meta">
                                <span>📍 {selectedEvent.location}</span>
                                <span>📅 {selectedEvent.date}</span>
                                <span className={`status-badge ${selectedEvent.status}`}>
                                    {selectedEvent.status}
                                </span>
                            </div>
                        </div>

                        {selectedEvent.participants.length === 0 ? (
                            <div className="no-participants">
                                <p>暂无报名选手。</p>
                                <p className="hint">选手报名后将显示在这里，您可以为他们录入成绩并认证成就</p>
                            </div>
                        ) : (
                            <>
                                <div className="table-container">
                                    <table className="participants-table">
                                        <thead>
                                            <tr>
                                                <th>钱包地址</th>
                                                <th>当前成绩</th>
                                                <th>操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedEvent.participants.map(p => (
                                                <tr key={p.wallet}>
                                                    <td className="wallet-address">
                                                        {p.wallet.slice(0, 6)}...{p.wallet.slice(-4)}
                                                        <div className="full-address">{p.wallet}</div>
                                                    </td>
                                                    <td className="participant-score">
                                                        {p.score || "未公布"}
                                                    </td>
                                                    <td className="participant-actions">
                                                        <input
                                                            type="text"
                                                            placeholder="输入成绩"
                                                            value={scoreInput[p.wallet] || ""}
                                                            onChange={(e) => handleScoreChange(p.wallet, e.target.value)}
                                                            className="score-input"
                                                        />
                                                        <button
                                                            onClick={() => handleSubmitScore(selectedEvent.id, p.wallet)}
                                                            className="primary-btn small-btn"
                                                        >
                                                            提交
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {message && (
                                    <p className="action-message">{message}</p>
                                )}
                            </>
                        )}
                    </section>
                )}
            </main>

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
                .organizer-backend-hero {
                    margin-top: 2rem;
                }
                
                .organizer-backend-hero-image {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                }
                
                .loading {
                    text-align: center;
                    padding: 2rem;
                    color: #666;
                }
                
                .no-events {
                    text-align: center;
                    padding: 3rem 1rem;
                }
                
                .no-events p {
                    color: #666;
                    margin-bottom: 1.5rem;
                }
                
                .events-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .event-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem;
                    border: 1px solid #eee;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                
                .event-item:hover {
                    border-color: #0070f3;
                    background-color: #f0f7ff;
                }
                
                .event-item.selected {
                    border-color: #0070f3;
                    background-color: #e6f7ff;
                }
                
                .event-name {
                    font-weight: 600;
                    color: #1a1a2e;
                    margin-bottom: 0.3rem;
                }
                
                .event-meta {
                    display: flex;
                    gap: 1rem;
                    font-size: 0.9rem;
                    color: #666;
                }
                
                .event-status {
                    padding: 0.2rem 0.5rem;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    font-weight: 600;
                }
                
                .event-status.报名中 {
                    background-color: #e6f7ff;
                    color: #1890ff;
                }
                
                .event-status.即将开始 {
                    background-color: #fff7e6;
                    color: #fa8c16;
                }
                
                .event-status.进行中 {
                    background-color: #f6ffed;
                    color: #52c41a;
                }
                
                .event-status.已结束 {
                    background-color: #fff2f0;
                    color: #f5222d;
                }
                
                .event-manage-btn {
                    padding: 0.5rem 1rem;
                    background-color: #0070f3;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: background-color 0.2s ease;
                }
                
                .event-manage-btn:hover {
                    background-color: #0051aa;
                }
                
                .selected-event-header {
                    margin-bottom: 2rem;
                }
                
                .selected-event-title {
                    font-size: 1.8rem;
                    color: #1a1a2e;
                    margin-bottom: 0.5rem;
                }
                
                .selected-event-meta {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    color: #666;
                    font-size: 0.95rem;
                }
                
                .status-badge {
                    padding: 0.2rem 0.5rem;
                    border-radius: 4px;
                    font-size: 0.85rem;
                    font-weight: 600;
                }
                
                .no-participants {
                    text-align: center;
                    padding: 3rem 1rem;
                }
                
                .no-participants p {
                    color: #666;
                    margin-bottom: 1rem;
                }
                
                .hint {
                    font-size: 0.9rem;
                    color: #999;
                }
                
                .table-container {
                    overflow-x: auto;
                }
                
                .participants-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 1rem;
                }
                
                .participants-table th,
                .participants-table td {
                    padding: 1rem;
                    text-align: left;
                    border-bottom: 1px solid #eee;
                }
                
                .participants-table th {
                    background-color: #f9f9f9;
                    font-weight: 600;
                    color: #1a1a2e;
                }
                
                .wallet-address {
                    position: relative;
                    cursor: help;
                }
                
                .full-address {
                    display: none;
                    position: absolute;
                    bottom: 100%;
                    left: 0;
                    background-color: #1a1a2e;
                    color: white;
                    padding: 0.5rem;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    white-space: nowrap;
                    z-index: 10;
                }
                
                .wallet-address:hover .full-address {
                    display: block;
                }
                
                .participant-score {
                    color: #1a1a2e;
                }
                
                .participant-actions {
                    display: flex;
                    gap: 0.5rem;
                }
                
                .score-input {
                    padding: 0.5rem;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    width: 100px;
                }
                
                .small-btn {
                    padding: 0.5rem 1rem;
                    font-size: 0.9rem;
                }
                
                .action-message {
                    margin-top: 1rem;
                    padding: 0.8rem;
                    border-radius: 6px;
                    text-align: center;
                    font-weight: 600;
                }
            `}</style>
        </Layout>
    );
}