import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from 'react';

export default function About() {
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
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* 头部横幅 */}
            <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 md:py-32">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">关于 ZK-Campus Passport</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                        重新定义校园成就认证方式，构建基于零知识证明的去中心化信誉体系
                    </p>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-16">
                {/* 使命与愿景 - 全文本居中 */}
                <section className="mb-24 fade-in">
                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">我们的使命</h2>
                        <p className="text-lg text-gray-600 mb-4 leading-relaxed text-center">
                            ZK-Campus Passport 致力于解决校园成就认证中的信任难题，通过零知识证明（ZK）技术，让学生能够安全、隐私地展示自己的学术和课外活动成就。
                        </p>
                        <p className="text-lg text-gray-600 mb-4 leading-relaxed text-center">
                            传统认证体系存在信息孤岛、验证繁琐、隐私泄露等问题。我们的解决方案通过区块链不可篡改特性与零知识证明的隐私保护能力，构建一个跨校园、跨组织的可信成就记录系统。
                        </p>
                        <p className="text-lg text-gray-600 mt-4 leading-relaxed text-center">
                            我们相信，每一份努力都值得被认可，而真正的成就认证应当保护隐私、跨越壁垒、值得信赖。
                        </p>
                    </div>
                </section>

                {/* 核心技术优势 - 文本居中 */}
                <section className="mb-24 fade-in">
                    <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">核心技术优势</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* 卡片 1 */}
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <span className="text-blue-600 text-2xl">🔒</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">隐私保护认证</h3>
                            <p className="text-gray-600 text-center">
                                采用零知识证明技术，学生可在不泄露具体成绩的情况下，证明自己达到特定成就标准，平衡隐私与认证需求。
                            </p>
                        </div>
                        {/* 卡片 2 */}
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <span className="text-indigo-600 text-2xl">⛓️</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">不可篡改记录</h3>
                            <p className="text-gray-600 text-center">
                                基于区块链技术的成就记录，确保数据一旦上链即不可篡改，为学生成就提供长期可信的证明。
                            </p>
                        </div>
                        {/* 卡片 3 */}
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <span className="text-purple-600 text-2xl">🔄</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">跨平台互认</h3>
                            <p className="text-gray-600 text-center">
                                打破校园与社团壁垒，建立标准化的成就认证体系，实现跨学校、跨组织的成就互认机制。
                            </p>
                        </div>
                    </div>
                </section>

                {/* 技术架构 - 文本居中 */}
                <section className="mb-24 fade-in">
                    <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">技术架构</h2>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8 md:p-10">
                            <div className="grid md:grid-cols-4 gap-6">
                                <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 hover:bg-blue-100 transition-colors">
                                    <div className="text-blue-600 text-3xl mb-3 text-center">💻</div>
                                    <h3 className="font-semibold text-lg mb-3 text-gray-800 text-center">前端层</h3>
                                    <p className="text-gray-600 text-sm text-center">Next.js + React 构建的用户友好界面</p>
                                </div>
                                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100 hover:bg-indigo-100 transition-colors">
                                    <div className="text-indigo-600 text-3xl mb-3 text-center">📜</div>
                                    <h3 className="font-semibold text-lg mb-3 text-gray-800 text-center">合约层</h3>
                                    <p className="text-gray-600 text-sm text-center">基于EVM的智能合约系统</p>
                                </div>
                                <div className="bg-purple-50 rounded-lg p-6 border border-purple-100 hover:bg-purple-100 transition-colors">
                                    <div className="text-purple-600 text-3xl mb-3 text-center">🔍</div>
                                    <h3 className="font-semibold text-lg mb-3 text-gray-800 text-center">ZK证明层</h3>
                                    <p className="text-gray-600 text-sm text-center">高效零知识证明生成与验证</p>
                                </div>
                                <div className="bg-pink-50 rounded-lg p-6 border border-pink-100 hover:bg-pink-100 transition-colors">
                                    <div className="text-pink-600 text-3xl mb-3 text-center">🗄️</div>
                                    <h3 className="font-semibold text-lg mb-3 text-gray-800 text-center">存储层</h3>
                                    <p className="text-gray-600 text-sm text-center">去中心化存储解决方案</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 团队介绍 - 文本居中 */}
                <section className="fade-in">
                    <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">团队介绍</h2>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8 md:p-10">
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                    <span className="text-gray-500 text-3xl">👤</span>
                                </div>
                                <h3 className="text-2xl font-semibold mb-2 text-gray-800 text-center">JiangLin</h3>
                                <p className="text-blue-600 mb-4 text-center">创始人 & 技术负责人</p>
                                <p className="text-gray-600 max-w-2xl text-center">
                                    来自华南理工大学区块链与Web3协会，专注于零知识证明在教育领域的应用研究。
                                    拥有多年区块链开发经验，致力于通过去中心化技术解决传统教育认证体系的痛点。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* 联系区域 - 文本居中 */}
            <section className="bg-gray-900 text-white py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6">联系我们</h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        无论您是学生、教育工作者还是技术爱好者，我们都期待与您交流
                    </p>
                    <a
                        href="JiangLin1297@gmail.com"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300"
                    >
                        发送邮件
                    </a>
                </div>
            </section>

            <Footer />

            {/* 全局动画样式 */}
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
      `}</style>
        </div>
    );
}
