import {PostORMModel} from "./PostORMModel";

export type BoardORMModel = {
    id : number,
    tag : string,
    name : string,
    description : string,
    posts : PostORMModel[]
}