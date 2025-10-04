export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white min-h-[70vh] flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-5xl font-extrabold mb-4">Campus Passport</h1>
      <p className="text-xl max-w-2xl mb-6">
        基于 ZK 的隐私护照 DApp，记录和验证大学生在赛事与活动中的贡献，
        跨校、跨链安全展示个人成就。
      </p>
      <div className="space-x-4">
        <a href="/events" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg">
          浏览赛事
        </a>
        <a href="/profile" className="bg-blue-700 px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg">
          我的成就
        </a>
      </div>
    </section>
  );
}
