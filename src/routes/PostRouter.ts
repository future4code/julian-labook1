import express from "express";

import { createPost } from "../controllers/post/createPost";

export const postRouter = express.Router();

postRouter.post('/create', createPost);