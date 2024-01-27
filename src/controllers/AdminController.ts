import {Request, Response} from "express";
import {AdminService} from "../services/AdminService";
import {RequestWithBody} from "../../types/RequestTypes";

export const AdminController = {
    async signUpGet(req : Request,
                    res: Response){
        res.status(200).send()
    },

    async signUpPost(req : RequestWithBody<any>,
                     res : Response){
    },

    async logInGet(req : Request,
                   res : Response){

    },

    async logInPost(req : Request,
                    res : Response){

    },

    async logOut(req : Request,
                 res : Response){

    }
}