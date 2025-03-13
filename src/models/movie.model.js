const { Mongoose, default: mongoose } = require("mongoose");

const moviesSchema = new mongoose.Schema({
        movie_name : {
            type : String,
            required : [true, "Movie name is required"]
        },
        info : {
            type : String
        },
        description : {
            type : String
        },
        rating : {
            type : Number,
            required : true,
            min : 1,
            max : 10
        }
});


const movieModel = mongoose.model('Movies', moviesSchema);

module.exports = movieModel


/*
if you want to see the error that your schema is throwing use e params passed into your catch block
in your controller or wherever you are using the model
with e.message to see it.

to create a custom error message use required : [true, "custom message"]

*/