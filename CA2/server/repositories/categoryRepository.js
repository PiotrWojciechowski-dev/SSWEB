// Dependencies

// require the database connection
const { sql, dbConnPoolPromise } = require('../database/db.js');

// models
const Anime = require('../models/anime.js');
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
const SQL_SELECT_BY_CATID = 'SELECT * FROM dbo.Category WHERE CategoryId = @id ORDER BY AnimeName ASC for json path;';

// Second statement (Select...) returns inserted record identified by AnimeId = SCOPE_IDENTITY()
const SQL_INSERT = 'INSERT INTO dbo.Category (CategoryId, CategoryName, CategoryDescription) VALUES (@categoryId, @categoryName, @categoryDescription); SELECT * from dbo.Category WHERE CategoryId = SCOPE_IDENTITY();';

const SQL_UPDATE = 'UPDATE dbo.Category SET CategoryId = @categoryId, CategoryName = @categoryName, CategoryDescription = @categoryDescription WHERE CategoryId = @id; SELECT * FROM dbo.Category WHERE CategoryId = @id;';

const SQL_DELETE = 'DELETE FROM dbo.Category WHERE CategoryId = @id;';

// Get all animes
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
        // first element of the recordset contains animes
        categories = result.recordset[0];
    // Catch and log errors to server side console
    } catch (err) {
        console.log('DB Error - get all animes: ', err.message);
    }
    
    // return categories
    return categories;
    
};

// get category by id
// This is an async function named getCategoryById defined using ES6 => syntax
let getCategoryById = async (categoryId) => {

    let category;

    // returns a single anime with matching id
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
        console.log('DB Error - get anime by id: ', err.message);
    }

    // return the anime
    return category;
};

// To be implemented
// insert/ create a new anime
let createCategory = async (category) => {
    // Declare variables
    let insertCategory;

    // Insert a new category
    // Note: no Category yet
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const reslt = await pool.request()

            // set named parameter(s) in query
            // checks for potential sql injection
            .input('categoryName', sql.NVarChar, anime.AnimeName)
            .input('categoryDescription', sql.NVarChar, anime.AnimeDescription)
            // Execute Query
            .query(SQL_INSERT);
        // The newly inserted category is returned by the query
        insertCategory = reslt.recordset[0];

        // catch and log DB errors
    } catch (err) {
        console.log('DB Error - error inserting a new category: ', err.message)
    }
    // Return the category data
    return insertCategory;
};

// update an existing category
let updateCategory = async (category) => {
    // Declare variables
    let updatedCategory;

    // Upade a category
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()

            // set named parameter(s) in query
            // checks for potential sql injection
            .input('categoryId', sql.Int, anime.CategoryId)
            .input('categoryName', sql.NVarChar, anime.AnimeName)
            .input('categoryDescription', sql.NVarChar, anime.AnimeDescription)
            // Execute Query
            .query(SQL_UPDATE);
        // The product is returned by the query
        updatedCategory = result.recordset[0];

        // catch and log DB errors
    } catch (err) {
        console.log('DB Error - error updating category: ', err.message)
    }
    // Return the category data
    return updatedCategory;
};

// delete a category
let deleteCategory = async (id) => {
    let row;
    // returns a single category with matching id
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set @id parameter in the query
            .input('id', sql.Int, id)
            // execute query
            .query(SQL_DELETE);

        // Was the product deleted?  
        console.log(result)  
        row = Number(result.row);    

        } catch (err) {
            console.log('DB Error - get category by id: ', err.message);
        }
        
        if (row === 0)
            return false;
        
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