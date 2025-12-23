import pg from "pg";
import dotenv from "dotenv";
const { KP_PG_HOST, KP_PG_PORT, KP_PG_USERNAME, KP_PG_PASSWORD, KP_PG_DATABASE } = process.env;


dotenv.config();


export const pool = new pg.Pool({
  host: process.env.KP_PG_HOST || "localhost",
  port: Number(process.env.KP_PG_PORT) || 5433,
  user: process.env.KP_PG_USERNAME || "postgres",
  password: process.env.KP_PG_PASSWORD || "rubs123", // already a string
  database: process.env.KP_PG_DATABASE || "KatevaPalvelut",
});


pool.connect()
  .then(() => console.log("Connected to PostgreSQL", process.env.KP_PG_DATABASE))
  .catch((error: any) => {
    console.error("Database connectionnnn error:", error);
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
