import express, { Request, Response } from "express";
import { Authenticator } from "../../service/Authenticator"
import { FriendshipDatabase } from "../../data/FriendshipDataBase"
import { Database } from "../../data/Database";

export const deleteFriendship = async (req: Request, res: Response) => {
    try {

        const authenticator = new Authenticator()
        const tokenData = authenticator.getData(req.headers.authorization as string)

        const friendship = new FriendshipDatabase()
        const friendshipExistence = await friendship.getFriendshipById(tokenData.id, req.body.user_id)
        
        if (!friendshipExistence) {
            throw new Error("Friendship does not exist")
        }

        friendship.deleteFriendship(tokenData.id, req.body.user_id)

        res.status(200).send({
            message: "Friendship deleted"
        })

    } catch (err) {
        res.status(400).send({ error: err.message })
    }

    await Database.destroyConnection()
}