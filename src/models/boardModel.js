<<<<<<< HEAD
import Joi, { date } from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";

//Define Collection
const BOARD_COLLECTION_NAME = "boards";
=======
import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { BOARD_TYPE } from '~/utils/constants'
import { columnModel } from './columnModel'
import { cardModel } from './cardModel'

//Define Collection
const BOARD_COLLECTION_NAME = 'boards'
>>>>>>> 7a8944e (update api column and card)
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(250).trim().strict(),
<<<<<<< HEAD

  columnOrderIds: Joi.array().items(Joi.string()).default([]),

  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
});

const validate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: true,
  });
};

const createNew = async (data) => {
  try {
    const validData = await validate(data);
    const createdBoard = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .insertOne(validData);
    return createdBoard;
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
=======
  type: Joi.string().valid(BOARD_TYPE.PUBLIC, BOARD_TYPE.PRIVATE).required(),

  columnOrderIds: Joi.array().items(Joi.string()).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

// chỉ định những field không cho phép cập nhật
const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const validate = async data => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: true
  })
}

const createNew = async data => {
  try {
    const validData = await validate(data)
    const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData)
    return createdBoard
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async id => {
>>>>>>> 7a8944e (update api column and card)
  try {
    const res = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({
<<<<<<< HEAD
        _id: new ObjectId(id),
      });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

const findAll = async (id) => {
  try {
    const res = await GET_DB().collection(BOARD_COLLECTION_NAME).find({});
    console.log(res.toArray());

    return res;
  } catch (error) {
    throw new Error(error);
  }
};

const getDetails = async (boardId) => {
  try {
    const res = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(boardId),
      });
    console.log(res);

    return res;
  } catch (error) {
    throw new Error(error);
  }
};
=======
        _id: new ObjectId(id)
      })
    return res
  } catch (error) {
    throw new Error(error)
  }
}

const getDetails = async boardId => {
  try {
    // query tổng hợp giống kiểu join dữ liệu của sql từ khóa để tra docs là aggregate
    const res = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            _id: new ObjectId(boardId),
            _destroy: false
          }
        },
        {
          $lookup: {
            from: columnModel.COLUMN_COLLECTION_NAME,
            localField: '_id',
            foreignField: 'boardId',
            as: 'columns'
          }
        },
        {
          $lookup: {
            from: cardModel.CARD_COLLECTION_NAME,
            localField: '_id',
            foreignField: 'boardId',
            as: 'cards'
          }
        }
      ])
      .toArray()

    return res[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

// push 1 giá trị id vào cuối mảng columnOrderIds
const pushColumnOrderIds = async column => {
  try {
    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(column.boardId) },
        { $push: { columnOrderIds: new ObjectId(column._id) } },
        { returnDocument: 'after' }
      )

    return result
  } catch (error) {
    console.log(error)
  }
}

const update = async (boardId, updateData) => {
  try {
    // lọc những field mà không cho phép cập nhật ra
    Object.keys(updateData).forEach(fieldName => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName)) delete updateData[fieldName]
    })

    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOneAndUpdate({ _id: new ObjectId(boardId) }, { $set: updateData }, { returnDocument: 'after' })

    return result
  } catch (error) {
    console.log(error)
  }
}
>>>>>>> 7a8944e (update api column and card)

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails,
<<<<<<< HEAD
};
=======
  pushColumnOrderIds,
  update
}
>>>>>>> 7a8944e (update api column and card)
