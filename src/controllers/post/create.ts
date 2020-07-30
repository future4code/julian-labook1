import { Request, Response } from 'express';

import { Authenticator, AuthenticationData } from '../../service/Authenticator';
import { IdGenerator } from '../../service/IdGenerator';
import { PostDatabase } from '../../data/PostDatabase';
import { Database } from '../../data/Database';

import { CreatePostInputDTO } from '../../model/Post/CreatePostInputDTO';

import { InvalidInputError } from '../../errors/InvalidInputError';

export const create = async (req:Request, res:Response) => {
  try {
    const token = req.headers.authorization as string;

    const authenticator = new Authenticator();
    const authData:AuthenticationData = authenticator.getData(token);

    const { photo, description, type } = req.body;

    if (!photo) {
      throw new InvalidInputError('Insert a photo');
    }
    if (!description) {
      throw new InvalidInputError('Insert a description');
    }
    
    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const postDb = new PostDatabase();
    const post = new CreatePostInputDTO(id, photo, description, type, authData.id);
    
    await postDb.create(post);

    res.status(200).send({ message: 'Post created successfully' });
  } catch (error) {
    res.status(error.statusCode || 400).send({ message: error.message });
  }

  await Database.destroyConnection();
}