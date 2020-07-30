import { Request, Response } from 'express';

import { Authenticator, AuthenticationData } from '../../service/Authenticator';
import { PostDatabase } from '../../data/PostDatabase';
import { Database } from '../../data/Database';
import { IdGenerator } from '../../service/IdGenerator';
import { CommentDatabase } from '../../data/CommentDatabase';

import { GetPostInputDTO } from '../../model/Post/GetPostInputDTO';
import { CommentInputDTO } from '../../model/Post/CommentInputDTO';

import { NotFoundError } from '../../errors/NotFoundError';

export const comment = async (req:Request, res:Response) => {
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

    const content = req.body.content!;

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const inputComment = new CommentInputDTO(id, content, postId, authData.id);

    const commentDb = new CommentDatabase();
    
    await commentDb.create(inputComment);

    res.status(200).send({ message: 'Comment created successfully' });

  } catch (error) {
    res.status(error.statusCode || 400).send({ message: error.message });
  }

  await Database.destroyConnection();
}