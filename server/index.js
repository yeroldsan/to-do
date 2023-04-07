"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import packages required by the app
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
// Start new instance of express
const app = (0, express_1.default)();
// Packges used by app
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Port number declaration
const port = 3001;
// Use the router module for all routes starting with "/"
app.use("/", routes_1.default);
// Port listening
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
