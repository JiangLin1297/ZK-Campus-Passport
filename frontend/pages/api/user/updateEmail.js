// frontend/pages/api/user/updateEmail.js
import db from '../../../lib/db';
import WalletUser from '../../../models/WalletUser';

export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).json({ message: 'Method not allowed' });

    const { walletAddress, email } = req.body;

    if (!walletAddress)
        return res.status(400).json({ message: '钱包地址不能为空' });

    await db;

    let user = await WalletUser.findOne({ walletAddress });

    if (!user) {
        user = new WalletUser({ walletAddress, email });
    } else {
        user.email = email;
        user.updatedAt = new Date();
    }

    await user.save();

    return res.status(200).json({ message: '邮箱已绑定/更新成功', user });
}
