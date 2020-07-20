import express from "express";
import { AddressInfo } from "net";
import dotenv from "dotenv";
import { friendshipRouter } from "./routes/FriendshipRouter";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/friendships", friendshipRouter)

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});