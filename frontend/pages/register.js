import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('注册中...');

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        setMsg(data.message);
    };

    return (
        <div className="auth-container">
            <h1>注册账户</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="邮箱" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">注册</button>
            </form>
            <p>{msg}</p>
            <p>已有账户？<Link href="/login">登录</Link></p>

            <style jsx>{`
        .auth-container {
          max-width: 400px;
          margin: 5rem auto;
          text-align: center;
        }
        input {
          display: block;
          width: 100%;
          margin: 0.5rem 0;
          padding: 0.8rem;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
        button {
          width: 100%;
          padding: 0.8rem;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        button:hover {
          background: #0056c1;
        }
      `}</style>
        </div>
    );
}
