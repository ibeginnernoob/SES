import axios from 'axios';

export const startChat = async (prompt: string, modelName: string) => {
    try {
        let modelURL: string = `http://localhost:3001/generate/${modelName.toLowerCase()}`;

        // URL string to modelURL
        const response = await axios.post(
            'http://localhost:3001/generate/gemini',
            {
                prompt: prompt,
            }
        );

        return response;
    } catch (e) {
        console.log(e);
    }
};

export const continueChat = async (
    prompt: string,
    modelName: string,
    chatHistory: any
) => {
    try {
        let modelURL: string = `http://localhost:3001/generate/${modelName.toLowerCase()}`;

        // URL string to modelURL
        const response = await axios.post(
            'http://localhost:3001/generate/llama',
            {
                prompt: prompt,
                chatHistory: chatHistory,
            }
        );

        return response;
    } catch (e) {
        console.log(e);
    }
};
