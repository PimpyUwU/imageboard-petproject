export type ReplyORMModel = {
    id: number,
    title: string,
    text: string,
    creation_time: Date,
    is_deleted: boolean,
    reply_id : number,
    post_id: number,
}