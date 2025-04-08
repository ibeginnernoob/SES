import axios from 'axios';

export const startChat = async (prompt: string, modelName: string) => {
    try {
		let modelURL: string = `http://localhost:3001/generate/${modelName.toLowerCase()}`;
		console.log(modelName.toLowerCase())

		if (modelName.toLowerCase() !== "llama" && modelName.toLowerCase() !== "biogpt") {
			modelURL = `http://localhost:3001/generate/gemini`;
		}

        const response = await axios.post(
            modelURL,
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
		console.log(modelName.toLowerCase())

		if (modelName.toLowerCase() !== "llama" && modelName.toLowerCase() !== "biogpt") {
			modelURL = `http://localhost:3001/generate/gemini`;
		}

        // URL string to modelURL
        const response = await axios.post(
            modelURL,
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
