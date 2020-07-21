import express, { Request, Response } from "express";
import { AddressInfo } from "net";
import dotenv from "dotenv";

import { HashManager } from "./service/HashManager";
import { Authenticator } from "./service/Authenticator";
import { UserDatabase } from "./data/UserDatabase";
import { friendshipRouter } from "./routes/FriendshipRouter";
import { postRouter } from "./routes/PostRouter";
import { userRouter } from "./routes/UserRouter";
import { signup } from "./controllers/user/signup";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/friendship", friendshipRouter);

app.use('/post', postRouter);

app.use('/user', userRouter);

app.post("/signup", signup);

app.post("/login", async (req: Request, res: Response) => {
  try {
    const userData = {
      email: req.body.email,
      password: req.body.password,
    };

    const userDatabase = new UserDatabase();
    const user = await userDatabase.getByEmail(userData.email);

    const hashManager = new HashManager();
    const passwordIsCorrect = await hashManager.compare(
      userData.password,
      user.password
    );

    if (!passwordIsCorrect) {
      throw new Error("Senha inválida");
    }

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({
      id: user.id,
    }, "10min");

    res.status(200).send({ token });
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }
});

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
