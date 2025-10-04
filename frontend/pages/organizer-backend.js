import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function Organizer() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [scoreInput, setScoreInput] = useState({}); // { wallet: score }

    useEffect(() => {
        fetch('/api/events')
            .then(res => res.json())
            .then(setEvents);
    }, []);

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setScoreInput({});
    };

    const handleScoreChange = (wallet, value) => {
        setScoreInput(prev => ({ ...prev, [wallet]: value }));
    };

    const handleSubmitScore = async (eventId, wallet) => {
        const score = scoreInput[wallet];
        if (!score) {
            alert("请输入成绩！");
            return;
        }

        const res = await fetch('/api/events', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventId, wallet, score })
        });

        if (res.ok) {
            const updatedEvent = await res.json();
            setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
            setSelectedEvent(updatedEvent);
            alert("✅ 成绩已更新！");
        } else {
            alert("❌ 更新失败");
        }
    };

    return (
        <Layout>
            <h1>🎤 Organizer 管理后台</h1>

            {/* 赛事选择 */}
            <h2>📅 所有赛事</h2>
            <ul>
                {events.map(event => (
                    <li key={event.id} style={{ marginBottom: '8px' }}>
                        <strong>{event.name}</strong> ({event.date})
                        <button
                            style={{ marginLeft: '10px' }}
                            onClick={() => handleSelectEvent(event)}
                        >
                            管理
                        </button>
                    </li>
                ))}
            </ul>

            {/* 管理选中赛事 */}
            {selectedEvent && (
                <div style={{ marginTop: '20px' }}>
                    <h2>⚡ 管理赛事: {selectedEvent.name}</h2>

                    {selectedEvent.participants.length === 0 ? (
                        <p>暂无报名选手。</p>
                    ) : (
                        <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', marginTop: '10px' }}>
                            <thead>
                                <tr>
                                    <th>钱包地址</th>
                                    <th>成绩</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedEvent.participants.map(p => (
                                    <tr key={p.wallet}>
                                        <td>{p.wallet}</td>
                                        <td>{p.score || "未公布"}</td>
                                        <td>
                                            <input
                                                type="text"
                                                placeholder="输入成绩"
                                                value={scoreInput[p.wallet] || ""}
                                                onChange={(e) => handleScoreChange(p.wallet, e.target.value)}
                                            />
                                            <button onClick={() => handleSubmitScore(selectedEvent.id, p.wallet)}>
                                                提交
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </Layout>
    );
}
