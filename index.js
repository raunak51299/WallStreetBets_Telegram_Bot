import cron from 'node-cron';
import fs from 'fs';  
import {recommendStocks} from './openai.js';
import './telegram_bot.js';
    
// Run everyday at 7:30 AM IST every day
cron.schedule('0 7 * * *', async () => {
    const date = new Date();
    console.log("Running cron job... at " + date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const text = await recommendStocks();
    fs.writeFileSync('output.txt', text);
    console.log("Cron job finished.");
});

