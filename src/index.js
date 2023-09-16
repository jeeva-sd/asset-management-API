import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRoute from './controller/user.js';
import purchaseRoute from './controller/purchase.js';
import assetRoute from './controller/asset.js';
import MongoDBConnection from '../src/database/connection.js';

const app = express();
const port = process.env.PORT || 3001;
const corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/user', userRoute);
app.use('/purchase', purchaseRoute);
app.use('/asset', assetRoute);

app.get('/', (_req, res) => res.send('Ready to test!'));

const connectDatabase = () => {
    const database = new MongoDBConnection();
    database.getConnection();
};

app.listen(port, () => {
    connectDatabase();
    console.log(`Server is running on port ${port}`);
});
