// require the database connection
const animeRepository = require('../repositories/animeRepository.js');

const animeValidator = require('../validators/animeValidators.js')

// Input validation package
const validator = require('validator');

// Get all products via the repository
// return products
let getAnimes = async () => {
    let animes = await animeRepository.getAnimes();
    return animes;
};
    
// Get product by id via the repository
// Validate input
// return product

let getAnimeById = async (animeId) => {
    let anime;
    // Validate input - important as a bad input could crash the server or lead to an attack
    if (!validator.isNumeric(animeId, { no_symbols: true })) {
        console.log("getAnimes service error: invalid id parameter");
        return "invalid parameter";
    }
    // get anime
    anime = await animeRepository.getAnimeById(animeId);
    return anime;
};

// Get products in a category via the repository
// Validate input
// return products
let getAnimeByCatId = async (catId) => {

    let animes;
    // Validate input - important as a bad input could crash the server or lead to an attack
    if (!validator.isNumeric(catId, { no_symbols: true })) {
        console.log("getAnimesCatId service error: invalid id parameter");
        return "invalid parameter";
    }
    animes = await animeRepository.getAnimeByCatId(catId);

    return animes;

};

// To be implemented
let createAnime = async (anime) => {

    // declare variables
    let newlyInsertedAnime

    // Call the product validator - kept seperate to avoid clutter here
    let validatedAnime = animeValidator.validateNewAnime(anime)

    // If validation returned a product object - save to db
    if (validatedAnime != null) {
        newlyInsertedAnime = await animeRepository.createAnime(validatedAnime);
    } else {
        // Product data failed validation
        newlyInsertedAnime = {"error": "invalid anime"};

        // log the result
        console.log("animeService.createAnime(): form data validate failed");
    }
    return newlyInsertedAnime;
};
    
let updateAnime = async (anime) => {
        // declare variables
        let updatedAnime

        // Call the product validator - kept seperate to avoid clutter here
        let validatedAnime = animeValidator.validateUpdateAnime(anime)
        // If validation returned a product object - save to db
        if (validatedAnime != null) {
            updatedAnime = await animeRepository.updateAnime(validatedAnime);
        } else {
            // Product data failed validation
            updatedAnime = {"error": "invalid anime"};
    
            // log the result
            console.log("animeService.updateAnime(): form data validate failed");
        }
        return updatedAnime;
};

let deleteAnime = async (id) => {   
    let deleteAnime = false;

    // Validate input - important as a bad input could crash the server or lead to an attack
    // appending + '' to numbers as the validator only works with strings
    if (!animeValidator.validateId(id)) {
        console.log("deleteAnime service error: invalid id parameter");
        return false;
    }

    // delete product by id
    // result: true or false
    deleteAnime = await animeRepository.deleteAnime(id);

    return deleteAnime;
};
    
// Module exports

module.exports = {
    getAnimes,
    getAnimeById,
    getAnimeByCatId,
    createAnime,
    updateAnime,
    deleteAnime
};