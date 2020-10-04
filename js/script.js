const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote-text");
const authorText = document.getElementById("author-text");
const twitterButton = document.getElementById("twitter-button");
const newQuoteButton = document.getElementById("new-quote-button");
const quoteLoader = document.getElementById("quote-loader");

function handleQuoteLoadingStart() {
  quoteLoader.hidden = false;
  quoteContainer.hidden = true;
}

function handleQuoteLoadingComplete() {
  if (!quoteLoader.hidden) {
    quoteContainer.hidden = false;
    quoteLoader.hidden = true;
  }
}

async function handleFetchingQuote() {
  handleQuoteLoadingStart();
  const proxyUrl = "https://proxy-server-cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    if (data.quoteAuthor === "") {
      authorText.innerText = "Anonymous";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    handleQuoteLoadingComplete();
  } catch (error) {
    handleFetchingQuote();
  }
}

function handleTweetingQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

newQuoteButton.addEventListener("click", handleFetchingQuote);
twitterButton.addEventListener("click", handleTweetingQuote);

handleFetchingQuote();
