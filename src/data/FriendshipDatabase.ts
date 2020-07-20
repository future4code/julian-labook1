import { Database } from "./Database";

export class FriendshipDatabase extends Database {
    private static TABLE_NAME = "Labook_Friendship"

    public async createFriendship(
        user_id_1: string,
        user_id_2: string
    ): Promise<void> {
        await this.getConnection()
            .insert({
                user_id_1,
                user_id_2
            })
            .into(FriendshipDatabase.TABLE_NAME)
    }

    public async getFriendship(
        user_id_1: string,
        user_id_2: string
    ): Promise<void> {
        await this.getConnection()
            .select("*")
            .from(FriendshipDatabase.TABLE_NAME)
            .where(user_id_1)
            .andWhere(user_id_2)
    }

    public async deleteFriendship(
        user_id_1: string,
        user_id_2: string
    ): Promise<void> {
        await this.getConnection()
            .delete()
            .from(FriendshipDatabase.TABLE_NAME)
            .where(user_id_1)
            .andWhere(user_id_2)
    }
}