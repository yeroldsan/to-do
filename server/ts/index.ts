// Import packages required by the app
import express, { Express } from "express";
import cors from "cors";
import router from "./routes";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Start new instance of express
const app: Express = express();

// Port number declaration
const port = process.env.PORT || 3001;

// Middlewares used by app
app.use([cors(), express.json(), express.urlencoded({ extended: false })]);

// Use the router module for all routes starting with "/"
app.use("/", router);

// Port listening
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
