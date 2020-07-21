import express, { Request, Response } from "express";
import { AddressInfo } from "net";
import dotenv from "dotenv";
import { HashManager } from "./service/HashManager";
import { IdGenerator } from "./service/IdGenerator";
import { Authenticator } from "./service/Authenticator";
import { UserDatabase } from "./data/UserDatabase/UserDatabase";

dotenv.config();

const app = express();

app.use(express.json());

app.post("/signup", async (req: Request, res: Response) => {
  try {
    if (!req.body.email || req.body.email.indexOf("@") === -1) {
      throw new Error("Invalid E-mail");
    }

    if (!req.body.password || req.body.password.length < 6) {
      throw new Error("Invalid Password");
    }

    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const hashManager = new HashManager();
    const cipherText = await hashManager.hash(userData.password);

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const userDatabase = new UserDatabase();
    await userDatabase.create(id, userData.name, userData.email, cipherText);

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id });

    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

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
    });

    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
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
