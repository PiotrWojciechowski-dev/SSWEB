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

router.get('/calc', function (req, res) {

    let numA = ""
    let numB = ""
    let operator = ""

    // Validate input - important as a bad input could crash the server or lead to an attack
    // check the perms exist, if they do assign their values to the variables
    if (typeof req.query.a != "undefined") {
        numA = req.query.a;
    }

    if (typeof req.query.b != "undefined") {
        numB = req.query.b;
    }
    if (typeof req.query.op != "undefined") {
        operator = req.query.op
    }
    // See link to validator npm package (at top) for doc.
    // If validation fails return an error message
    if (!validator.isNumeric(numA, { no_symbols: true }) || !validator.isNumeric(numB, { no_symbols: true})) {
        res.statusMessage = "Bad Request";
        res.status(400).end();
        return false;
    }
    if (operator == "add") {
        // Not parameters are passed as strings to convert to numbers
        let answer = Number(numA) + Number(numB)
        // Send a JSON response - this app will be a web api so no need to send HTML
        res.json({answer: `${numA} + ${numB} = ${answer}`});
    }
    if (operator == "subtract") {
        // Not parameters are passed as strings to convert to numbers
        let answer = Number(numA) - Number(numB)
        // Send a JSON response - this app will be a web api so no need to send HTML
        res.json({answer: `${numA} - ${numB} = ${answer}`});
    }
    if (operator == "multiply") {
        // Not parameters are passed as strings to convert to numbers
        let answer = Number(numA) * Number(numB)
        // Send a JSON response - this app will be a web api so no need to send HTML
        res.json({answer: `${numA} * ${numB} = ${answer}`});
    }
    if (operator == "divide") {
        // Not parameters are passed as strings to convert to numbers
        let answer = Number(numA) / Number(numB)
        // Send a JSON response - this app will be a web api so no need to send HTML
        res.json({answer: `${numA} / ${numB} = ${answer}`});
    }
});

// export 
module.exports = router; 