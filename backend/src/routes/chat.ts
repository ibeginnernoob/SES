import { Router } from 'express';
import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = 'AIzaSyC-rE0Ggpz0AlNeYVC3aoJXBmz2j2YS9eI';

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const message = req.body.message;

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();

        const response = await ai.models.generateContentStream({
            model: 'gemini-2.0-flash-001',
            contents: `${message}`,
        });

        for await (const chunk of response) {
            res.write(
                `data: ${JSON.stringify({
                    chunk: chunk.text,
                    finished: false,
                })}\n\n`
            );
        }

        res.write(`data: {"finished": true}\n\n`);
        res.end();
    } catch (e: any) {
        console.log(e);
        res.status(500).json({
            message: 'Something went wrong',
        });
    }
});

export default router;
