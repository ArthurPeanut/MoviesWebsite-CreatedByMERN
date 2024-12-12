import express from 'express'

// Get access to express router
const router = express.Router()

// Every route in movies will start with /api/v1/movies, due to server.js
router.route('/').get((req, res) => res.send('hello world'))

export default router