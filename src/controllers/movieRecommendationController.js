const OpenAI = require("openai");

//used GROQ then integrated open
const movieRecommendationController = async (req, res) => {
    const client = new OpenAI({
        apiKey: process.env["GROQ_API_KEY"],
        baseURL: "https://api.groq.com/openai/v1"
    });

    try {
        const response = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: 'user', content: 'i have feeling for this lady, how do i express my feeling to her?' }
            ],
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
