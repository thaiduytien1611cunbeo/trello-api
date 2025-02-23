<<<<<<< HEAD
import { StatusCodes } from "http-status-codes";
import { boardService } from "~/services/boardService";
=======
import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'
>>>>>>> 7a8944e (update api column and card)

const createNew = async (req, res, next) => {
  try {
    //Gọi Service để xử lý logic nghiệp vụ
<<<<<<< HEAD
    const createdBoard = await boardService.createNew(req.body);

    // Trả về kết quả nhận được từ Service
    res.status(StatusCodes.CREATED).json(createdBoard);
  } catch (error) {
    next(error);
  }
};

const getList = async (req, res, next) => {
  try {
    const listBoard = await boardService.getList();

    res.status(StatusCodes.CREATED).json(listBoard);
  } catch (error) {
    next(error);
  }
};

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const board = await boardService.getDetails(boardId);

    res.status(StatusCodes.OK).json(board);
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew,
  getList,
  getDetails,
};
=======
    const createdBoard = await boardService.createNew(req.body)

    // Trả về kết quả nhận được từ Service
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const board = await boardService.getDetails(boardId)

    res.status(StatusCodes.OK).json(board)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const updatedBoard = await boardService.update(boardId, req.body)

    res.status(StatusCodes.OK).json(updatedBoard)
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew,
  getDetails,
  update
}
>>>>>>> 7a8944e (update api column and card)
