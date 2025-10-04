import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useAccount } from 'wagmi';

export default function MyEvents() {
    const [events, setEvents] = useState([]);
    const { address, isConnected } = useAccount();

    useEffect(() => {
        if (!isConnected) return;

        fetch('/api/events')
            .then(res => res.json())
            .then(data => {
                const myEvents = data.filter(event =>
                    event.participants.some(p => p.wallet === address)
                );
                setEvents(myEvents);
            });
    }, [address, isConnected]);

    if (!isConnected) {
        return (
            <Layout>
                <h1>我的赛事</h1>
                <p>请先连接钱包。</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <h1>🏅 我的赛事</h1>
            <ul>
                {events.length === 0 ? (
                    <p>你还没有报名任何赛事。</p>
                ) : (
                    events.map(event => (
                        <li key={event.id}>
                            <strong>{event.name}</strong> ({event.date})
                            - {event.location}
                            - 成绩: {
                                event.participants.find(p => p.wallet === address)?.score || "未公布"
                            }
                        </li>
                    ))
                )}
            </ul>
        </Layout>
    );
}
