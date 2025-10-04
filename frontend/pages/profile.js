// frontend/pages/profile.js
import Layout from '../components/Layout';

export default function Profile() {
    return (
        <Layout>
            <h1>👤 我的档案</h1>
            <p>在这里展示你的跨赛事、跨社团的信誉与成绩。</p>
            <ul>
                <li>Hackathon 2025 优秀奖</li>
                <li>数学建模竞赛 国家级二等奖</li>
                <li>校园志愿活动 120 小时</li>
            </ul>
        </Layout>
    );
}
