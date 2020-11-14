// require the database connection
const productRepository = require('../repositories/productRepository.js');

// Input validation package
const validator = require('validator');

// Get all products via the repository
// return products
let getProducts = async () => {
    let products = await productRepository.getProducts();
    return products;
};
    
// Get product by id via the repository
// Validate input
// return product

let getProductById = async (productId) => {

    let product;
    // Validate input - important as a bad input could crash the server or lead to an attack
    if (!validator.isNumeric(productId, { no_symbols: true })) {
        console.log("getProducts service error: invalid id parameter");
        return "invalid parameter";
    }
    // get product
    product = await productRepository.getProductById(productId);
    return product;
};

// Get products in a category via the repository
// Validate input
// return products
let getProductByCatId = async (catId) => {

    let products;
    // Validate input - important as a bad input could crash the server or lead to an attack
    if (!validator.isNumeric(catId, { no_symbols: true })) {
        console.log("getProductsCatId service error: invalid id parameter");
        return "invalid parameter";
    }
    products = await productRepository.getProductByCatId(catId);

    return products;

};

// To be implemented
let createProduct = async (product) => {
    return true;
};
    
let updateProduct = async (product) => {
    return true;
};

let deleteProduct = async (id) => {
    return true;
};
    
// Module exports

module.exports = {
    getProducts,
    getProductById,
    getProductByCatId,
    createProduct,
    updateProduct,
    deleteProduct
};