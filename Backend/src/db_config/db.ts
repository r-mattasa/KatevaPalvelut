import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for most cloud DBs like Supabase
  },
});


pool.connect()
  .then(() => console.log("Connected to PostgreSQL", process.env.KP_PG_DATABASE))
  .catch((error: any) => {
    console.error("Database connection error:", error);
    // Some runtimes or TypeScript lib settings may not have AggregateError typed; detect aggregate-like shape safely
    const innerErrors = error && (error as any).errors;
    if (Array.isArray(innerErrors)) {
      for (const e of innerErrors) {
        console.error("  → Inner error:", e && e.message ? e.message : e);
      }
    }
  });


export const executeQuery = async (query: string, parameters?: Array<any>) => {
  const client = await pool.connect();
  try {

    const result = await client.query(query, parameters);
    return result;
  } catch (error: any) {
    console.error(error.stack);
    error.name = "dbError";
    throw error;
  } finally {
    client.release();
  }
};
