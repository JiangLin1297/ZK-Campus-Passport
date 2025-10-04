import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-20">
        {/* 标题部分 */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">🚀 关于 Campus Passport</h1>
          <p className="text-xl text-gray-600">
            基于 <span className="text-blue-600 font-semibold">Psy Protocol</span> 的
            校园隐私护照 —— 用零知识证明 + SDKeys 记录并验证学生的赛事与活动成绩，
            打造下一代 <span className="text-green-600">链上个人简历</span>。
          </p>
        </section>

        {/* 愿景 */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-6 text-center">🌍 我们的愿景</h2>
          <div className="bg-white rounded-lg shadow-lg p-10">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              在校园与未来职业之间搭建一座桥梁。
              <br />
              学生可以用 <span className="font-semibold text-blue-600">隐私保护</span> 的方式记录
              赛事成绩、竞赛经历、社团成就。
              <br />
              招聘方和赛事主办方则能在链上快速验证，避免伪造，
              <span className="font-semibold text-green-600">让努力真正被看见</span>。
            </p>
          </div>
        </section>

        {/* 产品特点 */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-10 text-center">✨ 产品亮点</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-8 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">零知识证明</h3>
              <p className="text-gray-600">
                隐私优先，不暴露敏感信息即可完成赛事成绩验证和声誉积累。
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-8 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-4 text-green-600">链上可验证简历</h3>
              <p className="text-gray-600">
                学生所有成就存证于链上，不可篡改，跨社团、跨学校、跨平台互认。
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-8 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-4 text-purple-600">赛事方接入</h3>
              <p className="text-gray-600">
                主办方可以直接发布赛事、报名入口和成绩公示，形成完整的校园赛事生态。
              </p>
            </div>
          </div>
        </section>

        {/* 团队介绍 */}
        <section>
          <h2 className="text-3xl font-semibold mb-10 text-center">👨‍💻 团队介绍</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-xl transition">
              <img
                src="https://avatars.githubusercontent.com/u/1?v=4"
                alt="Founder"
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold">Alice Zhang</h3>
              <p className="text-gray-600">产品负责人 / 创始人</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-xl transition">
              <img
                src="https://avatars.githubusercontent.com/u/2?v=4"
                alt="Dev"
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold">Bob Li</h3>
              <p className="text-gray-600">核心开发者 / 智能合约</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-xl transition">
              <img
                src="https://avatars.githubusercontent.com/u/3?v=4"
                alt="Designer"
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold">Cathy Wu</h3>
              <p className="text-gray-600">UI/UX 设计师</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
