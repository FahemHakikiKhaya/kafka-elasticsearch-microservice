import dotenv from "dotenv";
dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL;
export const APP_PORT = process.env.APP_PORT;
export const CATALOG_SERVICE_BASE_URL = process.env.CATALOG_SERVICE_BASE_URL;
export const USER_SERVICE_BASE_URL = process.env.USER_SERVICE_BASE_URL;
