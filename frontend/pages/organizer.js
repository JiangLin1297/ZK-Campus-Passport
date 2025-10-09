import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Organizer() {
    const [form, setForm] = useState({
        name: '',
        date: '',
        location: '',
        status: '报名中',
        description: '',
        type: '学术竞赛'
    });
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                setSubmitted(true);
                setMessage('赛事发布成功！将在赛事广场展示');
                // 重置表单
                setTimeout(() => {
                    setSubmitted(false);
                    setForm({
                        name: '',
                        date: '',
                        location: '',
                        status: '报名中',
                        description: '',
                        type: '学术竞赛'
                    });
                    setMessage('');
                }, 3000);
            } else {
                setMessage('发布失败，请重试');
            }
        } catch (error) {
            setMessage('网络错误，请稍后再试');
        }
    };

    return (
        <Layout>
            {/* 头部横幅 */}
            <section className="hero-section organizer-hero relative overflow-hidden bg-f8fafc">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50 rounded-l-full opacity-50 -z-10"></div>
                <div className="hero-content relative z-10">
                    <h1 className="hero-title">
                        发布 <span className="highlight">校园赛事</span>
                    </h1>
                    <p className="hero-subtitle">
                        创建新的校园活动，邀请学生参与并记录他们的成就
                    </p>
                    <p className="hero-description">
                        填写赛事信息，自动生成链上记录，支持零知识证明认证
                    </p>
                </div>
                <div className="hero-image">
                    <div className="organizer-hero-image">
                        <svg width="500" height="400" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="120" y="100" width="260" height="220" rx="10" fill="white" stroke="#0070f3" strokeWidth="2" />
                            <line x1="170" y1="150" x2="350" y2="150" stroke="#0070f3" strokeWidth="1" />
                            <line x1="170" y1="190" x2="380" y2="190" stroke="#0070f3" strokeWidth="1" />
                            <line x1="170" y1="230" x2="320" y2="230" stroke="#0070f3" strokeWidth="1" />
                            <line x1="170" y1="270" x2="360" y2="270" stroke="#0070f3" strokeWidth="1" />
                            <circle cx="420" cy="180" r="15" fill="#0070f3" />
                            <circle cx="80" cy="250" r="20" fill="#0070f3" opacity="0.7" />
                        </svg>
                    </div>
                </div>
            </section>

            <main className="max-w-4xl mx-auto px-6 py-12">
                {/* 发布赛事表单 */}
                <section className="bg-white rounded-xl shadow-lg p-8 mb-12 transform transition-all duration-300 hover:shadow-xl">
                    <h2 className="section-title relative inline-block text-2xl font-bold text-gray-800">
                        发布新赛事
                        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2/5 h-3 bg-blue-500 rounded-full"></span>
                    </h2>

                    {submitted ? (
                        <div className="success-message bg-green-50 border border-green-200 rounded-lg p-6 text-center my-8 animate-fadeIn">
                            <div className="text-green-500 text-4xl mb-4">✓</div>
                            <h3 className="text-xl font-semibold text-green-800 mb-2">发布成功！</h3>
                            <p className="text-green-700">{message}</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="organizer-form space-y-6 mt-8">
                            {/* 赛事名称 */}
                            <div className="form-group">
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                    赛事名称 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="例如：2025年校园编程大赛"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                />
                            </div>

                            {/* 赛事类型 + 赛事状态 */}
                            <div className="form-group grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                                        赛事类型 <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="type"
                                        name="type"
                                        value={form.type}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white"
                                    >
                                        <option value="学术竞赛">学术竞赛</option>
                                        <option value="社团活动">社团活动</option>
                                        <option value="志愿服务">志愿服务</option>
                                        <option value="创新创业">创新创业</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
                                        赛事状态 <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={form.status}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white"
                                    >
                                        <option value="报名中">报名中</option>
                                        <option value="即将开始">即将开始</option>
                                        <option value="进行中">进行中</option>
                                        <option value="已结束">已结束</option>
                                    </select>
                                </div>
                            </div>

                            {/* 举办日期 + 举办地点 */}
                            <div className="form-group grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                                        举办日期 <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={form.date}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                                        举办地点 <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={form.location}
                                        onChange={handleChange}
                                        required
                                        placeholder="例如：图书馆报告厅"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    />
                                </div>
                            </div>

                            {/* 赛事描述 */}
                            <div className="form-group">
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                                    赛事描述
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="请详细描述赛事规则、奖励设置等信息..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 min-h-[120px] resize-y"
                                ></textarea>
                            </div>

                            {/* 操作按钮 */}
                            <div className="form-actions flex flex-wrap gap-4 mt-8">
                                <button
                                    type="submit"
                                    className="px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    发布赛事
                                </button>
                                <Link
                                    href="/organizer-backend"
                                    className="px-6 py-3 rounded-lg font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition duration-300"
                                >
                                    管理赛事
                                </Link>
                            </div>

                            {/* 提示信息 */}
                            {message && (
                                <p className="py-3 px-4 rounded-lg text-center mt-4 bg-red-50 border border-red-200 text-red-700">
                                    {message}
                                </p>
                            )}
                        </form>
                    )}
                </section>

                {/* 主办方指南 */}
                <section className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
                    <h2 className="section-title relative inline-block text-2xl font-bold text-gray-800">
                        主办方指南
                        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2/5 h-3 bg-blue-500 rounded-full"></span>
                    </h2>
                    <div className="guide-content mt-8 space-y-6">
                        <div className="guide-item flex items-start gap-4 p-4 rounded-lg hover:bg-blue-50 transition duration-300">
                            <div className="guide-icon text-2xl text-blue-600 mt-1 min-w-[40px]">📋</div>
                            <div className="guide-text">
                                <h3 className="text-lg font-semibold text-gray-800">赛事发布规范</h3>
                                <p className="text-gray-600 mt-1">请确保发布的赛事信息真实有效，包括准确的时间、地点和规则说明，避免误导参与者</p>
                            </div>
                        </div>
                        <div className="guide-item flex items-start gap-4 p-4 rounded-lg hover:bg-blue-50 transition duration-300">
                            <div className="guide-icon text-2xl text-blue-600 mt-1 min-w-[40px]">🎯</div>
                            <div className="guide-text">
                                <h3 className="text-lg font-semibold text-gray-800">成绩管理</h3>
                                <p className="text-gray-600 mt-1">赛事结束后，请及时录入参与者成绩，系统将自动为达标者生成链上成就证明</p>
                            </div>
                        </div>
                        <div className="guide-item flex items-start gap-4 p-4 rounded-lg hover:bg-blue-50 transition duration-300">
                            <div className="guide-icon text-2xl text-blue-600 mt-1 min-w-[40px]">🔒</div>
                            <div className="guide-text">
                                <h3 className="text-lg font-semibold text-gray-800">隐私保护</h3>
                                <p className="text-gray-600 mt-1">系统采用零知识证明技术，参与者可选择隐藏敏感成绩信息，仅展示达标证明</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* 底部导航栏 - 与index页面保持一致 */}
            <footer className="footer bg-gray-900 text-white py-12 mt-16">
                <div className="footer-content max-w-6xl mx-auto px-6">
                    <div className="footer-logo text-2xl font-bold mb-6">ZK-Campus Passport</div>
                    <div className="footer-links grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-gray-300">快速链接</h3>
                            <ul className="space-y-2">
                                <li><Link href="/" className="hover:text-blue-400 transition">首页</Link></li>
                                <li><Link href="/events" className="hover:text-blue-400 transition">赛事广场</Link></li>
                                <li><Link href="/organizer" className="hover:text-blue-400 transition">发布赛事</Link></li>
                                <li><Link href="/my-events" className="hover:text-blue-400 transition">我的赛事</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-gray-300">资源中心</h3>
                            <ul className="space-y-2">
                                <li><Link href="/docs" className="hover:text-blue-400 transition">使用文档</Link></li>
                                <li><Link href="/faq" className="hover:text-blue-400 transition">常见问题</Link></li>
                                <li><Link href="/api-docs" className="hover:text-blue-400 transition">API 参考</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-gray-300">关于我们</h3>
                            <ul className="space-y-2">
                                <li><Link href="/about" className="hover:text-blue-400 transition">项目介绍</Link></li>
                                <li><Link href="/contact" className="hover:text-blue-400 transition">联系我们</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-gray-300">法律信息</h3>
                            <ul className="space-y-2">
                                <li><Link href="/terms" className="hover:text-blue-400 transition">服务条款</Link></li>
                                <li><Link href="/privacy" className="hover:text-blue-400 transition">隐私政策</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-copyright text-gray-400 text-sm pt-6 border-t border-gray-800">
                        © 2025 ZK-Campus Passport. 保留所有权利。
                    </div>
                </div>
            </footer>

            <style jsx>{`
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .success-message {
                    animation: fadeInUp 0.5s ease-out;
                    box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.2), 0 4px 6px -2px rgba(16, 185, 129, 0.1);
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .form-group {
                    background-color: rgba(249, 250, 251, 0.5);
                    border-radius: 0.75rem;
                    padding: 1rem;
                    transition: all 0.3s ease;
                }
                .form-group:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                }

                input, select, textarea {
                    border: 1px solid #e5e7eb;
                    transition: all 0.2s ease;
                    border-radius: 0.5rem;
                }
                input:focus, select:focus, textarea:focus {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
                    outline: none;
                }
                input::placeholder, textarea::placeholder {
                    color: #9ca3af;
                }

                button[type="submit"] {
                    background-image: linear-gradient(to right, #3b82f6, #2563eb);
                    transition: all 0.3s ease;
                    font-weight: 600;
                }
                button[type="submit"]:hover {
                    transform: translateY(-2px) scale(1.02);
                    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.2);
                }

                .form-actions a {
                    transition: all 0.3s ease;
                    font-weight: 500;
                }
                .form-actions a:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }

                .form-actions + p {
                    background-color: rgba(239, 68, 68, 0.1);
                    border-color: rgba(239, 68, 68, 0.2);
                    color: #ef4444;
                }

                .hero-section {
                    display: flex;
                    align-items: center;
                    padding: 4rem 2rem;
                    margin-bottom: 2rem;
                    background-color: #f8fafc;
                }
                .hero-content {
                    flex: 1;
                    padding: 2rem;
                }
                .hero-title {
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                    color: #1a1a2e;
                    font-weight: 700;
                }
                .hero-subtitle {
                    font-size: 1.2rem;
                    margin-bottom: 1rem;
                    color: #4a4a68;
                }
                .hero-description {
                    font-size: 1rem;
                    color: #666;
                    max-width: 600px;
                    line-height: 1.6;
                }
                .highlight {
                    color: #0070f3;
                    text-decoration: underline;
                    text-decoration-thickness: 2px;
                    text-underline-offset: 4px;
                }
                .hero-image {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                }

                .section-title {
                    padding-bottom: 0.5rem;
                    position: relative;
                }
                .section-title span {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40%;
                    height: 3px;
                    background-color: #3b82f6;
                    border-radius: 3px;
                }

                .guide-item {
                    transition: all 0.3s ease;
                }
                .guide-item:hover {
                    background-color: #f0f9ff;
                    box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06);
                }

                .footer-links a {
                    color: #ddd;
                    text-decoration: none;
                    transition: color 0.2s ease;
                }
                .footer-links a:hover {
                    color: #0070f3;
                }
            `}</style>
        </Layout>
    );
}