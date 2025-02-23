<<<<<<< HEAD
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
=======
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatters'

const createNew = async reqBody => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Gọi tới model thêm newBoard vào database
    const createdBoard = await boardModel.createNew(newBoard)

    // Lấy bản ghi board vừa tạo
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    return getNewBoard
  } catch (error) {
    console.log(error)
  }
}

const getDetails = async boardId => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }

    // Vì data mà mongodb trả về đang không đúng với fronEnd mong muốn nên phải xử lý lạilại
    const resBoard = cloneDeep(board)
    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })
    delete resBoard.cards

    return resBoard
  } catch (error) {
    console.log(error)
  }
}

const update = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updateAt: Date.now()
    }
    const updatedBoard = await boardModel.update(boardId, updateData)
    return updatedBoard
  } catch (error) {
    console.log(error)
  }
}

export const boardService = {
  createNew,
  getDetails,
  update
}
>>>>>>> 7a8944e (update api column and card)
