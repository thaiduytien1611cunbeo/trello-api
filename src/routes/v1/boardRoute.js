import express from "express";
const Router = express.Router();
import { boardValidation } from "~/validations/boardValidation";
import { boardController } from "~/controllers/boardController";

Router.route("/")
  .get(boardController.getList)
  .post(boardValidation.createNew, boardController.createNew);

Router.route("/:id").get(boardController.getDetails).put();

export const boardRoute = Router;
