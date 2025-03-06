
const addMovieController = (req, res) => {
    res.status(200).json({
        message : "This is add movie to route"
    });
}

module.exports = {
    addMovieController,
}