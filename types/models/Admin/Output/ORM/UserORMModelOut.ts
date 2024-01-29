import {DeletedPostORMModelOut} from "./DeletedPostORMModelOut";
import {DeletedReplyORMModelOut} from "./DeletedReplyORMModelOut";

export type UserORMModelOut = {
    id : number,
    nickname : string | null,
    email : string,
    password : string,
    role : string,
    Deleted_posts :  DeletedPostORMModelOut[] | null,
    Deleted_replies : DeletedReplyORMModelOut[]| null,
    is_verified : boolean
}