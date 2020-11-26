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
                <td>
                    <button class="btn btn-xs" data-toggle="modal" data-target="#ProductFormDialog" onclick="prepareProductUpdate(${product.ProductId})">
                    <span class="oi oi-pencil data-toggle="tooltip" title="Edit Product"></span></button></td>
                <td>
                    <button class="btn btn-xs" onclick="deleteProduct(${product.ProductId})">
                    <span class="oi oi-trash" data-toggle="tooltip" title="Delete Product"></span></button></td>
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

    // Fill select list in product form
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

// Add a new product - called by form submit
// get the form data and send request to the API
async function addOrUpdateProduct() {
    // url for api call
    const url = `${BASE_URL}/product`
    let httpMethod = "POST"

    // get new product data as json (the request body)
    const productObj = getProductForm();

    if (productObj.ProductId > 0) {
        httpMethod = "PUT"
    }
    // build the request object - note: POST
    // reqBodyJson added to the req body
    const request = {
        method: httpMethod,
        headers: HTTP_REQ_HEADERS,
        // credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(productObj)
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
    // Refresh products list
    loadProducts();
}


// Get form data and return as json ready for POST
// Uppercase first char to match DB
function getProductForm() {


    // Get form fields
    const pId = document.getElementById('ProductId').value;
    const catId = document.getElementById('CategoryId').value;
    const pName = document.getElementById('ProductName').value;
    const pDesc = document.getElementById('ProductDescription').value;
    const pStock = document.getElementById('ProductStock').value;
    const pPrice = document.getElementById('ProductPrice').value;
    
    // build request body for post
    // JSON.stringify converts the object to json
    // required for sending to the API
    const productJson = {
        ProductId: pId,
        CategoryId: catId,
        ProductName: pName,
        ProductDescription: pDesc,
        ProductStock: pStock,
        ProductPrice: pPrice
    };
    // return the body data
    return productJson;
}

// Setup product form
function productFormSetup(title) {
    // Set the the title
    document.getElementById("productFormTitle").innerHTML = title;

    // reset the form and change the title
    //document.getElementById("productForm").reset();

    // form reset doesn't work for hidden values
    //document.getElementById("ProductId").value = 0;
}

// When a product is selected for update/ editing, get it by id and fill out the form
async function prepareProductUpdate(id) {

    try {
        // Get broduct by id
        const product = await getDataAsync(`${BASE_URL}/product/${id}`);

        // Fill out the form
        document.getElementById('ProductId').value = product.ProductId; // uses a hidden field - see the form
        document.getElementById('CategoryId').value = product.CategoryId;
        document.getElementById('ProductName').value = product.ProductName;
        document.getElementById('ProductDescription').value = product.ProductDescription;
        document.getElementById('ProductStock').value = product.ProductStock;
        document.getElementById('ProductPrice').value = product.ProductPrice;

        // Set form Title
        productFormSetup(`Update Product ID: ${product.ProductId}`);
        // catch and log any errors
    } catch (err) {
        console.log(err);
    }
}

// Delete product by id using an HTTP DELETE request
async function deleteProduct(id) {
    
    const request = {
        method: 'DELETE',
        headers: HTTP_REQ_HEADERS,
        // credentials: 'include',
        mode: 'cors',
    };
    if (confirm("Are you sure?")) {
        // url
        const url = `${BASE_URL}/product/${id}`;
        // Try catch 
        try {
            const result = await fetch(url, request);
            const response = await result.json();

            if (response == true)
                loadProducts();

        // catch and log any errors
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}

// When the script is loaded, call loadProducts() to add products to the page
loadProducts();
