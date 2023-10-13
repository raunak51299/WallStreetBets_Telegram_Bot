//import cron
import cron from 'node-cron';
import {fetchRedditPost, generateCommentsString} from './reddit_scraper.js';

// Run everyday at 7:30 PM IST
cron.schedule('30 19 * * *', () => {
    console.log('Running Cron Job');
    fetchRedditPost()
        .then((redditPostComments) => {
            console.log(generateCommentsString(redditPostComments));
        })
        .catch((error) => {
            console.error(error);
        });
    });

