import { Request, Response } from 'express';

import { Authenticator } from '../../service/Authenticator';
import { IdGenerator } from '../../service/IdGenerator';
import { HashManager } from '../../service/HashManager';
import { UserDatabase } from '../../data/UserDatabase';
import { Database } from '../../data/Database';

export const signup = async (req: Request, res: Response) => {
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
    const token = authenticator.generateToken({ id }, "10min");

    res.status(200).send({ token });
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }

  await Database.destroyConnection();
}