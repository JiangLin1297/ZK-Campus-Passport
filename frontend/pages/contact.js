import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
    // 滚动动画（与events页面保持一致）
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSubmitSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-20">
                {/* 标题区域（与events页面一致） */}
                <h1 className="text-4xl font-bold mb-10 text-center">📩 联系我们</h1>

                {/* 联系内容区域（使用events页面的网格布局） */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* 联系信息卡片（模仿赛事卡片样式） */}
                    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition fade-in">
                        <h2 className="text-2xl font-semibold mb-6 text-blue-600">联系方式</h2>

                        <div className="space-y-6">
                            {/* 邮箱 */}
                            <div className="flex items-start">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-blue-600">✉️</span>
                                </div>
                                <div>
                                    <h3 className="font-medium">电子邮箱</h3>
                                    <a href="mailto:JiangLin1297@gmail.com" className="text-blue-600 hover:underline">
                                        JiangLin1297@gmail.com
                                    </a>
                                </div>
                            </div>

                            {/* GitHub */}
                            <div className="flex items-start">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-gray-800">💻</span>
                                </div>
                                <div>
                                    <h3 className="font-medium">GitHub 仓库</h3>
                                    <a
                                        href="https://github.com/JiangLin1297/ZK-Campus-Passport"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        github.com/JiangLin1297/ZK-Campus-Passport
                                    </a>
                                </div>
                            </div>

                            {/* 社群 */}
                            <div className="flex items-start">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-purple-600">👥</span>
                                </div>
                                <div>
                                    <h3 className="font-medium">社群交流</h3>
                                    <button className="mt-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition text-sm">
                                        加入Discord
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 联系表单（使用赛事页面按钮/输入框样式） */}
                    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition fade-in">
                        <h2 className="text-2xl font-semibold mb-6 text-blue-600">发送消息</h2>

                        {submitSuccess && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                                消息发送成功！我们会尽快与您联系
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">姓名</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">电子邮箱</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">主题</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">消息内容</label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
                            >
                                {isSubmitting ? "发送中..." : "发送消息"}
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}