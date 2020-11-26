// require the database connection
const categoryRepository = require('../repositories/categoryRepository.js');

// Input validation package
const validator = require('validator');
const category = require('../models/category.js');

// Get all products via the repository
// return products
let getCategories = async () => {
    let categories = await categoryRepository.getCategories();
    return categories;
};
    
// Get product by id via the repository
// Validate input
// return product
let getCategoryById = async (categoryId) => {

    let category;
    // Validate input - important as a bad input could crash the server or lead to an attack
    if (!validator.isNumeric(categoryId, { no_symbols: true })) {
        console.log("getCategories service error: invalid id parameter");
        return "invalid parameter";
    }
    // get product
    category = await categoryRepository.getCategoryById(categoryId);
    return category;
};

// To be implemented
let createCategory = async (category) => {
    return true;
};
    
let updateCategory = async (category) => {
    return true;
};

let deleteCategory = async (id) => {
    return true;
};
    
// Module exports

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};