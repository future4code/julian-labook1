import express, { Request, Response } from "express";
import { Authenticator } from "../../service/Authenticator"
import { FriendshipDatabase } from "../../data/FriendshipDataBase"
import { Database } from "../../data/Database"

export const friendship = async (req: Request, res: Response) => {
    try {
  
      const authenticator = new Authenticator()
      const tokenData = authenticator.getData(req.headers.authorization as string)
  
      const friendship = new FriendshipDatabase()
      await friendship.createFriendship(tokenData.id, req.body.user_id)
  
      res.status(200).send({
        message: "Friendship created"
      })
    } catch (err) {
      res.status(400).send({ error: err.message })
    }
  
    await Database.destroyConnection()
  }