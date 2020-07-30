import { Request, Response } from 'express';

import { Authenticator } from '../../service/Authenticator';
import { Database } from '../../data/Database';
import { PostDatabase } from '../../data/PostDatabase';

import { GetPostInputDTO } from '../../model/Post/GetPostInputDTO';

import { NotFoundError } from '../../errors/NotFoundError';

export const getById = async (req:Request, res:Response) => {
  try {
    const token = req.headers.authorization as string;

    const authenticator = new Authenticator();
    authenticator.getData(token);

    const postId = req.params.id!;
    const inputPost = new GetPostInputDTO(postId);

    const postDb = new PostDatabase();
    const checkPost = await postDb.checkById(inputPost);

    if (!checkPost) {
      throw new NotFoundError('Post not found');
    }

    const post = await postDb.getById(inputPost);

    res.status(200).send({ post });

  } catch (error) {
    res.status(error.statusCode || 400).send({ message: error.message });
  }

  await Database.destroyConnection();
}