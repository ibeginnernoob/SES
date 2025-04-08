import Response from '../models/response';
import Prompt from '../models/prompt';
import Chat from '../models/chat';

const deleteRecords = async (
    chatId?: string,
    promptId?: string,
    responseId?: string
) => {
    try {
        if (chatId && chatId !== '') {
            await Chat.deleteOne({
                _id: chatId,
            });
        } else if (promptId && promptId !== '') {
            await Prompt.deleteOne({
                _id: chatId,
            });
        } else if (responseId && responseId !== '') {
            await Response.deleteOne({
                _id: chatId,
            });
        }
    } catch (e) {
        console.log(e);
    }
};

export default deleteRecords;
