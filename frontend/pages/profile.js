import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Profile() {
  // Mock 数据，未来可以从链上 / API 获取
  const joinedEvents = [
    { id: 1, name: "Hackathon 2025 @ SCUT", result: "一等奖" },
    { id: 2, name: "数学建模竞赛", result: "参与中" },
  ];

  return (
    <div>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-10 text-center">👤 我的成就</h1>

        <div className="bg-white shadow-lg rounded-lg p-8 mb-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">链上身份</h2>
          <p className="text-gray-600">已绑定钱包：<span className="text-blue-600">0x1234...abcd</span></p>
          <p className="text-gray-600">校园邮箱：<span className="text-green-600">已验证</span></p>
        </div>

        <h2 className="text-2xl font-semibold mb-6">🎖️ 已报名 / 获奖赛事</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {joinedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold text-blue-600">{event.name}</h3>
              <p className="mt-2 text-gray-600">成绩: {event.result}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
