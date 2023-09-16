import express from 'express';
import Asset from '../database/models/asset.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    try {
        const assets = await Asset.find();
        res.json(assets);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching assets' });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    if (req.user.userId !== 12) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { name, quantity, cost } = req.body;
    const existingAsset = await Asset.findOne({ name });

    if (existingAsset) {
        return res.status(400).json({ error: 'Asset already exists' });
    }

    try {
        const asset = new Asset({ name, quantity, cost });
        await asset.save();
        res.status(201).json({ message: 'Asset created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating asset' });
    }
});

export default router;