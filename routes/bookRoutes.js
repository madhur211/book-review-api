const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Get all books with optional filters
router.get('/', bookController.getBooks);

// Create a new book (authenticated route)
router.post('/', bookController.createBook);

// Get a specific book by ID with reviews
router.get('/:id', bookController.getBookById);

// Search books
router.get('/search', bookController.searchBooks);

module.exports = router;
