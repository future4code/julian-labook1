import express, { Request, Response } from "express";
import { Authenticator } from "../../service/Authenticator"
import { FriendshipDatabase } from "../../data/FriendshipDataBase"
import { Database } from "../../data/Database"
import { PostDatabase } from "../../data/PostDatabase";

export const feed = async (req: Request, res: Response) => {
    try {

        const authenticator = new Authenticator()
        const tokenData = authenticator.getData(req.headers.authorization as string)

        const friendship = new FriendshipDatabase()
        const friendships = await friendship.getFriendships(tokenData.id)

        if (!friendships) {
            throw new Error("Friendships do not exist")
        }

        const friendshipsIds = friendships.map((f: any) => {
            if (tokenData.id = f.user_id_1) {
                return f.user_id_2
            }
            if (tokenData.id = f.user_id_2) {
                return f.user_id_1
            }
        }).map((f: any) => {
            const user_id = f.user_id_1 || f.user_id_2
            return user_id
        })

        const postsDb = new PostDatabase()
        let posts
        for (let i of friendshipsIds) {
            posts = await postsDb.getById(i.user_id)
        }

        res.status(200).send({
            posts
        })
    } catch (err) {
        res.status(400).send({ error: err.message })
    }

    await Database.destroyConnection()
}