const router = require('express').Router();

const productService = require('../services/productService.js');

// GET listing of all products
// Address http://server:port/product
// returns JSON
router.get('/', async (req, res) => {
    let result;
    // Get products
    try {
        result = await productService.getProducts();
        res.json(result);
    // Catch and send errors
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});
    
// GET a single product by id
// id passed as parameter via url
// Address http://server:port/product/:id
// returns JSON
router.get('/:id', async (req, res) => {
    let result;
    // read value of id parameter from the request url
    const productId = req.params.id;
    // If validation passed execute query and return results
    // returns a single product with matching id
    try {
        // Send response with JSON result
        result = await productService.getProductById(productId);
        res.json(result);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

// GET products by category id
// id passed as parameter via url
// Address http://server:port/product/:id
// returns JSON
router.get('/bycat/:id', async (req, res) => {
    let result;
    // read value of id parameter from the request url
    const categoryId = req.params.id;

    // If validation passed execute query and return results
    // returns a single product with matching id
    try {
        // Send response with JSON result
        result = await productService.getProductByCatId(categoryId);
        res.json(result);
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
});



//These functions need to be fully implemented
// POST - Insert a new product.
// This async function sends a HTTP post request
router.post('/', async (req, res) => {

    // the request body contains the new product values - copy it
    let newProduct = req.body;

    // show what was copied in the console (server side)
    console.log("product: ", newProduct);

    // Pass the new product data to the service and await the result
    try {
        // Send response with JSON result
        result = await productService.createProduct(newProduct);

        // Send a json response back to the client
        res.json(result)

        // Handle server (status 500) erros
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
});
    
// PUT update product
// Like post but productId is provided and method = put
router.put('/', async (req, res) => {

    let result;

    // the request body contains the new product values - copy it
    const product = req.body;

    // show what was copied in the console (server side)
    console.log("product update: ", product);

    // Pass the new product data to the service and await the result
    try {
        // Send response with JSON result    
        result = await productService.updateProduct(product);

        // send a json response back to the client
        res.json(result);

        // handle server (status 500) errors
        } catch (err) {
            res.status(500)
            res.send(err.message)
        }
});
    
// DELETE single task.
router.delete('/:id', async (req, res) => {

    let result;
    // read value of id parameter from the request url
    const productId = req.params.id;
    // If validation passed execute query and return results
    // returns a single product with matching id
    try {
        // Send response with JSON result    
        result = await productService.deleteProduct(productId);
        res.json(result);

    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});
    
// Export as a module
module.exports = router;