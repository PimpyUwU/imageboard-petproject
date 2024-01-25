import express, {Response, Request} from "express";
import {RequestWithURIParam, RequestWithURIParamsAndBody} from "../../types/RequestTypes";
import {GetBoardURIModel} from "../../types/models/Input/RequestModels/GetBoardURIModel";
import {BoardViewModel} from "../../types/models/Output/ViewModels/BoardViewModel";
import {BoardsListViewModel} from "../../types/models/Output/ViewModels/BoardsListViewModel";
import {BoardsService} from "../services/BoardsService";
import HTTP_CODES from "../HTTP_CODES";
import {CreatePostBodyModel} from "../../types/models/Input/RequestModels/CreatePostBodyModel";
import {PostViewModel} from "../../types/models/Output/ViewModels/PostViewModel";
import {GetPostURIModel} from "../../types/models/Input/RequestModels/GetPostURIModel";
import {CreateReplyBodyModel} from "../../types/models/Input/RequestModels/CreateReplyBodyModel";
import {ReplyViewModel} from "../../types/models/Output/ViewModels/ReplyViewModel";
import {PostServiceModelIn} from "../../types/models/Input/ServiceModels/PostServiceModelIn";
import {ReplyServiceModelin} from "../../types/models/Input/ServiceModels/ReplyServiceModelIn";

export const GetBoardsRouter = () => {
    const router = express.Router()

    //Show list of all boards
    router.get("/", async (_req: Request,
                                res: Response<BoardsListViewModel[]>) => {
        const result: BoardsListViewModel[] | null = await BoardsService.GetAllBoards()

        if(!result || result.length == 0){
            res.status(HTTP_CODES.NO_CONTENT_204).send()
        }
        else {
            res.status(HTTP_CODES.OK_200).json(result)
        }
    })

    //All posts from concrete board by tag
    router.get("/:boardTag", async (req : RequestWithURIParam<GetBoardURIModel>,
                                    res : Response<BoardViewModel> ) => {
        const boardTag : string = req.params.boardTag

        const result: BoardViewModel | null = await BoardsService.GetBoardByTag(boardTag)

        if(!result){
            res.status(HTTP_CODES.NO_CONTENT_204).send()
        }
        else{
            res.status(HTTP_CODES.OK_200).json(result)
        }
    })

    //Create new Post for board by tag
    router.post("/:boardTag", async (req : RequestWithURIParamsAndBody<GetBoardURIModel, CreatePostBodyModel>,
                                res : Response<PostViewModel> )=>{
        const postData : PostServiceModelIn = {
            boardTag : req.params.boardTag,
            postTitle : req.body.title,
            postText : req.body.text
        }

        const createdPost : PostViewModel | null = await BoardsService.AddPost(postData)

        if (!createdPost){
            res.status(HTTP_CODES.BAD_REQUEST_400).send()
        }
        else{
            res.status(HTTP_CODES.CREATED_201).json(createdPost)
        }

    })

    //Get post and all it's replies from concrete board
    router.get("/:boardTag/:postId", async (req : RequestWithURIParam<GetPostURIModel>,
                                            res : Response<PostViewModel>)=> {
        const boardTag : string = req.params.boardTag
        const postID : number = +req.params.postId

        const post : PostViewModel | null = await BoardsService.GetPost(boardTag, postID)

        if(!post){
            res.status(HTTP_CODES.NO_CONTENT_204).send()
        }
        else{
            res.status(HTTP_CODES.OK_200).json(post)
        }
    });

    //Add reply to post by boardTag and postID
    router.post("/:boardTag/:postId", async (req : RequestWithURIParamsAndBody<GetPostURIModel, CreateReplyBodyModel>,
                                             res : Response<ReplyViewModel>) => {
        const replyData : ReplyServiceModelin = {
            replyTitle: req.body.title,
            replyText: req.body.text,
            replyTo: req.body.reply_id ? +req.body.reply_id : null,
            boardTag: req.params.boardTag,
            postId: +req.params.postId
        };

        const reply : ReplyViewModel | null = await BoardsService.AddReplyToPost(replyData)

        if(!reply) {
            res.status(HTTP_CODES.BAD_REQUEST_400).send()
        }
        else{
            res.status(HTTP_CODES.CREATED_201).json(reply)
        }
    })

    return router;
}