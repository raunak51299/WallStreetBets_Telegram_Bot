// This script scrapes the list of positively talked stocks on the present day on subreddit 'r/wallstreetbets'
import fs from 'fs';
async function fetchRedditPost() {
    console.log("Fetching Reddit post...");
    const response = await fetch(
        "https://www.reddit.com/user/OPINION_IS_UNPOPULAR.json?sort=new&limit=50"
    );
    const json = await response.json();
  
    // Get the newest post that contains the string "What Are Your Moves Tomorrow"
    const latestPost = json.data.children.find((post) => {
      const title = post.data.title
      return title && title.includes("What Are Your Moves Tomorrow");
    })
  
    if (!latestPost) throw new Error("No post found!")
  
    // Remove last path on url
    const commentPermalinkArray = latestPost.data.url.split("/");
    commentPermalinkArray.pop();
    commentPermalinkArray.pop();
    const permalink = commentPermalinkArray.join("/") + ".json?sort=top";
  
    // Get comments from latest post
    const commentResponse = await fetch(permalink);
    const commentJson = await commentResponse.json();
    // commentJson[0] -> OG post data; commentJson[1] -> comment data
    return [commentJson[1].data.children, latestPost];
}
  
  
function generateCommentsString(redditPostComments) {
    console.log("Generating comments string...");
    let commentString = "";
    redditPostComments.forEach((comment) => {
        if (commentString.length > 10000) {
            return;
        }
        let currentComment = comment.data.body;
        if (!currentComment) {
            return;
        }

        //on the current comment, delete any text that is of the form [*](*)
        //this will delete any links in the comment
        currentComment = currentComment.replace(/\[.*\]\(.*\)/g, "");
        //delete any emojis from currentComment
        currentComment = currentComment.replace(/[\u{1F600}-\u{1F64F}]/gu, "");
        currentComment = currentComment.replace(
            /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, ""
        );

        commentString += `>` + currentComment + ` (${comment.data.score} People Agree.)` + "\n";
    });
    return commentString;
}


// fetchRedditPost()
//     .then((redditPostComments) => {
//         //save in a text file
        
//         fs.writeFile('reddit_comments.txt', generateCommentsString(redditPostComments[0]), function (err) {
//             if (err) return console.log(err);
//         });
//     })
//     .catch((error) => {
//         console.error(error);
//     });

export { fetchRedditPost, generateCommentsString }