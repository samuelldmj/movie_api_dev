
const addMovieController = (req, res) => {

    //extracting payload from the body
    const { movie_name, info, rating } = req.body;

    //validating the payload
    try {
        if (!movie_name) throw "Movie name is required"
        if (!info) throw "Info is required"
        if (rating < 1 || rating > 10) throw "Rating must be between 1-10"
    } catch (err) {

        res.status(400).json({
            status: "failed",
            message: err
        });

        return;
    }

    //return a response to the client.
    res.status(200).json({
        status: "success",
        message: "Movie Added Successfully"
    });
}

module.exports = {
    addMovieController,
}