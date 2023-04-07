const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const author = document.querySelector(".author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.getElementById("loader");

let quoteData = [];

// show loader
const loading = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// Hide loader
const complete = function () {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

const getRandomQuote = function () {
  //   loading();

  // pick a random quote from quoteData
  const randomQuote =
    quoteData[Math.floor(Math.random() * quoteData.length + 1)];
  quoteText.textContent = randomQuote.text;
  //   Check if Author field is blank/null and replace it with 'Unknown'
  if (!randomQuote.author) {
    author.textContent = "Unkonwn";
  } else {
    author.textContent = randomQuote.author;
  }

  //   Check quote length to determine styling

  if (quoteText.textContent.length > 130) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  //   complete();
};

const showRandomQuote = async function () {
  try {
    loading();
    const quoteApi = await fetch(
      "https://jacintodesign.github.io/quotes-api/data/quotes.json"
    );

    quoteData = await quoteApi.json();
    getRandomQuote();
    complete();
  } catch {}
};

// Tweet Quote
const tweetQuote = function () {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
  window.open(twitterUrl, "_blank");
};

newQuoteBtn.addEventListener("click", getRandomQuote);
twitterBtn.addEventListener("click", tweetQuote);

showRandomQuote();
