// frontend/pages/docs.js
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { useEffect } from "react";

export default function Docs() {
    // 滚动动画效果（和其他页面保持一致）
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
            <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 md:py-24">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">ZK-Campus Passport 文档</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
                        快速了解如何使用校园链上信誉系统
                    </p>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-12">
                {/* 文档导航栏 */}
                <section className="mb-16 fade-in">
                    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">文档导航</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Link href="#intro" className="bg-blue-50 rounded-lg p-6 text-center hover:bg-blue-100 transition-colors">
                                <div className="text-blue-600 text-2xl mb-3">📚</div>
                                <h3 className="font-semibold text-gray-800">项目简介</h3>
                                <p className="text-sm text-gray-600 mt-2">了解系统核心功能与价值</p>
                            </Link>
                            <Link href="#quickstart" className="bg-indigo-50 rounded-lg p-6 text-center hover:bg-indigo-100 transition-colors">
                                <div className="text-indigo-600 text-2xl mb-3">🚀</div>
                                <h3 className="font-semibold text-gray-800">快速开始</h3>
                                <p className="text-sm text-gray-600 mt-2">用户操作指南（学生/组织者）</p>
                            </Link>
                            <Link href="#faq" className="bg-purple-50 rounded-lg p-6 text-center hover:bg-purple-100 transition-colors">
                                <div className="text-purple-600 text-2xl mb-3">❓</div>
                                <h3 className="font-semibold text-gray-800">常见问题</h3>
                                <p className="text-sm text-gray-600 mt-2">解决使用中的常见疑问</p>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 项目简介 */}
                <section id="intro" className="mb-20 fade-in">
                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">项目简介</h2>
                        <div className="space-y-6 text-gray-700 leading-relaxed">
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-blue-600">1. 什么是 ZK-Campus Passport？</h3>
                                <p>
                                    基于零知识证明（ZK）和区块链技术的校园成就认证系统，为学生提供跨校园、跨组织的信誉记录服务，
                                    可安全存储学术竞赛、社团活动、志愿服务等成就，同时保护个人隐私数据。
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-blue-600">2. 核心价值</h3>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>隐私保护：零知识证明技术实现“证明不泄露”</li>
                                    <li>不可篡改：区块链存储确保成就记录真实可信</li>
                                    <li>跨校互认：打破校园壁垒，成就可跨平台验证</li>
                                    <li>长期有效：链上记录永久保存，支持未来升学/求职使用</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-blue-600">3. 技术架构</h3>
                                <p className="mb-4">系统采用四层架构设计，确保稳定性与扩展性：</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-gray-800">前端层</h4>
                                        <p className="text-sm text-gray-600">Next.js + React，支持响应式设计</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-gray-800">合约层</h4>
                                        <p className="text-sm text-gray-600">基于EVM的智能合约，处理成就上链与验证</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-gray-800">ZK证明层</h4>
                                        <p className="text-sm text-gray-600">生成零知识证明，保护用户隐私</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-gray-800">存储层</h4>
                                        <p className="text-sm text-gray-600">去中心化存储，保存成就凭证</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 快速开始 */}
                <section id="quickstart" className="mb-20 fade-in">
                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">快速开始</h2>

                        {/* 学生指南 */}
                        <div className="mb-12">
                            <h3 className="text-xl font-semibold mb-4 text-indigo-600 flex items-center">
                                <span className="mr-2">👨‍🎓</span> 学生用户指南
                            </h3>
                            <div className="space-y-4 pl-2 border-l-2 border-indigo-200">
                                <div>
                                    <h4 className="font-semibold text-gray-800">1. 注册与登录</h4>
                                    <p className="text-gray-600 text-sm">连接钱包（如MetaMask），系统自动生成链上身份，无需额外注册</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">2. 查看成就</h4>
                                    <p className="text-gray-600 text-sm">进入「个人档案」页面，查看已认证的成就记录（竞赛/社团/志愿）</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">3. 申请成就认证</h4>
                                    <p className="text-gray-600 text-sm">
                                        1. 点击「申请认证」→ 选择成就类型（如“学术竞赛”）<br />
                                        2. 填写活动信息并上传凭证（如获奖证书）<br />
                                        3. 等待主办方审核，审核通过后自动上链
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">4. 分享成就</h4>
                                    <p className="text-gray-600 text-sm">生成成就证明链接，分享给学校/企业用于验证</p>
                                </div>
                            </div>
                        </div>

                        {/* 组织者指南 */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-purple-600 flex items-center">
                                <span className="mr-2">🏢</span> 主办方指南
                            </h3>
                            <div className="space-y-4 pl-2 border-l-2 border-purple-200">
                                <div>
                                    <h4 className="font-semibold text-gray-800">1. 入驻申请</h4>
                                    <p className="text-gray-600 text-sm">进入「主办方入驻」页面，提交组织信息（学校/社团/赛事方），审核通过后获得认证权限</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">2. 创建活动</h4>
                                    <p className="text-gray-600 text-sm">填写活动名称、类型、时间、成就规则，生成活动专属认证链接</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">3. 审核成就</h4>
                                    <p className="text-gray-600 text-sm">在「审核中心」查看学生提交的认证申请，验证凭证真实性后确认通过/拒绝</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 常见问题 */}
                <section id="faq" className="fade-in">
                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">常见问题</h2>
                        <div className="space-y-6">
                            {[
                                {
                                    question: "需要付费使用吗？",
                                    answer: "完全免费！学生用户和主办方均无需支付任何费用，系统基于开源技术构建，无隐藏成本。"
                                },
                                {
                                    question: "钱包连接失败怎么办？",
                                    answer: "1. 检查钱包是否安装最新版本；2. 确认网络已切换至正确链（如Sepolia测试网）；3. 清除浏览器缓存后重新尝试；4. 若仍失败，可通过「联系我们」反馈问题。"
                                },
                                {
                                    question: "成就记录可以修改或删除吗？",
                                    answer: "一旦上链，成就记录不可修改或删除，确保数据真实性。若需更正错误信息，需联系活动主办方提交证明，经审核后生成新的修正记录。"
                                },
                                {
                                    question: "非学生用户可以使用吗？",
                                    answer: "目前系统主要面向学生群体，未来计划扩展至教育机构、企业等场景，支持更多用户类型。"
                                },
                                {
                                    question: "如何验证他人的成就真实性？",
                                    answer: "进入「成就验证」页面，输入对方的成就证明链接或钱包地址，系统将通过区块链验证记录的真实性，无需依赖第三方机构。"
                                }
                            ].map((item, index) => (
                                <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                    <h3 className="font-semibold text-lg text-gray-800 mb-2">Q：{item.question}</h3>
                                    <p className="text-gray-600">A：{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

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