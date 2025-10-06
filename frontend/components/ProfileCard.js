// 与EventCard保持相同的卡片样式
export default function ProfileCard({ result }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">{result.name}</h3>
            <p className="text-gray-600 text-sm">📅 {result.date}</p>
            <p className="text-gray-600 text-sm">主办方: {result.organizer}</p>
            <p className={`mt-2 font-medium ${result.result === "一等奖" ? "text-yellow-600" :
                    result.result === "参与中" ? "text-green-600" : "text-gray-600"
                }`}>
                成绩: {result.result}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="text-sm text-blue-600 hover:text-blue-800 transition">
                    查看证明 →
                </button>
            </div>
        </div>
    );
}