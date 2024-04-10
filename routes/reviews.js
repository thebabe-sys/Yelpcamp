const express = require('express');
const router = express.Router({ mergeParams: true});
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js');

const Review = require('../models/review.js');
const Campground = require('../models/campground'); 
const reviews = require('../controllers/reviews.js');



const expressError = require('../utilities/expressError');
const catchAsync = require('../utilities/catchAsync');



router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;