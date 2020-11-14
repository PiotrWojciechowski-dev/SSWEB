// JavaScript Fetch, see https://developer.mozzila.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

// Get a free API key from https://newsapi.org/
const API_KEY = '6957fad10a0c4d429984ca1fa425baaf';

// The set HTTP headers. These will be used by Fetch when making requests to the news service
const headers = new Headers();

// Requests will use the GET method and permit cross origin requests
const init = { method: 'GET', headers: headers, mode: 'cors', cache: 'default'};

// Asychronous Function getDataAsync()
async function getDataAsync(url) {
    // Try catch
    try {
        // Call fetch and await the repose
        // Initially returns a promise
        const response = await fetch(url);

        // As response is dependant on fetch, await must also be used here
        const json = await response.json();

        // Output result to console (for testing purposes)
        console.log(json.articles);

        // Call function (passing the json result) to display in HTML page
        displayData(json);
    } catch (err) {
        console.log(err);
    }   
}

// Parse JSON
// Create articale elements
// Display in web page
function displayData(data) {
    // Retrieve articles array from json data
    const articles = data.articles;

    // Set the source element
    document.getElementById('source').innerHTML = articles[0].source.name;

    // Use the array map method to iterate though the array of articles (in json format)
    // Each article will be formated as HTML and added to the output array
    // Finally the output array is inserted as the content into the articles element.
    const output = articles.map(article => {
        // returns a template string for each article, values are instead using ${ }
        // <article> is an HTML5 semantic element
        return `<article class="my-3">
                    <h3 class="ml-3 mt-3 font-weight-bold">${article.title}</h3>
                    <hr>
                    <div class="card-body">
                    <h4 class="card-text">By ${article.author}</h4>
                    <p class="card-text">${article.publishedAt}</p>
                    <div class="row">
                    <img class="col-sm-6 card-img-top" src=${article.urlToImage} alt='article Image'>
                    <p class="col-sm-6 card-text float-right">${article.description}
                    <a class="card-link" href='${article.url}' target='_blank'>Read More</a>
                    </p>
                    </div>
                </article>`;
    });

    // output, the result of the previous step, is an array of formatted articles
    // Set the innerHTML of the articles root element = output
    // Why use join('') ???
    document.getElementById('articles').innerHTML = output.join('');
    // end function
}

function getNews() {
    // Use The Irish Times as the news source, for more see https://newsapi.org/sources
    let news_source = 'the-irish-times';

    // Build the URL using NEWS_SOURCE and API_KEY
    // Note: v2 of newapi
    let url = `https://newsapi.org/v2/top-headlines?sources=${news_source}&apiKey=${API_KEY}`;

    getDataAsync(url)
}

function getHealth() {
    let category = 'health'
    let country = 'ie'
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`;

    getDataAsync(url)    
}

function getSports() {
    // Use The Irish Times as the news source, for more see https://newsapi.org/sources
    let category = 'sports'
    let country = 'ie'

    // Build the URL using NEWS_SOURCE and API_KEY
    // Note: v2 of newapi
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`;

    getDataAsync(url)    
}

function getBusiness() {
    let category = 'business'
    let country = 'ie'
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`;
    getDataAsync(url)    
}

function getTechnology() {
    let category = 'technology'
    let country = 'ie'
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`;
    getDataAsync(url)    
}

// Loads the news function anytime user reloads the page
window.onload = getNews();

// Code to select the current link the user has selected
// Get the container element
let nav = document.getElementById("nav-links");
// Get all buttons with class="btn" inside the container
let links = nav.getElementsByClassName("btn");
// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}