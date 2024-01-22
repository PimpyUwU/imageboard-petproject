import {ReplyORMModel} from "./ReplyORMModel";

export type PostORMModel = {
    id: number;
    title: string;
    text: string;
    creation_time: Date;
    is_deleted: boolean;
    board_id: number;
    reply : ReplyORMModel[]
}