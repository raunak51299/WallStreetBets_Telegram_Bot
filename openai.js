import OpenAI from 'openai';
import 'dotenv/config';
import { fetchRedditPost, generateCommentsString } from './reddit_scraper.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//fetch reddit post
async function recommendStocks() {
  console.log("Generating recommendations...");
  const redditPostComments = await fetchRedditPost();
  const text = generateCommentsString(redditPostComments[0]);

  const prompt = `The following text that is between '### START OF CONVERSATION DATA' and '### END OF CONVERSATION DATA' contains comments from a reddit stock trading thread. Return the top 5 stocks/indices that people in this group talked about. Take into account the number of times other people agree with each comment. Additionaly, mention if the sentiment of the comment regarding that stock/index is positive or negative. 
    ### START OF CONVERSATION DATA

    ${text}

    ### END OF CONVERSATION DATA

    Here is an example of the desired output format:

    Based on the comments and the number of people agreeing with each comment, here are the top 5 stocks/indices mentioned:

    1. SPY (S&P 500 Index) - Positive sentiment.
    2. TSLA (Tesla) - Positive sentiment.
    3. NVDA (NVIDIA) - Positive sentiment.
    4. VFS (unknown stock) - Negative sentiment.
    5. AMZN (Amazon) - Neutral sentiment.

    It's worth noting that the sentiment may vary within each comment, but the overall sentiment should be mentioned in brackets next to each stock/index.`

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "user",
        "content": prompt
      }
    ],
    temperature: 0,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  //console.log(response.choices[0].message.content);

  //export response.choices[0].message.content;

  const res = response.choices[0].message.content;
  console.log(res);
  return res;
}

export { recommendStocks };