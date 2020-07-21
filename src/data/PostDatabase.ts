import moment from 'moment';
import { Database } from './Database';

export class PostDatabase extends Database {

  private static TABLE_NAME:string = 'Labook_Post';

  public static getTableName = ():string => PostDatabase.TABLE_NAME;

  public create = async (id:string, photo:string, description:string, type:TYPE, user_id:string):Promise<void> => {
    try {
      await this.getConnection()
      .insert({ id, photo, description, type, user_id })
      .into(PostDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
    
  }

  public getById = async (id:string):Promise<any> => {
    try {
      const result = await this.getConnection()
      .select('id', 'photo', 'description', 'date_create as createdAt', 'user_id as creatorUserId')
      .from(PostDatabase.TABLE_NAME)
      .where({ id });
      const data = { ...result[0], createdAt: moment(result[0].createdAt, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YY') };
      return data;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}

enum TYPE {
  NORMAL = "Normal",
  EVENT = "Event"
}