import TelegramBot from 'node-telegram-bot-api'
import 'dotenv/config'
import fs from 'fs'
import {fetchRedditPost} from './reddit_scraper.js'

const token = process.env.TELEGRAM_API_KEY;
const bot = new TelegramBot(token, {polling: true});

console.log("Telegram bot running...");

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome \n Use /list to get a list of stocks being talked about");
});

//get list of stocks to buy
bot.onText(/\/list/, async (msg) => {
    const text = fs.readFileSync('output.txt', 'utf8');
    bot.sendMessage(msg.chat.id, text);
});

//show the link of the post that was scraped
bot.onText(/\/post/, async (msg) => {
    const text = await fetchRedditPost();
    bot.sendMessage(msg.chat.id, text[1].data.url);
    });