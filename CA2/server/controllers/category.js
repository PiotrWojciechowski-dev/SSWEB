const router = require('express').Router();

const categoryService = require('../services/categoryService.js');


// GET listing of all categories
// Address http://server:port/category
// returns JSON
router.get('/', async (req, res) => {
    let result;
    // Get products
    try {
        result = await categoryService.getCategories();
        res.json(result);
    // Catch and send errors
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

// GET a single category by id
// id passed as parameter via url
// Address http://server:port/category/:id
// returns JSON
router.get('/:id', async (req, res) => {
    let result;
    // read value of id parameter from the request url
    const categoryId = req.params.id;
    // If validation passed execute query and return results
    // returns a single product with matching id
    try {
        // Send response with JSON result
        result = await categoryService.getCategoryById(categoryId);
        res.json(result);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

//These functions need to be fully implemented
// POST - Insert a new category.
// This async function sends a HTTP post request
router.post('/', async (req, res) => {
    let newCategory = req.body;
    res.json(newCategory)
});
    
// PUT update category
// Like post but categoryId is provided and method = put
router.put('/:id', async (req, res) => {
    const categoryId = req.params.id;
    res.json(`This will update category with id = ${categoryId}`);
});
    
// DELETE single task.
router.delete('/:id', async (req, res) => {
    const categoryId = req.params.id;
    res.json(`This will delete category with id = ${categoryId}`);
});
    
// Export as a module
module.exports = router;