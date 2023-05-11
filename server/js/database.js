"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
// Import required package
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Set up connection to the database
const openDB = () => {
    const pool = new pg_1.Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
        ssl: process.env.DB_SSL === 'true',
    });
    return pool;
};
// Listen to the SIGINT and SIGTERM signals and close the database connection
process.on('SIGINT', () => {
    exports.pool.end(() => {
        console.log('Database connection closed due to application termination');
        process.exit(0);
    });
});
process.on('SIGTERM', () => {
    exports.pool.end(() => {
        console.log('Database connection closed due to application termination');
        process.exit(0);
    });
});
// Connect to the database
exports.pool = openDB();
// Class example!!!
// export const query = async (sql:string, values:Array<any> = []): Promise<any> => {
//  return new Promise(async (resolve, reject) => {
//     try {
//         const pool = openDB()
//         const result = await pool.query(sql,values)
//     }
//     catch (error: any) {
//         reject(error.message)
//     }
//  })   
// }
