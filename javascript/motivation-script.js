const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');

let apiQuotes=[];

 function showLoadingSpinner() {
     loader.hidden=false;
     quoteContainer.hidden=true;
 }

function hideLoadingSpinner() {
    if(!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}

function newQuote() {
    showLoadingSpinner();
    // Pick a randon quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if AUthor field is blank and replace it with "Unknown"
    if (!quote.author) {
        authorText.textContent='Unknown';
    }else{
        authorText.textContent=quote.author;
    }
    // Check Quote length to determine styling
    if(quote.text.length>120) {
    quoteText.classList.add('long-quote');
    }else {
    quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent=quote.text;
    hideLoadingSpinner();
}

// Get Quote From API
async function getQuote() {
    showLoadingSpinner();
    const apiUrl='https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl)
        apiQuotes= await response.json();
        // If AUthor is blank, add 'Unknown' 
        newQuote();
        hideLoadingSpinner();
    } catch (error) {
        getQuote();
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//  On Load Quote
 getQuote();
