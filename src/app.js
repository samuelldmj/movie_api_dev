const express = require('express');
const morgan = require('morgan');
const { router } = require('./routes/route');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const app = express();

//middleware
app.use(morgan('dev'));

//Route
app.use(router);

//connecting to db
mongoose.connect(process.env.MONGO_DB_CLOUD)
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















