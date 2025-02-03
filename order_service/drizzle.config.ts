import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "./src/config";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL as string,
  },
});
