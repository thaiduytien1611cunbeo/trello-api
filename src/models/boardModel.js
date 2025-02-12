import Joi, { date } from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";

//Define Collection
const BOARD_COLLECTION_NAME = "boards";
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(250).trim().strict(),

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
  try {
    const res = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({
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

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails,
};
