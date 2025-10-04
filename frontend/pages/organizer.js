// frontend/pages/organizer.js
import { useState } from 'react';
import Layout from '../components/Layout';

export default function Organizer() {
    const [form, setForm] = useState({
        name: '',
        date: '',
        location: '',
        status: '报名中'
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('发布中...');

        const res = await fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (res.ok) {
            const newEvent = await res.json();
            setMessage(`✅ 已发布: ${newEvent.name}`);
            setForm({ name: '', date: '', location: '', status: '报名中' });
        } else {
            setMessage('❌ 发布失败');
        }
    };

    return (
        <Layout>
            <h1>🏆 主办方入口</h1>
            <p>发布新赛事</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
                <label>
                    赛事名称:
                    <input type="text" name="name" value={form.name} onChange={handleChange} required />
                </label>

                <label>
                    日期:
                    <input type="date" name="date" value={form.date} onChange={handleChange} required />
                </label>

                <label>
                    地点:
                    <input type="text" name="location" value={form.location} onChange={handleChange} required />
                </label>

                <label>
                    状态:
                    <select name="status" value={form.status} onChange={handleChange}>
                        <option value="报名中">报名中</option>
                        <option value="即将开始">即将开始</option>
                        <option value="已结束">已结束</option>
                    </select>
                </label>

                <button type="submit" style={{
                    marginTop: '10px',
                    padding: '8px 16px',
                    background: '#0070f3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    发布赛事
                </button>
            </form>

            {message && <p style={{ marginTop: '10px' }}>{message}</p>}
        </Layout>
    );
}
