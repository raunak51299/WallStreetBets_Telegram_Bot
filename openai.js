import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.openai,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();