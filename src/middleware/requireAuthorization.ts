import {NextFunction, Response} from "express";
import {SECRET_KEY} from "../../env";
import jwt from "jsonwebtoken";
import {RequestWithJWT} from "../../types/RequestTypes";
import HTTP_CODES from "../HTTP_CODES";

export const requireAuthorization = (req : RequestWithJWT, res : Response, next : NextFunction) => {
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
}