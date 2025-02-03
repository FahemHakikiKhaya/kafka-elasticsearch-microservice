import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "../config";

export const DB = drizzle(DATABASE_URL!);
