// require the database connection
const animeRepository = require('../repositories/animeRepository.js');

const animeValidator = require('../validators/animeValidators.js')

// Input validation package
const validator = require('validator');

// Get all animes via the repository
// return animes
let getAnimes = async () => {
    let animes = await animeRepository.getAnimes();
    return animes;
};
    
// Get anime by id via the repository
// Validate input
// return anime

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

// Get animes in a category via the repository
// Validate input
// return animes
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

    // Call the anime validator - kept seperate to avoid clutter here
    let validatedAnime = animeValidator.validateNewAnime(anime)

    // If validation returned a anime object - save to db
    if (validatedAnime != null) {
        newlyInsertedAnime = await animeRepository.createAnime(validatedAnime);
    } else {
        // anime data failed validation
        newlyInsertedAnime = {"error": "invalid anime"};

        // log the result
        console.log("animeService.createAnime(): form data validate failed");
    }
    return newlyInsertedAnime;
};
    
let updateAnime = async (anime) => {
        // declare variables
        let updatedAnime

        // Call the anime validator - kept seperate to avoid clutter here
        let validatedAnime = animeValidator.validateUpdateAnime(anime)
        // If validation returned a anime object - save to db
        if (validatedAnime != null) {
            updatedAnime = await animeRepository.updateAnime(validatedAnime);
        } else {
            // anime data failed validation
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

    // delete anime by id
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