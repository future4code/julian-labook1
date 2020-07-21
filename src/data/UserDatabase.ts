import { Database } from "./Database";

export class UserDatabase extends Database {
  private tableName = "Labook_User";

  async create(id: string, name: string, email: string, password: string) {
    try {
      await this.getConnection()
        .insert({ id, name, email, password })
        .into(this.tableName);

      Database.destroyConnection();
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getByEmail(email: string): Promise<any> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(this.tableName)
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
        .from(this.tableName)
        .where({ id });
      await Database.destroyConnection();
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
