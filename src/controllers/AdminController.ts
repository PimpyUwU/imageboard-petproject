import {Request, Response} from "express";
import {AdminService} from "../services/AdminService";
import {RequestWithBody} from "../../types/RequestTypes";
import {SignInBodyModel} from "../../types/models/Admin/Input/RequestModels/SignInBodyModel";
import {UserViewModel} from "../../types/models/Admin/Output/ViewModels/UserViewModel";

export const AdminController = {
    async signUpGet(req : Request,
                    res: Response){
        res.status(200).send()
    },

    async signUpPost(req : RequestWithBody<SignInBodyModel>,
                     res : Response<UserViewModel>){
        
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