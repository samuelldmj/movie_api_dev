
const movieModel = require("../models/movie.model");
 //extracting payload from the body
const addMovieController = async (req, res) => {
    const { movie_name, info, description, rating } = req.body;

    // Validating the payload
    if (!movie_name || !info || rating < 1 || rating > 10) {
        return res.status(400).json({
            status: "failed",
            message: "Invalid input: Movie name, info, and rating (1-10) are required."
        });
    }

    try {
        const createdMovie = await movieModel.create({
            movie_name,
            info,
            description : description,
            rating
        });

        if (!createdMovie) {
            throw new Error("Movie creation failed. Something went wrong.");
        }

        //return a response to the client.
        res.status(201).json({
            status: "success",
            message: "Movie Added Successfully"
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message || "An error occurred while adding the movie."
        });
    }
};

module.exports = {
    addMovieController,
};


