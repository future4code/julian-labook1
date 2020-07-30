import express from "express";

import { create } from "../controllers/post/create";
import { like } from "../controllers/post/like";
import { dislike } from "../controllers/post/dislike";
import { comment } from "../controllers/post/comment";
import { getById } from "../controllers/post/getById";

export const postRouter = express.Router();

postRouter.post('/create', create);

postRouter.post('/like/:id', like);

postRouter.post('/dislike/:id', dislike);

postRouter.post('/comment/:id', comment);

postRouter.get('/:id', getById);