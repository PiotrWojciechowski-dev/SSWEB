const router = require('express').Router();

const animeService = require('../services/animeService.js');

// Auth0
const { authConfig, checkJwt, checkAuth } = require('../middleware/jwAuth.js');

// check auth for all routes in this controller
//router.use(checkJwt);

// GET listing of all animes
// Address http://server:port/anime
// returns JSON
router.get('/', async (req, res) => {
    let result;
    // Get animes
    try {
        result = await animeService.getAnimes();
        res.json(result);
    // Catch and send errors
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});
    
// GET a single anime by id
// id passed as parameter via url
// Address http://server:port/anime/:id
// returns JSON
router.get('/:id', async (req, res) => {
    let result;
    // read value of id parameter from the request url
    const animeId = req.params.id;
    // If validation passed execute query and return results
    // returns a single anime with matching id
    try {
        // Send response with JSON result
        result = await animeService.getAnimeById(animeId);
        res.json(result);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

// GET animes by category id
// id passed as parameter via url
// Address http://server:port/anime/:id
// returns JSON
router.get('/bycat/:id', async (req, res) => {
    let result;
    // read value of id parameter from the request url
    const categoryId = req.params.id;

    // If validation passed execute query and return results
    // returns a single anime with matching id
    try {
        // Send response with JSON result
        result = await animeService.getAnimeByCatId(categoryId);
        res.json(result);
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
});

//These functions need to be fully implemented
// POST - Insert a new anime.
// This async function sends a HTTP post request
router.post('/', checkJwt, checkAuth([authConfig.create]), async (req, res) => {

    // the request body contains the new anime values - copy it
    let newAnime = req.body;

    // show what was copied in the console (server side)
    console.log("anime: ", newAnime);

    // Pass the new anime data to the service and await the result
    try {
        // Send response with JSON result
        result = await animeService.createAnime(newAnime);

        // Send a json response back to the client
        res.json(result)

        // Handle server (status 500) erros
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
});
    
// PUT update anime
// Like post but animeId is provided and method = put
router.put('/', checkJwt, checkAuth([authConfig.update]), async (req, res) => {

    let result;

    // the request body contains the new anime values - copy it
    const anime = req.body;

    // show what was copied in the console (server side)
    console.log("anime update: ", anime);

    // Pass the new anime data to the service and await the result
    try {
        // Send response with JSON result    
        result = await animeService.updateAnime(anime);

        // send a json response back to the client
        res.json(result);

        // handle server (status 500) errors
        } catch (err) {
            res.status(500)
            res.send(err.message)
        }
});
    
// DELETE single anime.
router.delete('/:id', checkJwt, checkAuth([authConfig.delete]), async (req, res) => {

    let result;
    // read value of id parameter from the request url
    const animeId = req.params.id;
    // If validation passed execute query and return results
    // returns a single anime with matching id
    try {
        // Send response with JSON result    
        result = await animeService.deleteAnime(animeId);
        res.json(result);

    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});
    
// Export as a module
module.exports = router;