import MoviesDAO from "../dao/moviesDAO.js";

export default class MoviesController {

    static async apiGetMovies(req, res, next) {
        console.log("Query Parameters:", req.query);

        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20
        const page = req.query.page ? parseInt(req.query.page) : 0

        console.log("movies per page: ", moviesPerPage)
        console.log("pages: ", page)

        let filters = {}
        if (req.query.rated){
            filters.rated = req.query.rated
        } else if (req.query.title) {
            console.log("filtered by title")
            filters.title =req.query.title
        }

        const {moviesList, totalNumMovies} = await MoviesDAO.getMovies({filters, page, moviesPerPage})

        console.log("Total num:", totalNumMovies)

        let response = {
            movies: moviesList,
            page: page,
            filter: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        }
        res.json(response)
    }
}