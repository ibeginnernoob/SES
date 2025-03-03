import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String
    },
    fireBaseId: {
        type: String,
        unique: true,
        required: true
    },
    chat_ids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat',
        },
    ],
});

const User = model('User', userSchema);

export default User;
