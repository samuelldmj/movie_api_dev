
const express = require('express');
const { addMovieController } = require('../controllers/addMovie');

const router = express.Router();

router.get('/', (_, res) =>{
    res.send(`Hello from routes`);
});

router.get('/api', (_, res) =>{
    res.send(`Hello from routes with api`);
});


router.post('/api/movies', addMovieController);

module.exports = {
    router
}