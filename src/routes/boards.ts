import express, {Response, Request} from "express";
import {RequestWithURIParam} from "../../types/RequestTypes";
import {GetBoardURIModel} from "../../types/models/GetBoardURIModel";
import {BoardViewModel} from "../../types/models/BoardViewModel";
import {BoardsListViewModel} from "../../types/models/BoardsListViewModel";
import {BoardsService} from "../services/BoardsService";
import HTTP_CODES from "../HTTP_CODES";

export const GetBoardsRouter = () => {
    const router = express.Router()

    router.get("/", async (_req: Request,
                                res: Response<BoardsListViewModel[]>) => {
        const result: BoardsListViewModel[] | null = await BoardsService.GetAllBoards()

        if(!result || result.length == 0){
            res.status(HTTP_CODES.NO_CONTENT_204).send()
        }
        else {
            res.status(HTTP_CODES.OK_200).send(result)
        }
    })

    router.get("/:tag", async (req : RequestWithURIParam<GetBoardURIModel>,
                                    res : Response<BoardViewModel> ) => {
        const result: BoardViewModel | null = await BoardsService.GetBoardByTag(req.params.tag)

        if(!result){
            res.status(HTTP_CODES.NO_CONTENT_204).send()
        }
        else{
            res.status(HTTP_CODES.OK_200).send(result)
        }
    })

    return router
}