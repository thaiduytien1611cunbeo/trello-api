import express from "express";
import exitHook from "async-exit-hook";
import { CLOSE_DB, CONNECT_DB } from "./config/mongodb";
import { env } from "./config/environment";
import { APIs_V1 } from "./routes/v1";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware";

const START_SERVER = () => {
  const app = express();
  app.use(express.json());

  app.use("/v1", APIs_V1);

  //Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware);
  console.log(env.BUILD_MODE);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`http://${env.APP_HOST}:${env.APP_PORT}/`);
  });

  exitHook(() => {
    CLOSE_DB();
  });
};

(async () => {
  try {
    await CONNECT_DB();
    console.log("Connected to MongoDB cloud Atlas");
    START_SERVER();
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
})();
