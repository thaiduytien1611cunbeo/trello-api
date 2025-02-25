import { StatusCodes } from 'http-status-codes'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
import ApiError from '~/utils/ApiError'

const createNew = async reqBody => {
  try {
    const newColumn = {
      ...reqBody
    }
    const createdColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    if (getNewColumn) {
      //xử lý lại cấu trúc data ở đây trước khi tả dữ liệu về
      getNewColumn.cards = []

      // Cập nhật mảng columnOrderIds trong collection boards
      await boardModel.pushColumnOrderIds(getNewColumn)
    }

    return getNewColumn
  } catch (error) {
    console.log(error)
  }
}

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updateAt: Date.now()
    }
    const updatedColumn = await columnModel.update(columnId, updateData)
    return updatedColumn
  } catch (error) {
    console.log(error)
  }
}

const deleteItem = async columnId => {
  try {
    // Từ columnId tìm ra column trong DB
    const targetColumn = await columnModel.findOneById(columnId)
    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Column not Found')
    }

    // Delete Column
    await columnModel.deleteOneById(columnId)
    //Delete all Card
    await cardModel.deleteManyByColumnId(columnId)

    // Xóa columnId trong mảng columnOrderIds của Board chứa nó
    await boardModel.pullColumnOrderIds(targetColumn)
    return { deleteResult: 'Columns and its Cards deleted successfully' }
  } catch (error) {
    console.log(error)
  }
}

export const columnService = {
  createNew,
  update,
  deleteItem
}
