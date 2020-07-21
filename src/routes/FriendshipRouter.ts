import express from "express";
import { createFriendship } from "../controllers/friendships/create";
import { deleteFriendship } from "../controllers/friendships/delete";

export const friendshipRouter = express.Router()

friendshipRouter.post("/create", createFriendship)

friendshipRouter.post("/delete", deleteFriendship)