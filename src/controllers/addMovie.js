
const addMovieController = (req, res) => {

    //extracting payload from the body
    const {movie_name, info, rating} = req.body;

    //validating the payload
    // try {

    // }catch(err){

    // }

    if(!movie_name){
        res.status(400).json({
           status :  "failed",
           message : "Movie name is required"
        });

        return;
    }

    if(!info){
        res.status(400).json({
           status :  "failed",
           message : "Info is required"
        });

        return;
    }

    if(rating < 1 || rating > 10 ){
        res.status(400).json({
           status :  "failed",
           message : "Rating must be between 1-10"
        });

        return;
    }
 
 
    //return a response to the client.
    res.status(200).json({
        status : "success",
        message : "Movie Added Successfully"
    });
}

module.exports = {
    addMovieController,
}