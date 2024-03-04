// Import necessary modules
const express = require("express");
const app = express();
const cors = require("cors");

// Load environment variables from a .env file
require("dotenv").config();

// Set the port for the server to run on, using the environment variable or a default value
const port = process.env.PORT;

// Connect to the MongoDB database using Mongoose
require("./config/mongoose.config");

// Middleware for parsing JSON and URL-encoded data
app.use(express.json(), express.urlencoded({ extended: true }));

// Enable Cross-Origin Resource Sharing (CORS)
// app.use(cors());
app.use(cors({credentials: true, origin:"http://localhost:3000"}))



// Import and use the routes defined in the team.routes.js file
const AllMyStoreRoutes = require("./routes/store.routes");
AllMyStoreRoutes(app);

// Start the server and listen on the specified port
app.listen(port, () => console.log(`The server is all fired up on port: ${port}`));