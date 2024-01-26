const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;
const openAiKey = process.env.GPT_API_KEY;
const assistant = process.env.GPT_ASSISTANT_ID;
app.use(cors({
    origin: process.env.DOMAIN_ALLOW,
    optionsSuccessStatus: 200
}));
app.use(express.json());

const checkDomain = (req, res, next) => {
    const allowedDomain = process.env.DOMAIN_ALLOW;
    if (!req.headers.origin || req.headers.origin !== allowedDomain) {
        return res.status(403).send(`The request from ${req.headers.origin} has been blocked due to Cross-Origin Request Policy restrictions.`);
    }
    res.header("Access-Control-Allow-Origin", allowedDomain);
    next();
};

app.use(checkDomain);

const openai = new OpenAI({ apiKey: openAiKey });

app.post("/chats", async (req, res) => {
    res.send(await openai.beta.threads.create())
});

app.post("/chats/:threadID/:question", async (req, res) => {
    const { threadID, question } = req.params;

    await openai.beta.threads.messages.create(threadID, {
        role: "user",
        content: question,
    });
    const run = await openai.beta.threads.runs.create(threadID, { assistant_id: assistant });

    let response;
    do {
        response = await openai.beta.threads.runs.retrieve(threadID, run.id);
        await new Promise(resolve => setTimeout(resolve, parseInt(process.env.GPT_RUN_SLEEP || 3) * 1000));
    } while (response.status === 'queued' || response.status === 'in_progress');

    const messages = await openai.beta.threads.messages.list(threadID);
    if (messages.data && messages.data.length > 0) {
        res.send(messages.data[0].content[0].text.value);
    } else {
        res.status(404).send("No response received");
    }
});


app.listen(port, () => { console.log(`openai-connect-nodeapp is running on port: ${port}`) });

