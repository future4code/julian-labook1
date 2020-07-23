import { Request, Response } from 'express';

import { Authenticator, AuthenticationData } from '../../service/Authenticator';
import { PostDatabase } from '../../data/PostDatabase';
import { LikeDatabase } from '../../data/LikeDatabase';
import { Database } from '../../data/Database';

import { GetPostInputDTO } from '../../model/Post/GetPostInputDTO';
import { LikeInputDTO } from '../../model/Post/LikeInputDTO';

import { NotFoundError } from '../../errors/NotFoundError';
import { GenericError } from '../../errors/GenericError';

export const like = async (req:Request, res:Response) => {
  try {
    const token = req.headers.authorization!;

    const authenticator = new Authenticator();
    const authData:AuthenticationData = authenticator.getData(token);

    const postId = req.params.id!;
    const inputPost = new GetPostInputDTO(postId);

    const postDb = new PostDatabase();
    const checkPost = await postDb.checkById(inputPost);

    if (!checkPost) {
      throw new NotFoundError('Post not found');
    }

    const inputLike = new LikeInputDTO(postId, authData.id);

    const likeDb = new LikeDatabase();
    const checkLike:boolean = await likeDb.checkLike(inputLike);
    if (checkLike) {
      throw new GenericError('Post is already liked');
    }

    await likeDb.like(inputLike);

    res.status(200).send({ message: 'Post liked succesfully' });

  } catch (error) {
    res.status(error.statusCode || 400).send({ message: error.message });
  }

  await Database.destroyConnection();
}