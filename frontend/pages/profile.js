// frontend/pages/profile.js
import ProfileCard from '../components/ProfileCard';

export default function Profile() {
    const mockResults = [
        { event: 'Hackathon 2025', result: '🥇 冠军', proof: '0xabc...' },
        { event: '数学建模大赛', result: '入围', proof: '0xdef...' },
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <h2>🎓 My ZK Passport</h2>
            {mockResults.map((r, i) => <ProfileCard key={i} result={r} />)}
        </div>
    );
}
