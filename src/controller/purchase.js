import express from 'express';
import Asset from '../database/models/asset.js';
import User from '../database/models/user.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
    const { username, assetName } = req.body;

    try {
        const user = await User.findOne({ name: username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const asset = await Asset.findOne({ name: assetName });

        if (!asset) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        if (user.bankBalance < asset.cost) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        if (asset.quantity <= 0) {
            return res.status(400).json({ error: 'Asset not available' });
        }

        user.bankBalance -= asset.cost;
        await user.save();

        asset.quantity -= 1;
        await asset.save();

        user.purchasedAssets.push(asset._id);
        await user.save();

        res.json({ message: 'Asset purchased successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error purchasing asset' });
    }
});

router.delete('/', authenticateToken, async (req, res) => {
    const { username, assetName, quantity: quantityToSell } = req.body;

    try {
        const user = await User.findOne({ name: username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const asset = await Asset.findOne({ name: assetName });

        if (!asset) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        const purchasedAsset = user.purchasedAssets.filter((purchased) => {
            if (purchased.toString() === asset._id.toString()) return true;
            else return false;
        });

        if (!purchasedAsset.length > 0) {
            return res.status(400).json({ error: 'You do not own this asset' });
        }

        if (purchasedAsset.length < quantityToSell || quantityToSell <= 0) {
            return res.status(400).json({ error: 'Invalid quantity to sell' });
        }

        const sellingPrice = asset.cost * quantityToSell;

        user.bankBalance += sellingPrice;
        await user.save();

        asset.quantity += quantityToSell;
        await asset.save();

        let countToRemove = quantityToSell;

        const result = countToRemove > 0 ? user.purchasedAssets.filter(item => {
            if (item === purchasedAsset[0] && countToRemove > 0) {
                countToRemove--;
                return false;
            }
            return true;
        }) : user.purchasedAssets;

        user.purchasedAssets = result;

        await user.save();

        res.json({ message: 'Asset sold successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error selling asset' });
    }
});

export default router;
