let quote;
const content = document.getElementById("content");
const author = document.getElementById("author");
const tweet = document.getElementById("tweet");
const copy = document.getElementById("copy");
const newQuoteButton = document.getElementById("newQuoteBtn");

// getting random quote function
async function getRandomQuote() {
  const res = await fetch(
    "https://api.freeapi.app/api/v1/public/quotes/quote/random"
  );

  const data = await res.json();
  const quoteData = data.data;

  quote = quoteData;

  // setting the text content here itself
  content.textContent = `"${quoteData.content}"`;
  author.textContent = `- ${quoteData.author}`;
  return;
}

// tweet function
function tweetQuote() {
  tweet.href = `http://twitter.com/share?text=${quote.content}`;
}

// copy function
function copyToClipBoard() {
  navigator.clipboard.writeText(quote.content);
}

// get new quote on button click
newQuoteButton.addEventListener("click", getRandomQuote);

// copy to clipboard
copy.addEventListener("click", copyToClipBoard);

// tweet
tweet.addEventListener("click", tweetQuote);

// running this to ensure when user visits page for first time or reloads, the quote is fetched.
getRandomQuote();
