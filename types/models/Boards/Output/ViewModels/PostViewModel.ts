import {ReplyViewModel} from "./ReplyViewModel";

export type PostViewModel = {
    id : number,
    title : string,
    text : string,
    creation_time : Date,
    reply : ReplyViewModel[] | null
}