import express, {Response, Request} from "express";
import {RequestWithURIParam, RequestWithURIParamsAndBody} from "../../types/RequestTypes";
import {GetBoardURIModel} from "../../types/models/GetBoardURIModel";
import {BoardViewModel} from "../../types/models/ViewModels/BoardViewModel";
import {BoardsListViewModel} from "../../types/models/ViewModels/BoardsListViewModel";
import {BoardsService} from "../services/BoardsService";
import HTTP_CODES from "../HTTP_CODES";
import {CreatePostModel} from "../../types/models/RequestModels/CreatePostModel";
import {PostViewModel} from "../../types/models/ViewModels/PostViewModel";

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
    router.get("/:tag", async (req : RequestWithURIParam<GetBoardURIModel>,
                                    res : Response<BoardViewModel> ) => {
        const result: BoardViewModel | null = await BoardsService.GetBoardByTag(req.params.tag)

        if(!result){
            res.status(HTTP_CODES.NO_CONTENT_204).send()
        }
        else{
            res.status(HTTP_CODES.OK_200).json(result)
        }
    })

    //Create new Post for board by tag
    router.post("/:tag", async (req : RequestWithURIParamsAndBody<GetBoardURIModel, CreatePostModel>,
                                res : Response<PostViewModel> )=>{
        const boardTag : string = req.params.tag
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

    return router;
}