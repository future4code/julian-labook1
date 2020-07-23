import moment from 'moment';

import { Database } from './Database';
import { UserDatabase } from './UserDatabase';

import { CreatePostInputDTO } from '../model/Post/CreatePostInputDTO';
import { GetPostInputDTO } from '../model/Post/GetPostInputDTO';
import { GetPostOutputDTO } from '../model/Post/GetPostOutputDTO';
import { GetFeedInputDTO } from '../model/Post/GetFeedInputDTO';
import { GetFeedOutputDTO } from '../model/Post/GetFeedOutputDTO';

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
      const data = { ...result[0], createdAt: moment(result[0].createdAt, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss') };
      const post = new GetPostOutputDTO(data.id, data.photo, data.description, data.createdAt, data.type, data.creatorUserId);
      return post;
    } catch (error) {
      throw new InternalServerError(error.sqlMessage || error.message);
    }
  }

  public getFeedByUsersId = async (input:GetFeedInputDTO):Promise<GetFeedOutputDTO[]> => {

    try {
      const userIds = input.getUserInputs().map((item) => item.getId());
      const p = PostDatabase.TABLE_NAME;
      const u = UserDatabase.getTableName();
      const result = await this.getConnection()
        .select(
          `${p}.id`,
          `${p}.photo`,
          `${p}.description`,
          `${p}.date_create as createdAt`,
          `${p}.type`,
          `${u}.id as creatorUserId`,
          `${u}.name as creatorUserName`
        )
        .from(p)
        .join(u, `${u}.id`, `${p}.user_id`)
        .whereIn(`${p}.user_id`, userIds)
        .orderBy(`${p}.date_create`, 'DESC');
      const posts = result.map((item) => {
        const data = { ...item, createdAt: moment(item.createdAt, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss') };
        return new GetFeedOutputDTO(data.id, data.photo, data.description, data.createdAt, data.type, data.creatorUserId, data.creatorUserName);
      });
      return posts;
    } catch (error) {
      throw new InternalServerError(error.sqlMessage || error.message)
    }
  }

  public getFeedByUsersIdAndType = async (input:GetFeedInputDTO):Promise<GetFeedOutputDTO[]> => {

    try {
      const userIds = input.getUserInputs().map((item) => item.getId());
      const type = input.getType();
      const p = PostDatabase.TABLE_NAME;
      const u = UserDatabase.getTableName();
      const result = await this.getConnection()
        .select(
          `${p}.id`,
          `${p}.photo`,
          `${p}.description`,
          `${p}.date_create as createdAt`,
          `${p}.type`,
          `${u}.id as creatorUserId`,
          `${u}.name as creatorUserName`
        )
        .from(p)
        .join(u, `${u}.id`, `${p}.user_id`)
        .whereIn(`${p}.user_id`, userIds)
        .andWhere({ type })
        .orderBy(`${p}.date_create`, 'DESC');
      const posts = result.map((item) => {
        const data = { ...item, createdAt: moment(item.createdAt, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YY HH:mm:ss') };
        return new GetFeedOutputDTO(data.id, data.photo, data.description, data.createdAt, data.type, data.creatorUserId, data.creatorUserName);
      });
      return posts;
    } catch (error) {
      throw new InternalServerError(error.sqlMessage || error.message);
    }
  }
}

export enum POST_TYPE {
  ANY = '',
  NORMAL = "Normal",
  EVENT = "Event"
}