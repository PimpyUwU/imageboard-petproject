import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import {AdminService} from "../services/AdminService";
import {RequestWithBody} from "../../types/RequestTypes";
import {SignUpBodyModel} from "../../types/models/Admin/Input/RequestModels/SignUpBodyModel";
import {UserViewModel} from "../../types/models/Admin/Output/ViewModels/UserViewModel";
import {SignUpServiceModelIn} from "../../types/models/Admin/Input/ServiceModels/SignUpServiceModelIn";
import {SECRET_KEY} from "../../env";
import {UserServiceModelOut} from "../../types/models/Admin/Output/ServiceModels/UserServiceModelOut";
import HTTP_CODES from "../HTTP_CODES";
import {Prisma} from "@prisma/client";
import {LogInBodyModel} from "../../types/models/Admin/Input/RequestModels/LogInBodyModel";
import {LogInServiceModelIn} from "../../types/models/Admin/Input/ServiceModels/LogInServiceModelIn";

export const AdminController = {
    async signUpGet(req : Request,
                    res: Response){
        res.status(200).send()
    },

    async signUpPost(req : RequestWithBody<SignUpBodyModel>,
                     res : Response<UserViewModel>){
        const userData : SignUpServiceModelIn = {
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
            res.status(HTTP_CODES.CREATED_201).json({id : createdUser.id})
        }
        catch (err){
            //email already used
            if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
                res.status(HTTP_CODES.EMAIL_ALREADY_USED).send()
            }
            res.status(HTTP_CODES.BAD_REQUEST_400).send()
        }

    },

    async logInGet(req : Request,
                   res : Response){
        res.status(HTTP_CODES.OK_200).send()
    },

    async logInPost(req : Request<LogInBodyModel>,
                    res : Response){
        const userData : LogInServiceModelIn = {
            email : req.body.email,
            password : req.body.password
        }

        try {
            const user : UserServiceModelOut = await AdminService.logIn(userData)

            const token : string = await createJwt(user.id)

            //successfully logged-in user
            res.cookie('jwt', token, {
                httpOnly : true,
                maxAge : 3 * 24 * 60 * 60 * 1000
            })
            res.status(HTTP_CODES.CREATED_201).json({id : user.id})
        }
        catch (err){
            if(err instanceof Error){
                if(err.message === "password" || err.message === "email"){
                    res.status(HTTP_CODES.UNAUTHORIZED_401).send()
                }
            }
            res.status(HTTP_CODES.BAD_REQUEST_400).send()
        }


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