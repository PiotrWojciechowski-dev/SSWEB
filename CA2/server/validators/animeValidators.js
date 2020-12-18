// Input validation package
// https://www.npmjs.com/package/validator

const validator = require('validator');

// models
const Anime = require('../models/anime.js');

// Validate the body data, sent by the client, for a new anime
// formAnime represents the data filled in a form
// It needs to be validated before using in the application

let validateNewAnime = (formAnime) => {
    // Declare constants and variables
    let validatedAnime;

    // debug to console - if no data
    if (formAnime === null) {
        console.log("validateNewAnime(): Parameter is null");
    }

    // Validate form data for new anime fields
    // Creating an anime does not need a anime id
    // Adding '' to the numeric values makes them strings for validation purposes ()
    if (
        validator.isNumeric(formAnime.CategoryId + '', {no_symbols: true, allow_negatives: false}) &&
        !validator.isEmpty(formAnime.AnimeName) &&
        !validator.isEmpty(formAnime.AnimeDescription) &&
        validator.isNumeric(formAnime.AnimeStock + '', {no_symbols: true, allow_negatives: false}) &&
        validator.isCurrency(formAnime.AnimePrice + '',{no_symbols: true, allow_negatives: false})
    ) {
        // Validation passed
        // create a new anime instance based on Anime model object
        // no value for Anime id (passed as null)
        validatedAnime = new Anime(
            null,
            formAnime.CategoryId,
            // escape is to sanitize - it removes/ encondes any html tags
            validator.escape(formAnime.AnimeName),
            validator.escape(formAnime.AnimeDescription),
            formAnime.AnimeStock,
            formAnime.AnimePrice
        );
    } else {
        // debug
        console.log("validateNewAnime(): Validation failed");
    }
    // return new validated product object
    return validatedAnime;
}

let validateUpdateAnime = (formAnime) => {
    // Declare constants and variables
    let validatedAnime;

    // debug to console - if no data
    if (formAnime === null) {
        console.log("validateUpdateAnime(): Parameter is null");
    }

    // Validate form data for new anime fields
    // Updating a anime does need a product id
    // Adding '' to the numeric values makes them strings for validation purposes ()
    if (
        validator.isNumeric(formAnime.AnimeId + '', {no_symbols: true, allow_negatives: false}) &&
        validator.isNumeric(formAnime.CategoryId + '', {no_symbols: true, allow_negatives: false}) &&
        !validator.isEmpty(formAnime.AnimeName) &&
        !validator.isEmpty(formAnime.AnimeDescription) &&
        validator.isNumeric(formAnime.AnimeStock + '', {no_symbols: true, allow_negatives: false}) &&
        validator.isCurrency(formAnime.AnimePrice + '',{no_symbols: true, allow_negatives: false})
    ) {
        // Validation passed
        // create a new Product instance based on Product model object
        validatedAnime = new Anime(
            formAnime.AnimeId,
            formAnime.CategoryId,
            // escape is to sanitize - it removes/ encondes any html tags
            validator.escape(formAnime.AnimeName),
            validator.escape(formAnime.AnimeDescription),
            formAnime.AnimeStock,
            formAnime.AnimePrice
        );
    } else {
        // debug
        console.log("validateUpdateAnime(): Validation failed");
    }
    // return new validated product object
    return validatedAnime;
}

// Validate id field
let validateId = (id) => {

    if (validator.isNumeric(id + '', { no_symbols: true, allow_negatives: false })) {
        return true;
    }
    else {
        console.log("Anime validator: invalid id parameter");
    }
    
    return false;
}

// Module exports
// expose these functions
module.exports = {
    validateNewAnime,
    validateUpdateAnime,
    validateId
}