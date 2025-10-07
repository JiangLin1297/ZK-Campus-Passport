// frontend/pages/api/user/getEmail.js
import db from '../../../lib/db';
import WalletUser from '../../../models/WalletUser';

export default async function handler(req, res) {
    const { walletAddress } = req.query;

    if (!walletAddress)
        return res.status(400).json({ message: '钱包地址不能为空' });

    await db;

    const user = await WalletUser.findOne({ walletAddress });
    if (!user) return res.status(200).json({ email: '' });

    res.status(200).json({ email: user.email });
}
