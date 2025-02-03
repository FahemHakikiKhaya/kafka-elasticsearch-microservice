import express from "express";
import catelogRouter from "./api/catelog.routes";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.use("/", catelogRouter);

export default app;
