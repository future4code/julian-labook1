import express from "express";
import { createFriendship } from "../controllers/friendships/create";
import { deleteFriendship } from "../controllers/friendships/delete";
import { feed } from "../controllers/friendships/feed";
import { feedByType } from "../controllers/friendships/feedByType";

export const friendshipRouter = express.Router()

friendshipRouter.post("/create", createFriendship)

friendshipRouter.delete("/delete", deleteFriendship)

friendshipRouter.get("/feed", feed)

friendshipRouter.get("/feedByType", feedByType)