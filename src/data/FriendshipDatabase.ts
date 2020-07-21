import { Database } from "./Database";

export class FriendshipDatabase extends Database {
    private static TABLE_NAME = "Labook_Friendship"

    public async createFriendship(
        user_id_1: string,
        user_id_2: string
    ): Promise<any> {
        await this.getConnection()
            .insert({ user_id_1, user_id_2 })
            .into(FriendshipDatabase.TABLE_NAME)
    }

    public async getFriendshipById(user_id_1: string, user_id_2: string): Promise<any> {
        const result = await this.getConnection()
            .select("*")
            .from(FriendshipDatabase.TABLE_NAME)
            .where({ user_id_2 })
            .andWhere({ user_id_1 })

        return result[0];
    }

    public async getFriendships(user_id_1: string): Promise<any> {
        await this.getConnection()
            .select("*")
            .from(FriendshipDatabase.TABLE_NAME)
            .where({user_id_1})
            .orWhere(`user_id_2 = ${user_id_1}`)
            .orderBy("date_create")
    }

    public async deleteFriendship(user_id_1: string, user_id_2: string): Promise<any> {
        await this.getConnection()
            .raw(`
        DELETE FROM ${FriendshipDatabase.TABLE_NAME}
        WHERE user_id_1 = "${user_id_1}"
        AND user_id_2 = "${user_id_2}"
        `)
        // .from(FriendshipDatabase.TABLE_NAME)
        // .where(user_id_1)
        // .andWhere(user_id_2)
        // .delete()
    }
}