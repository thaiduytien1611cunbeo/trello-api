<<<<<<< HEAD
import Joi from "joi";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";

// Define Collection (name & schema)
const COLUMN_COLLECTION_NAME = "columns";
const COLUMN_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),

  // Lưu ý các item trong mảng cardOrderIds là ObjectId nên cần thêm pattern cho chuẩn nhé.
  cardOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),

  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
});
=======
import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { ObjectId } from 'mongodb'

// Define Collection (name & schema)
const COLUMN_COLLECTION_NAME = 'columns'
const COLUMN_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),

  // Lưu ý các item trong mảng cardOrderIds là ObjectId nên cần thêm pattern cho chuẩn nhé.
  cardOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

// chỉ định những field không cho phép cập nhật
const INVALID_UPDATE_FIELDS = ['_id', 'boardId', 'createdAt']

const validate = async data => {
  return await COLUMN_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: true
  })
}

const createNew = async data => {
  try {
    const validData = await validate(data)
    const newColumnToAdd = {
      ...validData,
      boardId: new ObjectId(validData.boardId)
    }

    const createdColumn = await GET_DB().collection(COLUMN_COLLECTION_NAME).insertOne(newColumnToAdd)
    return createdColumn
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async id => {
  try {
    const res = await GET_DB()
      .collection(COLUMN_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id)
      })
    return res
  } catch (error) {
    throw new Error(error)
  }
}

// push 1 giá trị id vào cuối mảng cardOrderIds
const pushCardOrderIds = async card => {
  try {
    const result = await GET_DB()
      .collection(COLUMN_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(card.columnId) },
        { $push: { cardOrderIds: new ObjectId(card._id) } },
        { returnDocument: 'after' }
      )

    return result
  } catch (error) {
    console.log(error)
  }
}

const update = async (columnId, updateData) => {
  try {
    // lọc những field mà không cho phép cập nhật ra
    Object.keys(updateData).forEach(fieldName => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName)) delete updateData[fieldName]
    })

    const result = await GET_DB()
      .collection(COLUMN_COLLECTION_NAME)
      .findOneAndUpdate({ _id: new ObjectId(columnId) }, { $set: updateData }, { returnDocument: 'after' })

    return result
  } catch (error) {
    console.log(error)
  }
}
>>>>>>> 7a8944e (update api column and card)

export const columnModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
<<<<<<< HEAD
};
=======
  createNew,
  findOneById,
  pushCardOrderIds,
  update
}
>>>>>>> 7a8944e (update api column and card)
