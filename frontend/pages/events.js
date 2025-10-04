import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useAccount } from 'wagmi';

export default function Events() {
    const [events, setEvents] = useState([]);
    const { address, isConnected } = useAccount();

    useEffect(() => {
        fetch('/api/events')
            .then(res => res.json())
            .then(setEvents);
    }, []);

    const handleRegister = async (eventId) => {
        if (!isConnected) {
            alert("请先连接钱包！");
            return;
        }

        const res = await fetch('/api/events', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventId, wallet: address })
        });

        if (res.ok) {
            alert("✅ 报名成功！");
            const updated = await res.json();
            setEvents(events.map(e => e.id === updated.id ? updated : e));
        } else {
            alert("❌ 报名失败");
        }
    };

    return (
        <Layout>
            <h1>📅 赛事列表</h1>
            <ul>
                {events.map(event => (
                    <li key={event.id} style={{ marginBottom: '12px' }}>
                        <strong>{event.name}</strong> - {event.date} - {event.location} - 状态: {event.status}
                        {isConnected && event.status === "报名中" && (
                            <button
                                style={{ marginLeft: '10px' }}
                                onClick={() => handleRegister(event.id)}
                            >
                                报名
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </Layout>
    );
}
