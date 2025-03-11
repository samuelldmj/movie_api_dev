const movieModel = require("../models/movie.model");

const getAllMoviesController = async (req, res) => {
    try {
        // Retrieve all movies from the database
        const movieData = await movieModel.find({});

        // Return the movie data
        res.status(200).json({
            status: "success",
            message: "Movies retrieved successfully.",
            data: movieData
        });
    } catch (err) {
        // Handle any errors that occur during the database query
        res.status(500).json({
            status: "failed",
            message: "An error occurred while retrieving movies.",
            error: err.message 
        });
    }
};

module.exports = {
    getAllMoviesController
};
