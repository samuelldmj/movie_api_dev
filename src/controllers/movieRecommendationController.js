const mongoose = require("mongoose");
const movieModel = require("../models/movie.model");
const OpenAI = require("openai");

//used GROQ then integrated open
//be carefull to use the api call, you have less than $5 credit to spend
const movieRecommendationController = async (req, res) => {
    try {

        const allMovies = await movieModel.find({});
        // console.log(allMovies);
        let movieNamesString = allMovies.map(movieName => movieName.movie_name).join(", ");
        // console.log(movieNamesString);

        const prompt = `I need a movie recommendation based on these movies:
     ${movieNamesString} provide me with 10 suggestions. separate movies with commas`;


        const client = new OpenAI({
            apiKey: process.env["GROQ_API_KEY"],
            baseURL: "https://api.groq.com/openai/v1"
        });



        const response = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: 'user', content: prompt }
            ],
            max_tokens: 100
        });

        // console.log(response.choices[0].message.content); // Log the response text

        return res.status(200).json({
            status: "Success",
            message: response.choices[0].message.content // Send the OpenAI response back
        });
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        return res.status(500).json({
            status: "Error",
            message: "Failed to get response from OpenAI"
        });
    }
};

module.exports = {
    movieRecommendationController
};



//Todo not working
/*
====================================================================================
                                                    REFACTORED CODE 
=========================================================================
*/


// const mongoose = require("mongoose");
// const movieModel = require("../models/movie.model");
// const OpenAI = require("openai");

// // Constants
// let GROQ_API_KEY = process.env["GROQ_API_KEY"];
// const GROQ_API_BASE_URL = "https://api.groq.com/openai/v1";
// const MODEL_NAME = "llama-3.3-70b-versatile";
// const MAX_TOKENS = 100;

// /**
//  * Fetches all movies from the database.
//  * @returns {Promise<Array>} Array of movie documents.
//  */
// const fetchAllMovies = async () => {
//     try {
//         return await movieModel.find({});
//     } catch (error) {
//         console.error("Error fetching movies from database:", error);
//         throw new Error("Failed to fetch movies from database");
//     }
// };

// /**
//  * Generates a prompt for movie recommendations.
//  * @param {Array} movies Array of movie documents.
//  * @returns {string} Generated prompt.
//  */
// const generatePrompt = (movies) => {
//     if (!movies || movies.length === 0) {
//         throw new Error("No movies found in the database");
//     }

//     const movieNamesString = movies.map((movie) => movie.movie_name).join(", ");
//     return `I need a movie recommendation based on these movies: ${movieNamesString}. Provide me with 10 suggestions. Separate movies with commas.`;
// };

// /**
//  * Calls the Groq API to get movie recommendations.
//  * @param {string} prompt The prompt to send to the API.
//  * @returns {Promise<string>} The API response.
//  */
// const getGroqRecommendations = async (prompt) => {
//     const client = new OpenAI({
//         apiKey: GROQ_API_KEY,
//         baseURL: GROQ_API_BASE_URL,
//     });

//     try {
//         const response = await client.chat.completions.create({
//             model: MODEL_NAME,
//             messages: [{ role: "user", content: prompt }],
//             max_tokens: MAX_TOKENS,
//         });

//         return response.choices[0].message.content;
//     } catch (error) {
//         console.error("Error calling Groq API:", error);
//         throw new Error("Failed to get response from Groq API");
//     }
// };

// /**
//  * Controller for handling movie recommendations.
//  */
// const movieRecommendationController = async (req, res) => {
//     try {
//         // Fetch all movies from the database
//         const allMovies = await fetchAllMovies();

//         // Generate the prompt for the Groq API
//         const prompt = generatePrompt(allMovies);

//         // Get recommendations from the Groq API
//         const recommendations = await getGroqRecommendations(prompt);

//         // Send the response
//         return res.status(200).json({
//             status: "Success",
//             message: recommendations,
//         });
//     } catch (error) {
//         console.error("Error in movieRecommendationController:", error.message);
//         return res.status(500).json({
//             status: "Error",
//             message: error.message || "Internal server error",
//         });
//     }
// };

// module.exports = {
//     movieRecommendationController,
// };