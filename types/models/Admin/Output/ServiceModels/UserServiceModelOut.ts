import {DeletedPostORMModelOut} from "../ORM/DeletedPostORMModelOut";
import {DeletedReplyORMModelOut} from "../ORM/DeletedReplyORMModelOut";

export type UserServiceModelOut = {
    id : number,
    nickname : string,
    email : string,
    password : string,
    role : string,
    Deleted_posts :  DeletedPostORMModelOut[] | null,
    Deleted_replies : DeletedReplyORMModelOut[]| null,
    is_verified : boolean
}