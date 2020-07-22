import moment from 'moment';
import { Database } from './Database';

import { CreatePostInputDTO } from '../model/Post/CreatePostInputDTO';
import { GetPostOutputDTO } from '../model/Post/GetPostOutputDTO';
import { GetPostInputDTO } from '../model/Post/GetPostInputDTO';

import { InternalServerError } from '../errors/InternalServerError';

export class PostDatabase extends Database {

  private static TABLE_NAME: string = 'Labook_Post';

  public static getTableName = (): string => PostDatabase.TABLE_NAME;

  public create = async (input:CreatePostInputDTO):Promise<void> => {

    try {
      const id = input.getId();
      const photo = input.getPhoto();
      const description = input.getDescription();
      const type = input.getType();
      const user_id = input.getCreatorUserId();
      await this.getConnection()
        .insert({ id, photo, description, type, user_id })
        .into(PostDatabase.TABLE_NAME);
    } catch (error) {
      throw new InternalServerError(error.sqlMessage || error.message);
    }

  }

  public getById = async (input:GetPostInputDTO):Promise<GetPostOutputDTO> => {

    try {
      const id = input.getId();
      const result = await this.getConnection()
        .select('id', 'photo', 'description', 'date_create as createdAt', 'user_id as creatorUserId')
        .from(PostDatabase.TABLE_NAME)
        .where({ id });
      const data = { ...result[0], createdAt: moment(result[0].createdAt, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YY') };
      const post = new GetPostOutputDTO(data.id, data.photo, data.description, data.createdAt, data.type, data.creatorUserId);
      return post;
    } catch (error) {
      throw new InternalServerError(error.sqlMessage || error.message);
    }
  }

  public getByUserId = async (input:GetPostInputDTO):Promise<GetPostOutputDTO> => {

    try {
      const user_id = input.getId();
      const result = await this.getConnection()
        .select('id', 'photo', 'description', 'date_create as createdAt', 'user_id as creatorUserId')
        .from(PostDatabase.TABLE_NAME)
        .where({ user_id });
      const data = { ...result[0], createdAt: moment(result[0].createdAt, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YY') };
      const post = new GetPostOutputDTO(data.id, data.photo, data.description, data.createdAt, data.type, data.creatorUserId);
      return post;
    } catch (error) {
      throw new InternalServerError(error.sqlMessage || error.message);
    }
  }

  public getByUserIdAndType = async (input:GetPostInputDTO):Promise<GetPostOutputDTO> => {

    try {
      const user_id = input.getId();
      const type = input.getType();
      const result = await this.getConnection()
        .select('id', 'photo', 'description', 'date_create as createdAt', 'user_id as creatorUserId')
        .from(PostDatabase.TABLE_NAME)
        .where({ user_id, type });
      const data = { ...result[0], createdAt: moment(result[0].createdAt, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YY') };
      const post = new GetPostOutputDTO(data.id, data.photo, data.description, data.createdAt, data.type, data.creatorUserId);
      return post;
    } catch (error) {
      throw new InternalServerError(error.sqlMessage || error.message);
    }
  }
}

export enum TYPE {
  ANY = '',
  NORMAL = "Normal",
  EVENT = "Event"
}