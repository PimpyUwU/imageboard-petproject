import express, {Response, Request} from "express";
import {RequestWithURIParam, RequestWithURIParamsAndBody} from "../../types/RequestTypes";
import {GetBoardURIModel} from "../../types/models/RequestModels/GetBoardURIModel";
import {BoardViewModel} from "../../types/models/ViewModels/BoardViewModel";
import {BoardsListViewModel} from "../../types/models/ViewModels/BoardsListViewModel";
import {BoardsService} from "../services/BoardsService";
import HTTP_CODES from "../HTTP_CODES";
import {CreatePostModel} from "../../types/models/RequestModels/CreatePostModel";
import {PostViewModel} from "../../types/models/ViewModels/PostViewModel";
import {GetPostURIModel} from "../../types/models/RequestModels/GetPostURIModel";

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
    router.post("/:boardTag", async (req : RequestWithURIParamsAndBody<GetBoardURIModel, CreatePostModel>,
                                res : Response<PostViewModel> )=>{
        const boardTag : string = req.params.boardTag
        const postTitle : string = req.body.title
        const postText : string = req.body.text

        const createdPost : PostViewModel | null = await BoardsService.AddPost(boardTag, postTitle, postText)

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
        const boardTag : string = req.params.tag
        const postID : number = +req.params.postID

        const post : PostViewModel | null = await BoardsService.GetPost(boardTag, postID)

        if(!post){
            res.status(HTTP_CODES.NO_CONTENT_204).send()
        }
        else{
            res.status(HTTP_CODES.OK_200).json(post)
        }
    })

    router.post("", )

    return router;
}