// frontend/pages/index.js
export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
            {/* 顶部 Hero 区域 */}
            <header className="w-full py-20 px-6 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg">
                <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
                    Campus Passport
                </h1>
                <p className="max-w-2xl mx-auto text-lg font-light leading-relaxed">
                    基于 ZK 的隐私护照 DApp，记录和验证大学生在赛事与活动中的贡献。
                    <br />
                    跨校、跨链安全展示个人成就，让你的努力获得永恒证明。
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <a
                        href="/events"
                        className="px-6 py-3 rounded-xl bg-white text-indigo-600 font-semibold shadow-md hover:shadow-xl hover:scale-105 transition"
                    >
                        浏览赛事
                    </a>
                    <a
                        href="/profile"
                        className="px-6 py-3 rounded-xl bg-indigo-700 font-semibold shadow-md hover:shadow-xl hover:scale-105 transition"
                    >
                        我的成就
                    </a>
                </div>
            </header>

            {/* 为什么选择我们 */}
            <section className="py-16 px-6 max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-10 text-gray-800">
                    为什么选择 Campus Passport？
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-4 text-indigo-600">隐私保护</h3>
                        <p className="text-gray-600">
                            零知识证明，成绩与贡献可验证但无需暴露隐私。
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-4 text-indigo-600">跨校互认</h3>
                        <p className="text-gray-600">
                            不同学校、不同社区的赛事与荣誉在链上互通。
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-4 text-indigo-600">招聘直通</h3>
                        <p className="text-gray-600">
                            HR 可以直接查询链上简历，实现可信与去中心化。
                        </p>
                    </div>
                </div>
            </section>

            {/* 页脚 */}
            <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-auto">
                <p>© 2025 Campus Passport. All rights reserved.</p>
                <div className="mt-2 space-x-4">
                    <a href="https://github.com" target="_blank" className="hover:text-white">
                        GitHub
                    </a>
                    <a href="https://twitter.com" target="_blank" className="hover:text-white">
                        Twitter
                    </a>
                </div>
            </footer>
        </div>
    );
}
