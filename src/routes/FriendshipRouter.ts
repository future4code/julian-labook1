import express from "express";
import { friendship } from "../controllers/friendships/friendship";
import { deleteFriendship } from "../controllers/friendships/delete";

export const friendshipRouter = express.Router()

friendshipRouter.post("/friendship", friendship)

friendshipRouter.post("/friendship/delete", deleteFriendship)