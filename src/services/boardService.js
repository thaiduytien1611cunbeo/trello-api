import { StatusCodes } from "http-status-codes";
import { boardModel } from "~/models/boardModel";
import ApiError from "~/utils/ApiError";
import { slugify } from "~/utils/formatters";

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };

    // Gọi tới model thêm newBoard vào database
    const createdBoard = await boardModel.createNew(newBoard);

    // Lấy bản ghi board vừa tạo
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);

    return getNewBoard;
  } catch (error) {
    throw error;
  }
};
const getList = async (id) => {
  try {
    const listBoard = await boardModel.findAll();

    return listBoard;
  } catch (error) {
    throw error;
  }
};
const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId);
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Board not found");
    }

    return board;
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNew,
  getList,
  getDetails,
};
