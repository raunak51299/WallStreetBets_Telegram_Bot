//import cron
import cron from 'node-cron';
import {fetchRedditPost, generateCommentsString} from './reddit_scraper.js';
import './telegram_bot.js';
// Run everyday at 9:00 A.M IST
cron.schedule('0 9 * * *', async () => {
    console.log("Running cron job...");
    const redditPostComments = await fetchRedditPost();
    const text = generateCommentsString(redditPostComments[0]);
    fs.writeFileSync('output.txt', text);
    console.log("Cron job finished.");
});

