import express from "express";

export const GetAdminRouter = () : express.Router => {
    const router = express.Router()

    router.get('/sign-up', (req, res) => {
    })

    router.get('/log-in', (req, res) => {

    })

    router.post('/sign-in', () => {

    })

    router.post('/log-in', () => {

    })

    router.get('/log-out', () => {

    })

    return router
}