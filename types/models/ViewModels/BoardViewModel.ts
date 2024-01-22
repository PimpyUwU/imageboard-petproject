import {PostViewModel} from "./PostViewModel";

export type BoardViewModel = {
    tag: string,
    name: string,
    description: string
    posts : PostViewModel[]
}