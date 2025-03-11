const mongoose = require("mongoose");
const movieModel = require("../models/movie.model");


const removeMovieController = async (req, res) => {
    // Retrieve id from request URL
    const movieIdFromParams = req.params.movie_id;

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(movieIdFromParams)) {
        return res.status(400).json({
            status: "failed",
            message: "Invalid movie ID format."
        });
    }


    try{
        const movieData = await movieModel.findByIdAndDelete(movieIdFromParams);

        // Check if the movie was found
        if (!movieData) {
            return res.status(404).json({
                status: "failed",
                message: "Movie not found."
            });
        }

        return res.status(204).send();
        
    }catch(err){
        console.error(err);
        return res.status(500).json({
            status : "failed",
            message: "An error occurred while remove this movie.",
            error: err.message
        })
    }
    
}

module.exports = {
    removeMovieController
}