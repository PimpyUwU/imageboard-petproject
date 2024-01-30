import {NextFunction, Response} from "express";
import {SECRET_KEY} from "../../env";
import * as jwt from "jsonwebtoken"
import {RequestWithJWT} from "../../types/RequestTypes";



export const authorizationMiddleware = {
    async requireAuthorization(req : RequestWithJWT, res : Response, next : NextFunction){
        const token : string | null  = req.cookies.jwt


        if(token){
            jwt.verify(token, SECRET_KEY,(error, decodedToken) => {
                if(error){
                    res.redirect("/admin/log-in")
               }
                else
                    next()
            })
        }
        else res.redirect("/admin/log-in")
    },

    async checkUserRole(req : RequestWithJWT, res : Response, next : NextFunction){
        const token : string | null = req.cookies.jwt

        if(token){
            const payload = <jwt.UserJwtPayload>jwt.verify(token, SECRET_KEY);
            res.locals = {
                id : payload.id,
                role : payload.role
            }
            next()

        }
        else res.redirect("/admin/log-in")
    }
}
