import { useState } from 'react';
import Layout from '../components/Layout';
import { useEffect } from 'react';

export default function Organizer() {
    const [form, setForm] = useState({
        name: '',
        date: '',
        location: '',
        status: '报名中',
        description: '',
        type: '学术竞赛'
    });

    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // 滚动到顶部
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('发布中...');

        try {
            const res = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                const newEvent = await res.json();
                setMessage(`✅ 已发布: ${newEvent.name}`);
                setSubmitted(true);
                // 重置表单
                setForm({
                    name: '',
                    date: '',
                    location: '',
                    status: '报名中',
                    description: '',
                    type: '学术竞赛'
                });
            } else {
                setMessage('❌ 发布失败，请稍后再试');
            }
        } catch (error) {
            setMessage('❌ 网络错误，请检查连接');
        }
    };

    return (
        <Layout>
            {/* 头部横幅 */}
            <section className="hero-section organizer-hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        主办方 <span className="highlight">管理中心</span>
                    </h1>
                    <p className="hero-subtitle">
                        发布和管理校园赛事活动
                    </p>
                    <p className="hero-description">
                        轻松创建赛事，管理参与者，认证成就，为学生提供可信的链上证明
                    </p>
                </div>
                <div className="hero-image">
                    <div className="organizer-hero-image">
                        <svg width="500" height="400" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="100" y="100" width="300" height="200" rx="10" fill="white" stroke="#0070f3" strokeWidth="2" />
                            <rect x="150" y="150" width="200" height="40" rx="5" fill="#0070f3" opacity="0.2" />
                            <rect x="150" y="210" width="200" height="40" rx="5" fill="#0070f3" opacity="0.2" />
                            <rect x="150" y="270" width="150" height="40" rx="5" fill="#0070f3" opacity="0.2" />
                            <circle cx="420" cy="290" r="15" fill="#0070f3" />
                        </svg>
                    </div>
                </div>
            </section>

            <main className="max-w-4xl mx-auto px-6 py-12">
                {/* 发布赛事表单 */}
                <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
                    <h2 className="section-title">发布新赛事</h2>

                    {submitted ? (
                        <div className="success-message">
                            <div className="success-icon">✅</div>
                            <h3>赛事发布成功！</h3>
                            <p>{message}</p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="primary-btn mt-4"
                            >
                                发布另一个赛事
                            </button>
                            <a href="/organizer-backend" className="secondary-btn mt-4">
                                管理已发布赛事
                            </a>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="organizer-form">
                            <div className="form-group">
                                <label htmlFor="name">赛事名称 <span className="required">*</span></label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="例如：2025年校园编程大赛"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="type">赛事类型 <span className="required">*</span></label>
                                <select
                                    id="type"
                                    name="type"
                                    value={form.type}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="学术竞赛">学术竞赛</option>
                                    <option value="社团活动">社团活动</option>
                                    <option value="志愿服务">志愿服务</option>
                                    <option value="创新创业">创新创业</option>
                                    <option value="其他">其他</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="date">举办日期 <span className="required">*</span></label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="location">举办地点 <span className="required">*</span></label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    required
                                    placeholder="例如：计算机学院报告厅"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="status">赛事状态 <span className="required">*</span></label>
                                <select
                                    id="status"
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="报名中">报名中</option>
                                    <option value="即将开始">即将开始</option>
                                    <option value="进行中">进行中</option>
                                    <option value="已结束">已结束</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">赛事描述</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="请描述赛事规则、奖励设置等信息..."
                                ></textarea>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="primary-btn">
                                    发布赛事
                                </button>
                                <a href="/organizer-backend" className="secondary-btn">
                                    管理赛事
                                </a>
                            </div>

                            {message && <p className="form-message">{message}</p>}
                        </form>
                    )}
                </section>

                {/* 主办方指南 */}
                <section className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="section-title">主办方指南</h2>
                    <div className="guide-content">
                        <div className="guide-item">
                            <div className="guide-icon">📋</div>
                            <div className="guide-text">
                                <h3>赛事发布规范</h3>
                                <p>请确保发布的赛事信息真实有效，包括准确的时间、地点和规则说明</p>
                            </div>
                        </div>
                        <div className="guide-item">
                            <div className="guide-icon">✅</div>
                            <div className="guide-text">
                                <h3>成就认证责任</h3>
                                <p>作为主办方，您有责任确保提交的成就数据真实可靠，这将直接影响您的机构信誉</p>
                            </div>
                        </div>
                        <div className="guide-item">
                            <div className="guide-icon">🔒</div>
                            <div className="guide-text">
                                <h3>数据隐私保护</h3>
                                <p>请遵守隐私保护原则，仅收集和上传必要的参与者信息，保护学生隐私</p>
                            </div>
                        </div>
                    </div>
                </section>
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
                .organizer-hero {
                    margin-top: 2rem;
                }
                
                .organizer-hero-image {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                }
                
                .organizer-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    margin-top: 2rem;
                }
                
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .form-group label {
                    font-weight: 600;
                    color: #1a1a2e;
                }
                
                .form-group input,
                .form-group select,
                .form-group textarea {
                    padding: 0.8rem;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    font-size: 1rem;
                }
                
                .form-group input:focus,
                .form-group select:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: #0070f3;
                    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.1);
                }
                
                .form-actions {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .form-message {
                    margin-top: 1rem;
                    padding: 0.8rem;
                    border-radius: 6px;
                    text-align: center;
                    font-weight: 600;
                }
                
                .required {
                    color: #ff4d4f;
                }
                
                .success-message {
                    text-align: center;
                    padding: 3rem 1rem;
                }
                
                .success-icon {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                    color: #52c41a;
                }
                
                .success-message h3 {
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                    color: #1a1a2e;
                }
                
                .success-message p {
                    color: #666;
                    margin-bottom: 2rem;
                }
                
                .guide-content {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    margin-top: 2rem;
                }
                
                .guide-item {
                    display: flex;
                    gap: 1rem;
                    padding: 1rem;
                    background: #f9f9f9;
                    border-radius: 8px;
                }
                
                .guide-icon {
                    font-size: 1.5rem;
                    color: #0070f3;
                    min-width: 30px;
                    margin-top: 0.2rem;
                }
                
                .guide-text h3 {
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: #1a1a2e;
                }
                
                .guide-text p {
                    color: #666;
                    line-height: 1.6;
                }
            `}</style>
        </Layout>
    );
}