import {Request} from "express";



export interface RequestWithJWT extends Request {
    cookies: {
        jwt : string | null
    };
}
export type RequestWithURIParam<T> = Request<T>
export type RequestWithBody<T> = Request<{}, {}, T>
export type RequestWithURIParamsAndBody<T, U> = Request<T, {}, U>