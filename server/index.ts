// Import packages required by the app
import express , { Express } from "express"
import cors from "cors"
import router from "./routes";

// Start new instance of express
const app: Express = express();

// Packges used by app
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// Port number declaration
const port: number = 3001;

// Use the router module for all routes starting with "/"
app.use("/", router)

// Port listening
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});