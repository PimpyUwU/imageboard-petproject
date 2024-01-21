import express from "express"

export const app: express.Express = express()

app.use(express.json())
