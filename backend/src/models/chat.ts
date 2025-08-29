import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    fuser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    conversation: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                default: () => new mongoose.Types.ObjectId(),
            },
            isUser: {
                type: Boolean,
                required: true,
            },
            message: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now, // Automatically set to current timestamp
            },
        },
    ],
});

const Chat = mongoose.model('Chat', schema);

export default Chat;
