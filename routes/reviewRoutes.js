const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Add a review to a book (book id in URL param)
router.post('/:id/reviews', reviewController.addReview);

// Update a review by review id
router.put('/reviews/:id', reviewController.updateReview);

// Delete a review by review id
router.delete('/reviews/:id', reviewController.deleteReview);

module.exports = router;
