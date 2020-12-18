// API Base URL - the server address
const BASE_URL = `http://localhost:8080`;

// The set HTTP headers. These will be used by Fetch when making requests to the api
function getHeaders() {
    // Return headers
    // Note that the access token is set in the Authorization: Bearer
    return new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getAccessToken()
    });
}


// Asynchronous Function getDataAsync from a url and return

async function getDataAsync(url) {

    // Requests will use the GET method and allow the cross origin requests
    const GET_INIT = { method : 'GET', credentials : 'include', headers : getHeaders(), mode : 'cors', cache : 'default'};

    // Try catch
    try {
        // Call fetch and await the respose
        // Initally returns a promise
        const response = await fetch(url, GET_INIT);
        
        // As Response is dependant on fetch, await must also be used here
        const json = await response.json();
        
        // Output result to console (for testing purposes)
        console.log(json);
        
        // Call function( passing he json result) to display data in HTML page
        //displayData(json);
        return json;
        // catch and log any errors
    } catch (err) {
        console.log(err);
        return err;
    } 
}

// Parse JSON
// Create anime rows
// Display in web page
function displayAnimes(animes) {
    // Use the Array map method to iterate through the array of anime (in json format)
    // Each anime will be formated as HTML table rowsand added to the array
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    // Finally the output array is inserted as the content into the <tbody id="animeRows"> element
    const rows = animes.map(anime => {
        const showUpdate = checkAuth(UPDATE_PRODUCT);
        const showDelete = checkAuth(DELETE_PRODUCT);
        // returns a template string for each anime, values are inserted using ${ }
        // <tr> is a table row and <td> a table division represents a column
        let row = `<div class="card w-25 mx-4 mb-4 p-3 text-center item">
                        <a class="" href="#" data-toggle="modal" data-target="#animeModal" onclick="displayAnime(${anime.AnimeId})">${anime.AnimeName}</a>
                        <img class="image mt-3" src="${BASE_URL}/images/${anime.AnimeId}.jpg">
                        <p class="price mt-4">&euro;${Number(anime.AnimePrice).toFixed(2)}</p>`
        // if user has permission to update - add the edit button
        if (showUpdate && showDelete) {
            row += `<div>
                    <button class="btn btn-xs w-25" data-toggle="modal" 
                    data-target="#AnimeFormDialog" onclick="prepareAnimeUpdate(${anime.AnimeId})">
                    <span class="oi oi-pencil" data-toggle="tooltip" title="Edit Anime"></span></button>
                    <button class="btn btn-xs w-25" onclick="deleteAnime(${anime.AnimeId})">
                    <span class="oi oi-trash" data-toggle="tooltip" title="Delete Anime"></span></button>
                    </div>`
        }
        // if user has permission to delete - add the delete button          
        else if (showUpdate && !showDelete) {
            row += `<div class="inline">
            <button class="btn btn-xs w-25" data-toggle="modal" data-target="#AnimeFormDialog" onclick="prepareAnimeUpdate(${anime.AnimeId})">
            <span class="oi oi-pencil" data-toggle="tooltip" title="Edit Anime"></span></button>
                </div>`
        }
        row += `</div>`;
        return row;
    });

    // Set the innerHTML of the AnimeRows root element = rows
    // Why use join('') ? Join() method returns the array as a string, elements seperated by a specified seperator
    document.getElementById('animeRows').innerHTML = rows.join(' ');
} // end function

async function displayAnime(id) {
    const anime = await getDataAsync(`${BASE_URL}/anime/${id}`)
    let title = `${anime.AnimeName}`;
    document.getElementById('animeModalLabel').innerHTML = title;
    let item = `<div>
                <img class="w-50 image float-right mx-3" src="${BASE_URL}/images/${anime.AnimeId}.jpg">
                <p class="">${anime.AnimeDescription}</p>
                </div>
                <p class="price mt-4" style="margin:0;display:inline;">Cost: &euro;${Number(anime.AnimePrice).toFixed(2)}</p>
                <p class="" style="margin-right:10px;display:inline;float:right;">Stock: ${anime.AnimeStock}</p>`;
    document.getElementById('item').innerHTML = item;
}

function displayCategories(categories) {

    // Use the Array map method to iterate through the array of anime (in json format)
    // Each anime will be formated as HTML table rowsand added to the array
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    // Finally the output array is inserted as the content into the <tbody id="animeRows"> element
    const items = categories.map(category => {
        // returns a template string for each anime, values are inserted using ${ }
        return `<a href="#" class="list-group-item list-group-item-action" onclick="updateAnimesView(${category.CategoryId})">${category.CategoryName}</a>`;
    });
    items.unshift(`<a href="#" class="list-group-item list-group-item-action" onclick="loadAnimes()">Display All</a>`) 
    // Set the innerHTML of the categoryList root element = items
    document.getElementById('categoryList').innerHTML = items.join('');

    // Fill select list in anime form
    // First get the select input by its id
    let catSelect = document.getElementById("CategoryId");

    // Add default option (to the currently empty select)
    // options[catSelect.options.length] is the last option + 1
    // an option is made from a name, value pair
    catSelect.options[catSelect.options.length] = new Option("Choose Category", "0");

    // Add an option for each category
    // iterate through categories adding each to the end of the options list
    // each option is made from categoryName, categoryId
    for (i = 0; i < categories.length; i++) {
        catSelect.options[catSelect.options.length] = new Option(categories[i].CategoryName, categories[i].CategoryId);
    }
} // end function

