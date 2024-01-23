import express from "express"
import {GetBoardsRouter} from "./routes/BoardsRouter";

export const app: express.Express = express()

app.use(express.json())

app.use('/', GetBoardsRouter())