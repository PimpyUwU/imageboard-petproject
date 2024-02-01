import {Request, Response} from "express";
import {BoardsListViewModel} from "../../types/models/Boards/Output/ViewModels/BoardsListViewModel";
import {BoardsService} from "../services/BoardsService";
import HTTP_CODES from "../HTTP_CODES";
import {RequestWithJWT, RequestWithURIParam, RequestWithURIParamsAndBody} from "../../types/RequestTypes";
import {GetBoardURIModel} from "../../types/models/Boards/Input/RequestModels/GetBoardURIModel";
import {BoardViewModel} from "../../types/models/Boards/Output/ViewModels/BoardViewModel";
import {CreatePostBodyModel} from "../../types/models/Boards/Input/RequestModels/CreatePostBodyModel";
import {PostViewModel} from "../../types/models/Boards/Output/ViewModels/PostViewModel";
import {PostServiceModelIn} from "../../types/models/Boards/Input/ServiceModels/PostServiceModelIn";
import {GetPostURIModel} from "../../types/models/Boards/Input/RequestModels/GetPostURIModel";
import {CreateReplyBodyModel} from "../../types/models/Boards/Input/RequestModels/CreateReplyBodyModel";
import {ReplyViewModel} from "../../types/models/Boards/Output/ViewModels/ReplyViewModel";
import {ReplyServiceModelin} from "../../types/models/Boards/Input/ServiceModels/ReplyServiceModelIn";
import {userInfo} from "node:os";

export const BoardsController = {
    async allBoardsGet(_req: Request,
                       res: Response<BoardsListViewModel[]>){
        const result: BoardsListViewModel[] | null = await BoardsService.GetAllBoards()

        if(!result || result.length == 0){
            res.status(HTTP_CODES.NO_CONTENT_204).send()
        }
        else {
            res.status(HTTP_CODES.OK_200).json(result)
        }
    },

    async concreteBoardGet(req : RequestWithURIParam<GetBoardURIModel>,
                           res : Response<BoardViewModel> ){
        const boardTag : string = req.params.boardTag

        const result: BoardViewModel | null = await BoardsService.GetBoardByTag(boardTag)

        if(!result){
            res.status(HTTP_CODES.NO_CONTENT_204).send()
        }
        else{
            res.status(HTTP_CODES.OK_200).json(result)
        }
    },

    async addNewPost(req : RequestWithURIParamsAndBody<GetBoardURIModel, CreatePostBodyModel>,
                     res : Response<PostViewModel> ){
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

    },

    async postGet(req : RequestWithURIParam<GetPostURIModel>,
                  res : Response<PostViewModel>){
        const boardTag : string = req.params.boardTag
        const postID : number = +req.params.postId

        const post : PostViewModel | null = await BoardsService.GetPost(boardTag, postID)

        if(!post){
            res.status(HTTP_CODES.NO_CONTENT_204).send()
        }
        else{
            res.status(HTTP_CODES.OK_200).json(post)
        }
    },

    async addNewReply(req : RequestWithURIParamsAndBody<GetPostURIModel, CreateReplyBodyModel>,
                                        res : Response<ReplyViewModel>){
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
    },

    async deletePost(req : Request<GetPostURIModel>,
                     res : Response<PostViewModel>){
        const postId : number = +req.params.postId
        const userId : number = +res.locals.id
        const userRole : string = res.locals.role

        if(!userId || !postId){
            res.status(HTTP_CODES.BAD_REQUEST_400).send()
            return
        }
        if(!userRole){
            res.status(HTTP_CODES.UNAUTHORIZED_401).send()
            return
        }
        if(userRole == "REQUEST"){
            res.status(HTTP_CODES.FORBIDDEN_403).send()
        }


        const deletedPost : PostViewModel | null = await BoardsService.DeletePost(userId, postId)

        if(!deletedPost){
            res.status(HTTP_CODES.NO_CONTENT_204).send()
            return
        }

        res.status(HTTP_CODES.OK_200).json(deletedPost)
    }
}

