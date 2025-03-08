import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "../config";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: DATABASE_URL,
});

export const DB: NodePgDatabase<typeof schema> = drizzle(pool, { schema });
