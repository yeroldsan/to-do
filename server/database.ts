import {Pool} from "pg"

// Create connection with the database
const openDB = (): Pool => {
    const pool: Pool = new Pool ({
        // user: "postgres",
        // host: "localhost",
        // database: "todo",
        // password: "1234",
        // port: 5432
        user: "root",
        host: "dpg-cggp5tu4daddcg550ivg-a.frankfurt-postgres.render.com",
        database: "todo_aiux",
        password: "Dp7lxWkQlr9Z1PXdojZIyuf8Q1Br3d57",
        port: 5432,
        ssl: true
    })
    return pool
}

export default openDB