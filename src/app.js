const express = require('express');
const morgan = require('morgan');
const { router } = require('./routes/route');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const app = express();

//Express does not return a json format by default
//so to get a json format we need to do the following below.
app.use(express.json());

//middleware
app.use(morgan('dev'));

//Route
app.use(router);

//connecting to db
mongoose.connect(process.env.MONGO_DB_CONNECTION)
    .then(() => {
        //-----------------
        console.log('Db Connected!!')
        //-----------------
        const port = 8000;
        const host = "localhost";
        app.listen(port, () => {
            console.log(`This server is running on http://${host}:${port}`);
        });
    })
    .catch(err => console.log(`Db Connection error: ${err.message}`));

    /*
    this line is required, because i want to dynamically create a db in my mongodb movie_api_dev connection.
    i have to first put the name of the db immediately after the forward slash and before the question mark.
    */
require("../src/models/movie.model");














