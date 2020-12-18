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

const SQL_SELECT_ALL = 'SELECT * FROM dbo.Anime ORDER BY AnimeId ASC for json path;';

// for json path, without_array_wrapper - use for single json result
const SQL_SELECT_BY_ID = 'SELECT * FROM dbo.Anime WHERE AnimeId = @id for json path, without_array_wrapper;';

// for json path, without_array_wrapper - use for single json result
const SQL_SELECT_BY_CATID = 'SELECT * FROM dbo.Anime WHERE CategoryId = @id ORDER BY AnimeName ASC for json path;';

// Second statement (Select...) returns inserted record identified by ProductId = SCOPE_IDENTITY()
const SQL_INSERT = 'INSERT INTO dbo.Anime (CategoryId, AnimeName, AnimeDescription, AnimeStock, AnimePrice) VALUES (@categoryId, @animeName, @animeDescription, @animeStock, @animePrice); SELECT * from dbo.Anime WHERE AnimeId = SCOPE_IDENTITY();';

const SQL_UPDATE = 'UPDATE dbo.Anime SET CategoryId = @categoryId, AnimeName = @animeName, AnimeDescription = @animeDescription, AnimeStock = @animeStock, AnimePrice = @animePrice WHERE AnimeId = @id; SELECT * FROM dbo.Anime WHERE AnimeId = @id;';
const SQL_DELETE = 'DELETE FROM dbo.Anime WHERE AnimeId = @id;';

// Get all products
// This is an async function named getProducts defined using ES6 => syntax

let getAnimes = async () => {
    // define variable to store animes
    let animes;
    
    // Get a DB connection and execute SQL (uses imported database module)
    // Note await in try/catch block
    try {
        const pool = await dbConnPoolPromise
        const result = await pool.request()
        // execute the select all query (defined above)
            .query(SQL_SELECT_ALL);
        // first element of the recordset contains animes
        animes = result.recordset[0];
    // Catch and log errors to server side console
    } catch (err) {
        console.log('DB Error - get all animes: ', err.message);
    }
    
    // return animes
    return animes;
};

// get product by id
// This is an async function named getAnimeById defined using ES6 => syntax
let getAnimeById = async (animeId) => {
    let anime;

    // returns a single anime with matching id
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()
        // set @id parameter in the query
            .input('id', sql.Int, animeId)
            // execute query
            .query(SQL_SELECT_BY_ID);

    // Send response with JSON result
    anime = result.recordset[0];

    } catch (err) {
        console.log('DB Error - get anime by id: ', err.message);
    }

    // return the product
    return anime;
};

// Get products by category
let getAnimeByCatId = async (categoryId) => {

    let animes;

    // returns animes with matching category id
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set name parameter(s) in query
            .input('id', sql.Int, categoryId)
            // execute query
            .query(SQL_SELECT_BY_CATID);
        // Send response with JSON result
        animes = result.recordset[0];
    } catch (err) {
        console.log('DB Error - get anime by category id: ', err.message);
    }

    return animes;
};

// insert a new anime
let createAnime = async (anime) => {
    // Declare variables
    let insertAnime;

    // Insert a new anime
    // Note: no Anime yet
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const reslt = await pool.request()

            // set named parameter(s) in query
            // checks for potential sql injection
            .input('categoryId', sql.Int, anime.CategoryId)
            .input('animeName', sql.NVarChar, anime.AnimeName)
            .input('animeDescription', sql.NVarChar, anime.AnimeDescription)
            .input('animeStock', sql.Int, anime.AnimeStock)
            .input('animePrice', sql.Decimal, anime.AnimePrice)
            // Execute Query
            .query(SQL_INSERT);
        // The newly inserted product is returned by the query
        insertAnime = reslt.recordset[0];

        // catch and log DB errors
    } catch (err) {
        console.log('DB Error - error inserting a new product: ', err.message)
    }
    // Return the anime data
    return insertAnime;
};

// update an existing product
let updateAnime = async (anime) => {
    // Declare variables
    let updatedAnime;

    // Upade a product
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()

            // set named parameter(s) in query
            // checks for potential sql injection
            .input('id', sql.Int, anime.AnimeId)
            .input('categoryId', sql.Int, anime.CategoryId)
            .input('animeName', sql.NVarChar, anime.AnimeName)
            .input('animeDescription', sql.NVarChar, anime.AnimeDescription)
            .input('animeStock', sql.Int, anime.AnimeStock)
            .input('animePrice', sql.Decimal, anime.AnimePrice)
            // Execute Query
            .query(SQL_UPDATE);
        // The product is returned by the query
        updatedAnime = result.recordset[0];

        // catch and log DB errors
    } catch (err) {
        console.log('DB Error - error updating anime: ', err.message)
    }
    // Return the product data
    return updatedAnime;
};

// delete a anime
let deleteAnime = async (id) => {
    let row;

    // returns a single anime with matching id
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
            console.log('DB Error - get anime by id: ', err.message);
        }
        
        if (row === 0)
            return false;
        
        return true; 
};

// Export

module.exports = {
    getAnimes,
    getAnimeById,
    getAnimeByCatId,
    createAnime,
    updateAnime,
    deleteAnime
};