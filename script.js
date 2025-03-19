let quote;
const content = document.getElementById("content");
const author = document.getElementById("author");
const tweet = document.getElementById("tweet");
const copy = document.getElementById("copy");
const newQuoteButton = document.getElementById("newQuoteBtn");
const exportBtn = document.getElementById("export");
const quoteContainer = document.getElementById("quote-container");

const backgroundImages = [
  "./assets/1.png",
  "./assets/2.png",
  "./assets/3.png",
  "./assets/4.png",
  "./assets/5.png",
];

// getting random quote function
async function getRandomQuote() {
  const res = await fetch(
    "https://api.freeapi.app/api/v1/public/quotes/quote/random"
  );

  const data = await res.json();
  const quoteData = data.data;

  quote = quoteData;

  content.textContent = quoteData.content;
  author.textContent = `- ${quoteData.author}`;

  setRandomBackground();
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

// BONUS: set random background function
function setRandomBackground() {
  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  const imageUrl = backgroundImages[randomIndex];

  // yes I took help of AI for this feature to understand how to set image in background😅
  // Create a new image to preload
  const img = new Image();
  img.onload = function () {
    // Only change background after image is loaded
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.transition = "background-image 0.2s ease-in-out";
    document.body.style.backdropFilter = "brightness(0.3)";
  };
  img.src = imageUrl;
}

// BONUS: exporting quote as image
function exportImage() {
  // I am using html2canvas library.
  html2canvas(quoteContainer, {
    backgroundColor: null,
    scale: 2,
    logging: false,
  })
    .then((canvas) => {
      const image = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = image;
      const filename = "quote.png";
      downloadLink.download = filename;
      downloadLink.click();
    })
    .catch((err) => {
      console.error("Export failed:", err);
      alert("Failed to export image. Please try again.");
    });
}

// get new quote on button click
newQuoteButton.addEventListener("click", getRandomQuote);

// copy to clipboard
copy.addEventListener("click", copyToClipBoard);

// tweet
tweet.addEventListener("click", tweetQuote);

// export button
exportBtn.addEventListener("click", exportImage);

// running this to ensure when user visits page for first time or reloads, the quote is fetched.
getRandomQuote();
