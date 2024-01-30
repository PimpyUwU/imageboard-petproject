import express from "express"
import cookieParser from "cookie-parser";
import {GetBoardsRouter} from "./routes/BoardsRouter";
import {GetAdminRouter} from "./routes/AdminRouter";

export const app: express.Express = express()

//middleware
app.use(express.json())
app.use(cookieParser())

app.use('/admin', GetAdminRouter())

app.use('/', GetBoardsRouter())
