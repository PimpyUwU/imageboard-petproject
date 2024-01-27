export type ReplyViewModel = {
    id : number
    title : string,
    text : string,
    creation_time : Date,
    reply_id : number | null,
    post_id : number
}