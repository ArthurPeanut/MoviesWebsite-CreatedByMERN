let movies

export default class MoviesDAO {
    static async injectDB(conn) {
        if (movies) {
            return
        }

        try {
            // Connect the database named MOVIEREVIEWS_NS
            movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection('movies')
        }
        catch(e) {
            console.error('unable to connect in MoviesDAO:${e}')
        }
    }

    static async getMovies({
        filters = null,
        page = 0,
        moviesPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("title" in filters) {
                console.log("search by titles")
                // query = { $text:{ $search: filters['title']}}
                query = { title: { $regex: filters['title'], $options: "i" } }; // Case-insensitive partial match
            } else if ("rated" in filters) {
                query = { "rated": {$eq:filters['rated']}}
            }
        }

        let cursor
        try {
            // cursor fetches documents in batches, reducing memory consumption and bandwidth usage
            cursor = await movies
                .find(query)
                .limit(moviesPerPage)
                .skip(moviesPerPage * page)
            const moviesList = await cursor.toArray()
            const totalNumMovies = await movies.countDocuments(query)
            // console.log("return without error")
            // console.log("movies:", moviesList)
            return {moviesList, totalNumMovies}
        }
        catch (e) {
            console.error('Unable to issue find command, ${e}')
            return { moviesList:[], totalNumMovies:0 }
        }
    }
}