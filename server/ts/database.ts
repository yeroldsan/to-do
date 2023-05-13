// Import required package
import { Pool, PoolClient, QueryResult } from "pg";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Set up connection to the database
// const openDB = (): Pool => {
  const pool: Pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    ssl: process.env.DB_SSL === 'true',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })
//   return pool
// }

// Class example, adapted!
export const queryWithClient = async (sql:string, values?: any[]): Promise<any> => {
  // const pool = openDB()
  // check out a single client
  const client: PoolClient = await pool.connect()
  try {
    const result: QueryResult = await pool.query(sql,values)
    return result
}
  catch (error: any) {
    console.error(error.message);
  } finally {
    // release the client
    await client.release()
  }
}
