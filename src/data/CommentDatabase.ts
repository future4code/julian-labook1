import { Database } from './Database';

import { CommentInputDTO } from '../model/Post/CommentInputDTO';

import { InternalServerError } from '../errors/InternalServerError';

export class CommentDatabase extends Database {

  private static TABLE_NAME:string = 'Labook_Comment';

  public static getTableName = ():string => CommentDatabase.TABLE_NAME;

  public create = async (input:CommentInputDTO):Promise<void> => {
    try {
      const id = input.getId();
      const content = input.getContent();
      const post_id = input.getPostId();
      const user_id = input.getLikeCreatorUserId();
      await this.getConnection()
        .insert({ id, content, post_id, user_id })
        .into(CommentDatabase.TABLE_NAME);
    } catch (error) {
      throw new InternalServerError(error.sqlMessage || error.message);
    }
  }
}