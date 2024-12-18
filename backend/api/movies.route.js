import express from 'express'
import MoviesController from './movies.controller.js'
import ReviewsController from './reviews.controller.js'

// Get access to express router
const router = express.Router()

// Every route in movies will start with /api/v1/movies, due to server.js
router.route('/').get(MoviesController.apiGetMovies)

router
    .route("/review")
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview)

export default router