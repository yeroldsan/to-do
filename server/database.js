"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
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
exports.default = openDB;
