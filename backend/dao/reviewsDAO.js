import mongodb from "mongodb"

// We need ObjectId to convert an id string to a MongoDB Object id
const ObjectId = mongodb.ObjectId

let reviews
export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return
        }

        try {
            reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('comments')
        } catch(e) {
            console.error('Unable to establish connection handle in reviewDAO:${e}')
        }
    }

    static async addReview(movieId, user, review, date) {
        try {
            const reviewDoc = {
                name: user.name,
                // email: user.email,
                date: date,
                text: review,
                movie_id: new ObjectId(movieId) // Convert movieId to a MongoDB object id
            }

            return await reviews.insertOne(reviewDoc) // insert into the reviews collection
        } catch(e) {
            console.error('Unable to post review:${e.message}')
            return {error:e}
        }
    }

    static async updateReview(reviewId, username, review, date) {
        try {
            const updateResponse = await reviews.updateOne(
                {name: username, _id: new ObjectId(reviewId)}, // filter for an existing review created by userId and with reviewId
                {$set: {text: review, date: date}} // update it if it exists
            )
            return updateResponse
        } catch(e) {
            console.error('Unable to update review:', e.message)
            return {error: e}
        }
    }

    static async deleteReview(reviewId, username) {
        try {
            console.log("Review Id: ", reviewId);
            const deleteResponse = await reviews.deleteOne({
                _id: new ObjectId(reviewId),
                // name: username,
            })
            return deleteResponse
        } catch(e) { 
            console.error('Unable to delete review:', e.message);
            return { error: e.message };
        }
    }
}