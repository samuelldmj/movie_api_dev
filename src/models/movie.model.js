const { Mongoose, default: mongoose } = require("mongoose");

const moviesSchema = new mongoose.Schema({
        movie_name : {
            type : String
        },
        info : {
            type : String
        },
        rating : {
            type : Number
        }
});


const movieModel = mongoose.model('Movies', moviesSchema);

module.exports = movieModel