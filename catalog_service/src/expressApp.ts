import express from "express";
import catelogRouter from "./api/catelog.routes";
import { httpLogger, HandleErrorWithLogger } from "./utils";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(httpLogger);

app.use("/", catelogRouter);

app.use(HandleErrorWithLogger);

export default app;
