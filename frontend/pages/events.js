import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-10 text-center">📅 校园赛事广场</h1>

        {events.length === 0 ? (
          <p className="text-center text-gray-500">正在加载赛事...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition"
              >
                <h2 className="text-xl font-semibold text-blue-600 mb-2">
                  {event.name}
                </h2>
                <p className="text-gray-600">📍 {event.location}</p>
                <p className="text-gray-600">🗓 {event.date}</p>
                <p
                  className={`mt-2 font-medium ${
                    event.status === "报名中"
                      ? "text-green-600"
                      : event.status === "即将开始"
                      ? "text-orange-600"
                      : "text-gray-400"
                  }`}
                >
                  状态: {event.status}
                </p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  报名参加
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
