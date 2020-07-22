import { Database } from "./Database";

export class UserDatabase extends Database {
  private static TABLE_NAME = "Labook_User";

  public static getTableName = ():string => UserDatabase.TABLE_NAME;

  async create(id: string, name: string, email: string, password: string) {
    try {
      await this.getConnection()
        .insert({ id, name, email, password })
        .into(UserDatabase.TABLE_NAME);

      Database.destroyConnection();
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getByEmail(email: string): Promise<any> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({ email });
      Database.destroyConnection();
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getById(id: string): Promise<any> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({ id });
      await Database.destroyConnection();
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