// Load anime
// Get all categories and prodcuts then display
async function loadAnimes() {
    try {
        const categories = await getDataAsync(`${BASE_URL}/category`);
        displayCategories(categories);
        const animes = await getDataAsync(`${BASE_URL}/anime`);
        displayAnimes(animes);
    // catch and log any errors
    } catch (err) {
        console.log(err);
    }
}

// update anime list when category is selected to show only anime from that category
async function updateAnimesView(id) {
    try {
        // Call API to get anime by category id
        const animes = await getDataAsync(`${BASE_URL}/anime/bycat/${id}`);
        // display the list of anime returned
        displayAnimes(animes);
    // catch and log any errors
    } catch (err) {
        console.log(err)
    }

}

// Add a new anime - called by form submit
// get the form data and send request to the API
async function addOrUpdateAnime() {
    // url for api call
    const url = `${BASE_URL}/anime/`
    let httpMethod = "POST"

    // get new anime data as json (the request body)
    const animeObj = getAnimeForm();

    if (animeObj.AnimeId > 0) {
        httpMethod = "PUT"
    } else {
        
    }
    // build the request object - note: POST
    // reqBodyJson added to the req body
    const request = {
        method: httpMethod,
        headers: getHeaders(),
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(animeObj)
    };

    // Try catch
    try {
        // Call fetch and await the respose
        // fetch url using request object
        const response = await fetch(url, request);
        const json = await response.json();

        // Output result to console (for testing purposes)
        console.log(json);

    // catch and log any errors
    } catch (err) {
        console.log(err);
        return err;
    }
    // Refresh anime list
    loadAnimes();
}


// Get form data and return as json ready for POST
// Uppercase first char to match DB
function getAnimeForm() {
    // Get form fields
    const aId = document.getElementById('AnimeId').value;
    const catId = document.getElementById('CategoryId').value;
    const aName = document.getElementById('AnimeName').value;
    const aDesc = document.getElementById('AnimeDescription').value;
    const aStock = document.getElementById('AnimeStock').value;
    const aPrice = document.getElementById('AnimePrice').value;
    
    // build request body for post
    // JSON.stringify converts the object to json
    // required for sending to the API
    const animeObj = {
        AnimeId: aId,
        CategoryId: catId,
        AnimeName: aName,
        AnimeDescription: aDesc,
        AnimeStock: aStock,
        AnimePrice: aPrice
    };
    // return the body data
    return animeObj;
}

// Setup anime form
function animeFormSetup(title) {
    // Set the the title
    document.getElementById("animeFormTitle").innerHTML = title;

    // reset the form and change the title
    //document.getElementById("animeForm").reset();

    // form reset doesn't work for hidden values
    //document.getElementById("AnimeId").value = 0;
}

// When a anime is selected for update/ editing, get it by id and fill out the form
async function prepareAnimeUpdate(id) {

    try {
        // Get broduct by id
        const anime = await getDataAsync(`${BASE_URL}/anime/${id}`);

        // Fill out the form
        document.getElementById('AnimeId').value = anime.AnimeId; // uses a hidden field - see the form
        document.getElementById('CategoryId').value = anime.CategoryId;
        document.getElementById('AnimeName').value = anime.AnimeName;
        document.getElementById('AnimeDescription').value = anime.AnimeDescription;
        document.getElementById('AnimeStock').value = anime.AnimeStock;
        document.getElementById('AnimePrice').value = anime.AnimePrice;

        // Set form Title
        animeFormSetup(`Update Anime ID: ${anime.AnimeId}`);
        // catch and log any errors
    } catch (err) {
        console.log(err);
    }
}

// Delete anime by id using an HTTP DELETE request
async function deleteAnime(id) {
    
    const request = {
        method: 'DELETE',
        headers: getHeaders(),
        // credentials: 'include',
        mode: 'cors',
    };
    if (confirm("Are you sure?")) {
        // url
        const url = `${BASE_URL}/anime/${id}`;
        // Try catch 
        try {
            const result = await fetch(url, request);
            const response = await result.json();

            if (response == true)
                loadAnimes();

        // catch and log any errors
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}

// When the script is loaded, call loadAnimes() to add anime to the page
loadAnimes();
