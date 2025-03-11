
const express = require('express');
const { addMovieController } = require('../controllers/addMovieController');
const { getAllMoviesController } = require('../controllers/getAllMoviesController');
const { getSingleMovieController } = require('../controllers/getSingleMovie');
const { editMovieController } = require('../controllers/editMovieController');
const { removeMovieController } = require('../controllers/removeMovieController');

const router = express.Router();

router.get('/', (_, res) =>{
    res.send(`Hello from routes`);
});

router.get('/api', (_, res) =>{
    res.send(`Hello from routes with api`);
});


router.post('/api/movies', addMovieController);
router.get('/api/movies', getAllMoviesController);
router.get('/api/movies/:movie_id', getSingleMovieController);
router.patch('/api/movies/:movie_id', editMovieController);
router.delete('/api/movies/:movie_id', removeMovieController);

module.exports = {
    router
}