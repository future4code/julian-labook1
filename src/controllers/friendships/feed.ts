import express, { Request, Response } from "express";
import { Authenticator } from "../../service/Authenticator"
import { FriendshipDatabase } from "../../data/FriendshipDataBase"
import { Database } from "../../data/Database"
import { PostDatabase } from "../../data/PostDatabase";
import { GetPostInputDTO } from "../../model/Post/GetPostInputDTO";
import { GetFeedInputDTO } from "../../model/Post/GetFeedInputDTO";

import { NotFoundError } from "../../errors/NotFoundError";

export const feed = async (req: Request, res: Response) => {
    try {

        const authenticator = new Authenticator()
        const tokenData = authenticator.getData(req.headers.authorization as string)

        const friendship = new FriendshipDatabase()
        const friendships = await friendship.getFriendships(tokenData.id)

        if (!friendships) {
            throw new NotFoundError("Friendships do not exist")
        }

        let friendshipsIds: any = []
        friendships.map((f: any) => {
            if (tokenData.id === f.user_id_1) {
                friendshipsIds.push(new GetPostInputDTO(f.user_id_2))
            } else {
                friendshipsIds.push(new GetPostInputDTO(f.user_id_1))
            }
        })

        const feedInput = new GetFeedInputDTO(friendshipsIds);

        const postsDb = new PostDatabase();
        const posts = await postsDb.getFeedByUsersId(feedInput);

        res.status(200).send({
            posts
        })
    } catch (err) {
        res.status(err.statusCode || 400).send({ error: err.message })
    }

    await Database.destroyConnection()
}