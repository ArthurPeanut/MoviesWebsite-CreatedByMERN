import ReviewsDAO from '../dao/reviewsDAO.js'

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const movieId = req.body.movie_id
            const review = req.body.review
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id,
                email: req.body.email,
            }

            const date = new Date()

            const ReviewResponse = await ReviewsDAO.addReview(
                movieId,
                userInfo,
                review,
                date
            )
            res.json({ status:"success"})
        } catch(e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review_id
            const review = req.body.review

            const date = new Date()

            const ReviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.name,
                review,
                date
            )

            var { error } = ReviewResponse
            if (error) {
                res.status.json({error})
            }
            if (ReviewResponse.modifiedCount === 0) {
                throw new Error("Unable to update review. User may not be original poster")
            }

            res.json({ status: "success"})
        } catch(e) {
            res.status(500).json({ error: e.message})
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            // const reviewId = req.body.review_id
            // const username = req.body.name
            // const ReviewResponse = await ReviewsDAO.deleteReview(
            //     reviewId,
            //     username,
            // )

            // res.json({status:ReviewResponse})

            const reviewId = req.body.review_id;
            const username = req.body.name;

            if (!reviewId || !username) {
                return res.status(400).json({ error: "Review ID and username are required." });
            }

            const ReviewResponse = await ReviewsDAO.deleteReview(reviewId, username);

            if (ReviewResponse.deletedCount === 0) {
                throw new Error("Unable to delete review. Review not found or user mismatch.");
            }

            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({error:e.message})
        }
    }
}