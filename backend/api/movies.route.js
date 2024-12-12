import express from 'express'
import MoviesController from './movies.controller.js'

// Get access to express router
const router = express.Router()

// Every route in movies will start with /api/v1/movies, due to server.js
router.route('/').get(MoviesController.apiGetMovies)

export default router