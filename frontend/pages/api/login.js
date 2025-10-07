// frontend/pages/api/login.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../../lib/db';
import User from '../../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    const { email, password } = req.body;
    await db;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: '用户不存在' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: '密码错误' });

    const token = jwt.sign({ userId: user._id, email }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ message: '登录成功', token });
}
