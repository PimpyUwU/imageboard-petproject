import {BoardsRepository} from "../repositories/BoardsRepository";
import {BoardViewModel} from "../../types/models/Boards/Output/ViewModels/BoardViewModel";
import {BoardsListViewModel} from "../../types/models/Boards/Output/ViewModels/BoardsListViewModel";
import {BoardORMModeOut} from "../../types/models/Boards/Output/ORM/BoardORMModeOut";
import {PostViewModel} from "../../types/models/Boards/Output/ViewModels/PostViewModel";
import {PostORMModelOut} from "../../types/models/Boards/Output/ORM/PostORMModelOut";
import {PostServiceModelIn} from "../../types/models/Boards/Input/ServiceModels/PostServiceModelIn";
import {PostORMModelIn} from "../../types/models/Boards/Input/ORM/PostORMModelIn";
import {ReplyServiceModelin} from "../../types/models/Boards/Input/ServiceModels/ReplyServiceModelIn";
import {ReplyViewModel} from "../../types/models/Boards/Output/ViewModels/ReplyViewModel";
import {ReplyORMModelin} from "../../types/models/Boards/Input/ORM/ReplyORMModelin";
import {ReplyORMModelOut} from "../../types/models/Boards/Output/ORM/ReplyORMModelOut";

export const BoardsService = {
    async GetAllBoards(): Promise<BoardsListViewModel[] | null> {
        const boards: BoardORMModeOut[] | null = await BoardsRepository.GetAllBoards()

        if (!boards || boards.length == 0) {
            return null
        }

        return boards.map(value => {
            return {
                tag: value.tag,
                name: value.name
            };
        });
    },

    async GetBoardByTag(tag: string): Promise<BoardViewModel | null> {
        const board: BoardORMModeOut | null = await BoardsRepository.GetBoardByTag(tag)

        if (!board) {
            return null
        }

        //mapping board from BoardORMModeOut to BoardViewModel, filtering all deleted posts
        //and replies, mapping them
        return {
            tag: board.tag,
            name: board.name,
            description: board.description,
            posts: board.posts
                .filter(post => !post.is_deleted)
                .map(post => ({
                    id: post.id,
                    title: post.title,
                    text: post.text,
                    creation_time: post.creation_time,
                    reply: post.reply
                        .filter(reply => !reply.is_deleted)
                        .map(reply => ({
                            id: reply.id,
                            title: reply.title,
                            text: reply.text,
                            creation_time: reply.creation_time,
                            reply_id: reply.reply_id,
                            post_id: reply.post_id
                        }))
                }))
        }
    },

    async AddPost(postData: PostServiceModelIn): Promise<PostViewModel | null> {
        //map postData from PostServiceModel to PostORMModel (Input)
        const post: PostORMModelIn = {
            boardTag: postData.boardTag,
            postTitle: postData.postTitle,
            postText: postData.postText
        }

        const createdPost: PostORMModelOut | null = await BoardsRepository.AddPost(post)

        if (!createdPost) {
            return null
        }

        //Mapping PostORMModel to PostViewModel
        return {
            id: createdPost.id,
            title: createdPost.title,
            text: createdPost.text,
            creation_time: createdPost.creation_time,
            reply: createdPost.reply
        }
    },

    async GetPost(boardTag: string, postId: number): Promise<PostViewModel | null> {
        if (postId && boardTag) {
            const foundPost: PostORMModelOut | null = await BoardsRepository.GetPost(boardTag, postId);

            if (!foundPost) {
                return null
            }

            //Mapping post ORM model to view model
            return {
                id: foundPost.id,
                title: foundPost.title,
                text: foundPost.text,
                creation_time: foundPost.creation_time,
                reply: foundPost.reply
            }
        }
        return null
    },

    async AddReplyToPost(reply: ReplyServiceModelin): Promise<ReplyViewModel | null> {
        const replyData: ReplyORMModelin = {
            replyTitle: reply.replyTitle,
            replyText: reply.replyText,
            replyId: reply.replyTo,
            boardTag: reply.boardTag,
            postId: reply.postId
        }

        if (!await BoardsRepository.GetPost(reply.boardTag, reply.postId))
            return null

        const createdReply: ReplyORMModelOut | null = await BoardsRepository.AddReplyToPost(replyData)

        if (!createdReply) {
            return null
        }

        //mapping ReplyORMModelOut to ReplyViewModel
        return {
            id: createdReply.id,
            title: createdReply.title,
            text: createdReply.text,
            creation_time: createdReply.creation_time,
            reply_id: createdReply.reply_id,
            post_id: createdReply.post_id
        };
    },

    async DeletePost(userId: number, postId: number): Promise<PostViewModel | null> {
        const post: PostORMModelOut | null = await BoardsRepository.DeletePost(userId, postId)

        if (!post) {
            return null
        }

        //mapping post to view model
        return {
            id: post.id,
            title: post.title,
            text: post.text,
            creation_time: post.creation_time,
            reply: post.reply
        }
    },

    async DeleteReply(userId: number, replyId: number): Promise<ReplyViewModel | null> {
        const deletedReply: ReplyORMModelOut | null = await BoardsRepository.DeleteReply(userId, replyId)

        if (!deletedReply)
            return null

        return {
            id: deletedReply.id,
            title: deletedReply.title,
            text: deletedReply.text,
            reply_id: deletedReply.reply_id,
            post_id: deletedReply.post_id,
            creation_time: deletedReply.creation_time
        }
    }
}