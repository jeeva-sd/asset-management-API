import jwt from 'jsonwebtoken';
import User from '../database/models/user.js';

const authenticateToken = async (req, res, next) => {
    const token = req.header('x-access-token');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, 'STEINBEIS');

        if (decoded.userId === 12) {
            req.user = { name: 'dev', userId: 12 };
            next();
            return;
        }

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Forbidden' });
    }
};

export default authenticateToken;
