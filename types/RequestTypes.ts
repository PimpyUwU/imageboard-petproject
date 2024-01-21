import {Request} from "express";

export type RequestWithQueryParams<T> = Request<{}, {}, {}, T>
export type RequestWithURIParam<T> = Request<T>
export type RequestWithBody<T> = Request<{}, {}, T>
export type RequestWithURIParamsAndBody<T, U> = Request<T, {}, U>