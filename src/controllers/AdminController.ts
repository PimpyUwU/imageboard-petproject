import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import {AdminService} from "../services/AdminService";
import {RequestWithBody} from "../../types/RequestTypes";
import {SignInBodyModel} from "../../types/models/Admin/Input/RequestModels/SignInBodyModel";
import {UserViewModel} from "../../types/models/Admin/Output/ViewModels/UserViewModel";
import {UserServiceModelIn} from "../../types/models/Admin/Input/ServiceModels/UserServiceModelIn";
import {SECRET_KEY} from "../../env";
import {UserServiceModelOut} from "../../types/models/Admin/Output/ServiceModels/UserServiceModelOut";
import HTTP_CODES from "../HTTP_CODES";
import {Prisma} from "@prisma/client";

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
        try{
            const createdUser : UserServiceModelOut | null = await AdminService.signUp(userData)

            if(!createdUser){
                res.status(HTTP_CODES.BAD_REQUEST_400).send()
                return
            }

            const token : string = await createJwt(createdUser.id)

            //successfully created user
            res.cookie('jwt', token, {
                httpOnly : true,
                maxAge : 3 * 24 * 60 * 60 * 1000
            })
            res.status(HTTP_CODES.CREATED_201).json({user : createdUser.id})
        }
        catch (err){
            //email already used
            if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
                res.status(HTTP_CODES.EMAIL_ALREADY_USED).send
            }
        }

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
const createJwt = async (id : number) : Promise<string> => {
    return jwt.sign({id}, SECRET_KEY, {
        expiresIn : 3 * 24 * 60 * 60
    })
}