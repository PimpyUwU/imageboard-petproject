export type ReplyORMModel = {
    id: number,
    title: string,
    text: string,
    creation_time: Date,
    is_deleted: boolean,
    post_id: number,
}