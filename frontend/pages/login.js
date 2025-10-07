import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('登录中...');

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('token', data.token);
            setMsg('登录成功，即将跳转...');
            setTimeout(() => (window.location.href = '/profile'), 1000);
        } else {
            setMsg(data.message);
        }
    };

    return (
        <div className="auth-container">
            <h1>登录账户</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="邮箱" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">登录</button>
            </form>
            <p>{msg}</p>
            <p>还没有账户？<Link href="/register">立即注册</Link></p>
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
