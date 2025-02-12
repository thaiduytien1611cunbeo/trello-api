import { StatusCodes } from "http-status-codes";
import { boardService } from "~/services/boardService";

const createNew = async (req, res, next) => {
  try {
    //Gọi Service để xử lý logic nghiệp vụ
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
