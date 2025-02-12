import express from "express";
const Router = express.Router();
import { StatusCodes } from "http-status-codes";
import { boardRoute } from "./boardRoute";

Router.get("/status", (req, res) => {
  res.status(StatusCodes.OK).json({ status: "api V1 are already to use" });
});
Router.use("/boards", boardRoute);

export const APIs_V1 = Router;
