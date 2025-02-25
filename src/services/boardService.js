import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatters'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'

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

const moveCardToDifferentColumn = async reqBody => {
  try {
    // Khi di chuyển CARD sang column khác
    // B1 : xóa _id card ở column ban đầu
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updatedAt: Date.now()
    })
    // B2 : Update _id card ở column được kéo vào
    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updatedAt: Date.now()
    })
    // B3 : Cập nhật lại trường columnId ở trong card đó
    await cardModel.update(reqBody.currentCardId, { columnId: reqBody.nextColumnId })

    return { updateResult: 'Successfully' }
  } catch (error) {
    console.log(error)
  }
}

export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}
