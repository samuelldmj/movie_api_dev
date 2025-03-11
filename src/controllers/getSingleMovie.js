const movieModel = require("../models/movie.model");
const mongoose = require("mongoose");

const getSingleMovieController = async (req, res) => {
    // Retrieve id from request URL
    const idFromReqParams = req.params.movie_id;

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(idFromReqParams)) {
        return res.status(400).json({
            status: "failed",
            message: "Invalid movie ID format."
        });
    }

    try {
        // Find the movie by ID
        const movieData = await movieModel.findOne({ _id: idFromReqParams });

        // Check if the movie was found
        if (!movieData) {
            return res.status(404).json({
                status: "failed",
                message: "Movie not found."
            });
        }

        // Return the movie data
        res.status(200).json({
            status: "success",
            data: movieData
        });
    } catch (err) {
        // Handle any errors that occur during the database query
        res.status(500).json({
            status: "failed",
            message: "An error occurred while retrieving the movie.",
            error: err.message
        });
    }
};

module.exports = {
    getSingleMovieController
};
