import express, {Response, Request} from "express";
import {BoardsController} from "../controllers/BoardsController";
import {authorizationMiddleware} from "../middleware/authorizationMiddleware";

export const GetBoardsRouter = () => {
    const router = express.Router()

    //Show list of all boards
    router.get("/", BoardsController.allBoardsGet)

    //All posts from concrete board by tag
    router.get("/:boardTag", BoardsController.concreteBoardGet)

    //Create new Post for board by tag
    router.post("/:boardTag", BoardsController.addNewPost)

    //Get post and all it's replies from concrete board
    router.get("/:boardTag/:postId", BoardsController.postGet)

    //Add reply to post by boardTag and postID
    router.post("/:boardTag/:postId", BoardsController.addNewReply)

    return router;
}