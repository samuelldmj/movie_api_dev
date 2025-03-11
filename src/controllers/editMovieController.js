const movieModel = require("../models/movie.model");
const mongoose = require("mongoose");

const editMovieController = async (req, res) => {
    // Get the id
    const movieId = req.params.movie_id;

    // Extract data from the body
    const { movie_name, info, description, rating } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).json({
            status: "failed",
            message: "Invalid Movie ID format."
        });
    }

    try {
        // Fetch the movie from the database
        const movieData = await movieModel.findById(movieId);

        if (!movieData) {
            return res.status(404).json({
                status: "failed",
                message: "Movie not found."
            });
        }

        // Update the movie with the provided data
        const updatedMovie = await movieModel.findByIdAndUpdate(
            movieId,
            {
                movie_name: movie_name || movieData.movie_name,
                info: info || movieData.info,
                description: description || movieData.description,
                rating: rating || movieData.rating
            },
            { new: true } // Return the updated document
        );

        res.status(200).json({
            status: "success",
            data: updatedMovie
        });

    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: "An error occurred while updating the movie.",
            error: err.message
        });
    }
};

module.exports = {
    editMovieController
};
