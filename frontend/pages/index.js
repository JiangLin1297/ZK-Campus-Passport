// frontend/pages/index.js
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>🎓 ZK Campus Passport</h1>
            <p>
                基于 Psy Protocol 的链上“隐私护照”，记录并验证大学生在比赛与活动中的成绩，
                保护隐私，同时作为可信简历。
            </p>
            <ConnectButton />
        </div>
    );
}
