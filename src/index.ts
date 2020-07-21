import express, { Request, Response } from "express";
import { AddressInfo } from "net";
import dotenv from "dotenv";

import { friendshipRouter } from "./routes/FriendshipRouter";
import { postRouter } from "./routes/PostRouter";
import { userRouter } from "./routes/UserRouter";
import { signup } from "./controllers/user/signup";
import { login } from "./controllers/user/login";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/friendship", friendshipRouter);

app.use("/post", postRouter);

app.use("/user", userRouter);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
