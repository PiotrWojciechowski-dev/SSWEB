// Import router package 
const router = require('express').Router(); 

// Input validation package
// https://www.npmjs.com/package/validator
const validator = require('validator');

/* Hand get requests for '/' 
/* this is the index or home page 
*/ 
router.get('/', (req, res) => { 
    // set content type of response body in the headers 
    res.setHeader('Content-Type', 'application/json'); 

    // Send a JSON response - this app will be a web api so no need to send HTML 
    res.json({content: 'Hello, this is the default root'}); 
}); 

// Calculator
// Accepts two parameters via the url querystring
// example: http://localhost:8000/calc?a=3&b=2

router.get('/stone', function (req, res) {

    let stone = ""

    // Validate input - important as a bad input could crash the server or lead to an attack
    // check the perms exist, if they do assign their values to the variables
    if (typeof req.query.a != "undefined") {
        stone = req.query.a;
    }

    //if (typeof req.query.pounds != "undefined") {
    //    pounds = req.query.pounds;
    //}
    // See link to validator npm package (at top) for doc.
    // If validation fails return an error message
    if (!validator.isNumeric(stone, { no_symbols: true })) {
        res.statusMessage = "Bad Request";
        res.status(400).end();
        return false;
    }

    const convertSone = {
        a: Number(stone),
        answer: answer
    };

    res.json(convertSone)

});

// export 
module.exports = router; 