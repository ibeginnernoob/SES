import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    userFireBaseId: {
        type: String,
        unique: true,
        required: true,
    },
    chat_ids: [
        {
            type: String,
            ref: 'Chat',
        },
    ],
});

const User = model('User', userSchema);

export default User;
