import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    bankBalance: {
        type: Number,
        default: 1000,
    },
    purchasedAssets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset',
    }],
});

const User = mongoose.model('User', userSchema);

export default User;