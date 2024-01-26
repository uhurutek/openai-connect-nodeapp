const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;
const openAiKey = process.env.GPT_API_KEY;
const assistant = process.env.GPT_ASSISTANT_ID;
app.use(cors(process.env.DOMAIN_ALLOW));
app.use(express.json());
app.use(bodyParser.json());

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
    if (messages.data || messages.data.length > 0) {
        res.send(messages.data[0].content[0].text.value);
    } else {
        res.status(404).send("No response received");
    }
});


app.listen(port, () => { console.log(`openai-connect-node app is running on port: ${port}`) });

