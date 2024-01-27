import {Request, Response} from "express";
import jwt, {Jwt} from "jsonwebtoken";
import {AdminService} from "../services/AdminService";
import {RequestWithBody} from "../../types/RequestTypes";
import {SignInBodyModel} from "../../types/models/Admin/Input/RequestModels/SignInBodyModel";
import {UserViewModel} from "../../types/models/Admin/Output/ViewModels/UserViewModel";
import {UserServiceModelIn} from "../../types/models/Admin/Input/ServiceModels/UserServiceModelIn";


export const AdminController = {
    async signUpGet(req : Request,
                    res: Response){
        res.status(200).send()
    },

    async signUpPost(req : RequestWithBody<SignInBodyModel>,
                     res : Response<UserViewModel>){
        const userData : UserServiceModelIn = {
            userNickname : req.body.userNickname,
            userEmail : req.body.email,
            userPassword : req.body.password
        }

        await AdminService.signUp(userData)


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
const createJwt = async (id : number) : Promise<Jwt> => {
    return jwt.sign({id})
}