import { Pool } from "pg";
import { DATABASE_URL } from "./src/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

async function runMigration() {
  try {
    console.log("migration start...");
    const pool = new Pool({ connectionString: DATABASE_URL });
    const db = drizzle(pool);
    await migrate(db, { migrationsFolder: "./src/db/migration" });
    console.log("migration was successful!");
    pool.end();
  } catch (error) {
    console.log("migration error", error);
  }
}

runMigration();
