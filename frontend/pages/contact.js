// frontend/pages/contact.js
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

export default function Contact() {
    // 滚动动画
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

    // 表单状态
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // 处理表单输入
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 处理表单提交（前端模拟，实际需对接后端）
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // 模拟接口请求延迟
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
            // 重置表单
            setFormData({ name: '', email: '', subject: '', message: '' });
            // 3秒后隐藏成功提示
            setTimeout(() => setSubmitSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* 头部横幅 */}
            <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 md:py-24">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">联系我们</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
                        有疑问、建议或合作意向？欢迎随时与我们沟通
                    </p>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* 联系信息 */}
                    <section className="fade-in">
                        <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 h-full">
                            <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">联系方式</h2>

                            <div className="space-y-8">
                                {/* 邮箱 */}
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <span className="text-blue-600 text-xl">✉️</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-800 mb-1">电子邮箱</h3>
                                        <a
                                            href="mailto:JiangLin1297@gmail.com"
                                            className="text-blue-600 hover:underline"
                                        >
                                            JiangLin1297@gmail.com
                                        </a>
                                        <p className="text-sm text-gray-500 mt-2">工作时间内24小时内回复</p>
                                    </div>
                                </div>

                                {/* GitHub */}
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <span className="text-gray-800 text-xl">💻</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-800 mb-1">GitHub 仓库</h3>
                                        <a
                                            href="https://github.com/JiangLin1297/ZK-Campus-Passport"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            github.com/JiangLin1297/ZK-Campus-Passport
                                        </a>
                                        <p className="text-sm text-gray-500 mt-2">欢迎Star、Fork或提交Issue</p>
                                    </div>
                                </div>

                                {/* 社群 */}
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <span className="text-purple-600 text-xl">👥</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-800 mb-1">社群交流</h3>
                                        <p className="text-gray-600">加入我们的Discord社群，与开发者和用户实时交流</p>
                                        <button className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                                            加入Discord
                                        </button>
                                    </div>
                                </div>

                                {/* 工作时间 */}
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <span className="text-green-600 text-xl">⏰</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-800 mb-1">工作时间</h3>
                                        <p className="text-gray-600">周一至周五：9:00 - 18:00</p>
                                        <p className="text-gray-600">周末及节假日：仅处理紧急问题</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 联系表单 */}
                    <section className="fade-in">
                        <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 h-full">
                            <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">发送消息</h2>

                            {/* 提交成功提示 */}
                            {submitSuccess && (
                                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-center">
                                    消息发送成功！我们会尽快与您联系
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* 姓名 */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            姓名
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            placeholder="请输入您的姓名"
                                        />
                                    </div>

                                    {/* 邮箱 */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            电子邮箱
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            placeholder="请输入您的邮箱"
                                        />
                                    </div>
                                </div>

                                {/* 主题 */}
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                        主题
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    >
                                        <option value="" disabled>请选择消息主题</option>
                                        <option value="question">使用疑问</option>
                                        <option value="suggestion">功能建议</option>
                                        <option value="cooperation">合作意向</option>
                                        <option value="bug">问题反馈</option>
                                        <option value="other">其他事项</option>
                                    </select>
                                </div>

                                {/* 消息内容 */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        消息内容
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="请详细描述您的需求或问题..."
                                    ></textarea>
                                </div>

                                {/* 提交按钮 */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "发送中..." : "发送消息"}
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            </main>

            {/* 合作方区域 */}
            <section className="bg-gray-100 py-12">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">合作支持</h2>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        {["高校合作", "社团支持", "技术伙伴", "教育机构"].map((partner, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                    <span className="text-gray-600 text-2xl">🤝</span>
                                </div>
                                <h3 className="font-semibold text-gray-800">{partner}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            {/* 全局样式 */}
            <style global jsx>{`
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
        a {
          text-decoration: none;
        }
      `}</style>
        </div>
    );
}