import express from 'express'
const Router = express.Router()
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from './boardRoute'
import { columnRoute } from './columnRoute'
import { cardRoute } from './cardRoute'

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ status: 'api V1 are already to use' })
})
Router.use('/boards', boardRoute)

Router.use('/columns', columnRoute)

Router.use('/cards', cardRoute)

export const APIs_V1 = Router
