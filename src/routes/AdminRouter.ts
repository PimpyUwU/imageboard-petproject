import express from "express";
import {AdminController} from "../controllers/AdminController";
import {requireAuthorization} from "../middleware/requireAuthorization";


export const GetAdminRouter = () : express.Router => {
    const router = express.Router()

    router.get('/sign-up', AdminController.signUpGet)

    router.get('/log-in', AdminController.logInGet)

    router.post('/sign-up', AdminController.signUpPost)

    router.post('/log-in', AdminController.logInPost)

    router.get('/log-out', requireAuthorization, AdminController.logOut)

    return router
}