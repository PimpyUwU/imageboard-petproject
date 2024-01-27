export type ReplyORMModelOut = {
    id: number,
    title: string,
    text: string,
    creation_time: Date,
    is_deleted: boolean,
    reply_id : number | null,
    post_id: number,
}