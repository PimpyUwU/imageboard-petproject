import {ReplyORMModelOut} from "./ReplyORMModelOut";

export type PostORMModelOut = {
    id: number;
    title: string;
    text: string;
    creation_time: Date;
    is_deleted: boolean;
    board_id: number;
    reply : ReplyORMModelOut[]
}