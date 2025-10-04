// frontend/pages/organizer.js
import Layout from '../components/Layout';

export default function Organizer() {
    return (
        <Layout>
            <h1>🏆 主办方入口</h1>
            <p>赛事主办方可以在这里发布比赛、管理报名、上传成绩。</p>
            <button style={{
                padding: '8px 16px',
                background: '#0070f3',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}>
                发布新赛事
            </button>
        </Layout>
    );
}
