// Dependencies

// require the database connection
const { sql, dbConnPoolPromise } = require('../database/db.js');

// models
const Product = require('../models/product.js');
const Category = require('../models/category.js');

// Define SQL statements here for use in function below
// These are parameterised queries note @named parameters.
// Input parameters are parsed and set before queries are executed
// for json path - Tell MSSQL to return results as JSON so that
// translation from resultset to object notation is not requires

const SQL_SELECT_ALL = 'SELECT * FROM dbo.Category ORDER BY CategoryName ASC for json path;';

// for json path, without_array_wrapper - use for single json result
const SQL_SELECT_BY_ID = 'SELECT * FROM dbo.Category WHERE CategoryId = @id for json path, without_array_wrapper;';

// for json path, without_array_wrapper - use for single json result
const SQL_SELECT_BY_CATID = 'SELECT * FROM dbo.Category WHERE CategoryId = @id ORDER BY ProductName ASC for json path;';

// Second statement (Select...) returns inserted record identified by ProductId = SCOPE_IDENTITY()
const SQL_INSERT = 'INSERT INTO dbo.Category (CategoryId, CategoryName, CategoryDescription) VALUES (@categoryId, @categoryName, @categoryDescription); SELECT * from dbo.Category WHERE CategoryId = SCOPE_IDENTITY();';

const SQL_UPDATE = 'UPDATE dbo.Category SET CategoryId = @categoryId, CategoryName = @categoryName, CategoryDescription = @categoryDescription WHERE CategoryId = @id; SELECT * FROM dbo.Category WHERE CategoryId = @id;';

const SQL_DELETE = 'DELETE FROM dbo.Category WHERE CategoryId = @id;';

// Get all products
// This is an async function named getCategories defined using ES6 => syntax
let getCategories = async () => {
    // define variable to store categories
    let categories;
    
    // Get a DB connection and execute SQL (uses imported database module)
    // Note await in try/catch block
    try {
        const pool = await dbConnPoolPromise
        const result = await pool.request()
        // execute the select all query (defined above)
            .query(SQL_SELECT_ALL);
        // first element of the recordset contains products
        categories = result.recordset[0];
    // Catch and log errors to server side console
    } catch (err) {
        console.log('DB Error - get all products: ', err.message);
    }
    
    // return categories
    return categories;
    
};

// get category by id
// This is an async function named getCategoryById defined using ES6 => syntax
let getCategoryById = async (categoryId) => {

    let category;

    // returns a single product with matching id
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()
        // set @id parameter in the query
            .input('id', sql.Int, categoryId)
            // execute query
            .query(SQL_SELECT_BY_ID);

    // Send response with JSON result
    category = result.recordset[0];

    } catch (err) {
        console.log('DB Error - get product by id: ', err.message);
    }

    // return the product
    return category;
};

// To be implemented
// insert/ create a new product
let createCategory = async (category) => {
    return true;
};

// update an existing product
let updateCategory = async (category) => {
    return true; 
};

// delete a product
let deleteCategory = async (id) => {
    return true;
};

// Export

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};