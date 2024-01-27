import {PostORMModelOut} from "./PostORMModelOut";

export type BoardORMModeOut = {
    id : number,
    tag : string,
    name : string,
    description : string,
    posts : PostORMModelOut[]
}