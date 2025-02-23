<<<<<<< HEAD
import express from "express";
const Router = express.Router();
import { boardValidation } from "~/validations/boardValidation";
import { boardController } from "~/controllers/boardController";

Router.route("/")
  .get(boardController.getList)
  .post(boardValidation.createNew, boardController.createNew);

Router.route("/:id").get(boardController.getDetails).put();

export const boardRoute = Router;
=======
import express from 'express'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET : API get list boards' })
  })
  .post(boardValidation.createNew, boardController.createNew)

Router.route('/:id').get(boardController.getDetails).put(boardValidation.update, boardController.update)

export const boardRoute = Router
>>>>>>> 7a8944e (update api column and card)
