"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import packages required by the app
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
// Start new instance of express
const app = (0, express_1.default)();
// Packges used by app
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Port number declaration
const port = 3001;
// Create connection with the database
const openDB = () => {
    const pool = new pg_1.Pool({
        user: "postgres",
        host: "localhost",
        database: "todo",
        password: "1234",
        port: 5432
        // user: "root",
        // host: "dpg-cggp5tu4daddcg550ivg-a.frankfurt-postgres.render.com",
        // database: "todo_aiux",
        // password: "Dp7lxWkQlr9Z1PXdojZIyuf8Q1Br3d57",
        // port: 5432,
        // ssl: true
    });
    return pool;
};
app
    .get("/", (req, res) => {
    let pool = openDB();
    pool.query("select * from task", (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json(result.rows);
    });
})
    .post("/new", (req, res) => {
    let pool = openDB();
    pool.query("insert into task (description) values ($1) returning *", [req.body.description], (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: result.rows[0].id });
    });
})
    .delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pool = openDB();
    let id = parseInt(req.params.id);
    pool.query("delete from task where id = $1", [id], (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: id });
    });
}))
    .put("/update/:id", (req, res) => {
    let pool = openDB();
    let id = req.params.id;
    let description = req.body.description;
    pool.query("update task set description = $1 where id= $2 returning *", [description, id], (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: result.rows[0].id });
    });
})
    .put("/update-status/:id", (req, res) => {
    let pool = openDB();
    let id = req.params.id;
    let completed = req.body.completed;
    pool.query("update task set completed = $1 where id= $2 returning *", [completed, id], (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: result.rows[0].id });
    });
});
// Port listening
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
