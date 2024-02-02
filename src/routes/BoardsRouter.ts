import express from "express";
import {BoardsController} from "../controllers/BoardsController";
import {AuthorizationMiddleware} from "../middleware/AuthorizationMiddleware";

export const GetBoardsRouter = () => {
    const router = express.Router()

    //Show list of all boards
    router.get("/", BoardsController.allBoardsGet)

    //All posts from concrete board by tag
    router.get("/:boardTag", BoardsController.concreteBoardGet)

    //Get post and all it's replies from concrete board
    router.get("/:boardTag/:postId", BoardsController.postGet)

    //Create new Post for board by tag
    router.post("/:boardTag", BoardsController.addNewPost)

    //Add reply to post by boardTag and postID
    router.post("/:boardTag/:postId", BoardsController.addNewReply)

    //Delete post(only for MODER or higher)
    router.delete("/:boardTag/:postId", AuthorizationMiddleware.requireAuthorization, AuthorizationMiddleware.checkUserRoleAndId, BoardsController.deletePost)

    router.delete("/:boardTag/:postId/replyId", AuthorizationMiddleware.requireAuthorization, AuthorizationMiddleware.checkUserRoleAndId, BoardsController.deleteReply)

    return router;
}