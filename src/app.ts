import express from "express"
import {GetBoardsRouter} from "./routes/BoardsRouter";
import {GetAdminRouter} from "./routes/AdminRouter";

export const app: express.Express = express()

app.use(express.json())

app.use('/admin', GetAdminRouter())

app.use('/', GetBoardsRouter())
