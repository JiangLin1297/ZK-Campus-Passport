// frontend/models/WalletUser.js
import mongoose from 'mongoose';

const WalletUserSchema = new mongoose.Schema({
    walletAddress: { type: String, required: true, unique: true },
    email: { type: String, default: '' },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.WalletUser || mongoose.model('WalletUser', WalletUserSchema);
