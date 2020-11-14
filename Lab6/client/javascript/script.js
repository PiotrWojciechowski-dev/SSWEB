// The set HTTP headers. These will be used by Fetch when making requests to the api
const HTTP_REQ_HEADERS = new Headers({
    "Accept": "application/json",
    "Content-Type" : "application/json"
});

// Requests will use the GET method and allow the cross origin requests
const GET_INIT = { method : 'GET', credentials : 'include', headers : HTTP_REQ_HEADERS, mode : 'cors', cache : 'default'};

// API Base URL - the server address
const BASE_URL = `http://localhost:8080`;

// Asynchronous Function getDataAsync from a url and return

async function getDataAsync(url) {
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
// Create product rows
// Display in web page
function displayProducts(products) {

    // Use the Array map method to iterate through the array of products (in json format)
    // Each products will be formated as HTML table rowsand added to the array
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    // Finally the output array is inserted as the content into the <tbody id="productRows"> element
    const rows = products.map(product => {
        // returns a template string for each product, values are inserted using ${ }
        // <tr> is a table row and <td> a table division represents a column

        let row = `<tr>
                <td>${product.ProductId}</td>
                <td><a href="#" data-toggle="modal" data-target="#productModal" onclick="displayProduct(${product.ProductId})">${product.ProductName}</a></td>
                <td>${product.ProductDescription}</td>
                <td>${product.ProductStock}</td>
                <td class="price">&euro;${Number(product.ProductPrice).toFixed(2)}</td>
                </tr>`;
        return row;
    });

    // Set the innerHTML of the ProductRows root element = rows
    // Why use join('') ? Join() method returns the array as a string, elements seperated by a specified seperator
    document.getElementById('productRows').innerHTML = rows.join('');
} // end function

async function displayProduct(id) {
    const product = await getDataAsync(`${BASE_URL}/product/${id}`)
    let title = `${product.ProductName}`;
    document.getElementById('productModalLabel').innerHTML = title;
    let item = `<tr>
                <td>${product.ProductId}</td>
                <td>${product.ProductName}</td>
                <td>${product.ProductDescription}</td>
                <td>${product.ProductStock}</td>
                <td class="price">&euro;${Number(product.ProductPrice).toFixed(2)}</td>
                </tr>`;
    document.getElementById('item').innerHTML = item;
}

function displayCategories(categories) {

    // Use the Array map method to iterate through the array of products (in json format)
    // Each products will be formated as HTML table rowsand added to the array
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    // Finally the output array is inserted as the content into the <tbody id="productRows"> element
    const items = categories.map(category => {
        // returns a template string for each product, values are inserted using ${ }

        return `<a href="#" class="list-group-item list-group-item-action" onclick="updateProductsView(${category.CategoryId})">${category.CategoryName}</a>`;
    });
    items.unshift(`<a href="#" class="list-group-item list-group-item-action" onclick="loadProducts()">Display All</a>`) 
    // Set the innerHTML of the categoryList root element = items
    document.getElementById('categoryList').innerHTML = items.join('');
} // end function

// Load Products
// Get all categories and prodcuts then display
async function loadProducts() {
    try {
        const categories = await getDataAsync(`${BASE_URL}/category`);
        displayCategories(categories);
        const products = await getDataAsync(`${BASE_URL}/product`);
        displayProducts(products);
    // catch and log any errors
    } catch (err) {
        console.log(err);
    }
}

// update product list when category is selected to show only products from that category
async function updateProductsView(id) {
    try {
        // Call API to get products by category id
        const prodcuts = await getDataAsync(`${BASE_URL}/product/bycat/${id}`);

        // display the list of products returned
        displayProducts(prodcuts);
    // catch and log any errors
    } catch (err) {
        console.log(err)
    }
}

// When the script is loaded, call loadProducts() to add products to the page
loadProducts();
