import jwt from "jsonwebtoken"

declare module "jsonwebtoken" {
    export interface UserJwtPayload extends jwt.JwtPayload{
        id : string
        role : string
    }
}