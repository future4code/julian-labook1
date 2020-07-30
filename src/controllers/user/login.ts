import { Request, Response } from "express";

import { UserDatabase } from "../../data/UserDatabase";
import { HashManager } from "../../service/HashManager";
import { Authenticator } from "../../service/Authenticator";

export const login = async (req: Request, res: Response) => {
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
    res.status(error.statusCode || 400).send({ error: error.message });
  }
};
