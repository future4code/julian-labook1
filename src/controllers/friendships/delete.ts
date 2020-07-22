import express, { Request, Response } from "express";
import { Authenticator } from "../../service/Authenticator"
import { FriendshipDatabase } from "../../data/FriendshipDataBase"
import { Database } from "../../data/Database";

export const deleteFriendship = async (req: Request, res: Response) => {
    try {

        const authenticator = new Authenticator()
        const tokenData = authenticator.getData(req.headers.authorization as string)

        const friendship = new FriendshipDatabase()
        const tokenIdAndFriendId = await friendship.getFriendshipById(tokenData.id, req.body.userId)

        let friendIdAndTokenId
        if (!tokenIdAndFriendId) {
            friendIdAndTokenId = await friendship.getFriendshipById(req.body.userId, tokenData.id)
        }

        if (!tokenIdAndFriendId && !friendIdAndTokenId) {
            throw new Error("Friendship does not exist")
        }

        tokenIdAndFriendId ?
            await friendship.deleteFriendship(tokenData.id, req.body.userId)
            :
            await friendship.deleteFriendship(req.body.userId, tokenData.id)

        res.status(200).send({
            message: "Friendship deleted"
        })

    } catch (error) {
        res.status(error.statusCode || 400).send({ error: error.message });
    }

    await Database.destroyConnection()
}