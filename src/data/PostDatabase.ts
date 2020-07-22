import moment from 'moment';
import { Database } from './Database';

import { CreatePostInputDTO } from '../model/Post/CreatePostInputDTO';
import { GetPostOutputDTO } from '../model/Post/GetPostOutputDTO';
import { GetPostInputDTO } from '../model/Post/GetPostInputDTO';

import { InternalServerError } from '../errors/InternalServerError';
import { GetFeedInputDTO } from '../model/Post/GetFeedInputDTO';
import { GetFeedOutputDTO } from '../model/Post/GetFeedOutputDTO';
import { UserDatabase } from './UserDatabase';

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

  public getFeedByUsersId = async (input:GetFeedInputDTO):Promise<GetFeedOutputDTO[]> => {
    try {
      const posts = [];
      const userIds = input.getUserInputs().map((item) => item.getId());
      for (let id of userIds) {
        const result = await this.getConnection().raw(`
          SELECT p.id, p.photo, p.description, p.date_create as createdAt, p.type, u.id as creatorUserId, u.name as creatorUserName from ${PostDatabase.TABLE_NAME} p
          JOIN ${UserDatabase.getTableName()} u ON u.id = p.user_id
          WHERE p.user_id = '${id}'
          ORDER BY p.date_create
        `);
        const data = { ...result[0][0], createdAt: moment(result[0][0].createdAt, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YY') };
        const post = new GetFeedOutputDTO(data.id, data.photo, data.description, data.createdAt, data.type, data.creatorUserId, data.creatorUsrName);
        posts.push(post);
      }
      return posts;
    } catch (error) {
      throw new InternalServerError(error.sqlMessage || error.message)
    }
  }
}

export enum POST_TYPE {
  ANY = '',
  NORMAL = "Normal",
  EVENT = "Event"
}