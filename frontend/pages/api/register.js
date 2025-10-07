// frontend/pages/api/register.js
import bcrypt from 'bcryptjs';
import db from '../../lib/db';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: '邮箱与密码不能为空' });

  await db;

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: '该邮箱已注册' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: '注册成功' });
}
