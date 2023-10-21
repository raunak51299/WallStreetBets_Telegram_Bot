//import cron
import cron from 'node-cron';
import fs from 'fs';  
import {recommendStocks} from './openai.js';
import './telegram_bot.js';
// Run everyday at 7:30 AM IST every day
cron.schedule('30 7 * * *', async () => {
    console.log("Running cron job...");
    const text = await recommendStocks();
    fs.writeFileSync('output.txt', text);
    console.log("Cron job finished.");
});

