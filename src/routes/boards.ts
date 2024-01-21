import express, {Response, Request} from "express";
import {RequestWithURIParam} from "../../types/RequestTypes";
import {GetBoardURIModel} from "../../types/models/GetBoardURIModel";
import {BoardViewModel} from "../../types/models/BoardViewModel";

export const GetBoardsRouter = () => {
    const router = express.Router()

    router.get("/", (req: Request,  res: Response) => {

    })

    router.get("/:tag", (req : RequestWithURIParam<GetBoardURIModel>,
                         res : Response<BoardViewModel> ) => {

    })
}