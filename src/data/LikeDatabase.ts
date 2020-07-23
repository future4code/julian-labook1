import { Database } from './Database';

import { LikeInputDTO } from '../model/Post/LikeInputDTO';

import { InternalServerError } from '../errors/InternalServerError';

export class LikeDatabase extends Database {

  private static TABLE_NAME:string = 'Labook_Like';

  public static getTableName = ():string => LikeDatabase.TABLE_NAME;

  public checkLike = async (input:LikeInputDTO):Promise<boolean> => {
    try {
      const post_id = input.getPostId();
      const user_id = input.getLikeCreatorUserId();
      const result = await this.getConnection()
        .select('*')
        .from(LikeDatabase.TABLE_NAME)
        .where({ post_id, user_id });
      if (result.length) {
        return true;
      }
      return false;
    } catch (error) {
      throw new InternalServerError(error.sqlMessage || error.message);
    }
  }

  public like = async (input:LikeInputDTO):Promise<void> => {
    try {
      const post_id = input.getPostId();
      const user_id = input.getLikeCreatorUserId();
      await this.getConnection()
        .insert({ post_id, user_id })
        .into(LikeDatabase.TABLE_NAME);
    } catch (error) {
      throw new InternalServerError(error.sqlMessage || error.message);
    }
  }

  public dislike = async (input:LikeInputDTO):Promise<void> => {
    try {
      const post_id = input.getPostId();
      const user_id = input.getLikeCreatorUserId();
      await this.getConnection()
        .delete()
        .from(LikeDatabase.TABLE_NAME)
        .where({ post_id, user_id });
    } catch (error) {
      throw new InternalServerError(error.sqlMessage || error.message);
    }
  }
}