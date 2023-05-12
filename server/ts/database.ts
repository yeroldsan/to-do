// Import required package
import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Set up connection to the database
const openDB = (): Pool => {
    const pool: Pool = new Pool ({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
        ssl: process.env.DB_SSL === 'true',
    })
    return pool
}

/*
// Listen to the SIGINT and SIGTERM signals and close the database connection
process.on('SIGINT', () => {
    pool.end(() => {
      console.log('Database connection closed due to application termination');
      process.exit(0);
    });
  });
  
  process.on('SIGTERM', () => {
    pool.end(() => {
      console.log('Database connection closed due to application termination');
      process.exit(0);
    });
  });
*/

// Connect to the database
export const pool = openDB();


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
