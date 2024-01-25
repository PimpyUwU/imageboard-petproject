import {BoardsRepository} from "../repositories/BoardsRepository";
import {BoardViewModel} from "../../types/models/ViewModels/BoardViewModel";
import {BoardsListViewModel} from "../../types/models/ViewModels/BoardsListViewModel";
import {BoardORMModel} from "../../types/models/ORM/BoardORMModel";
import {PostViewModel} from "../../types/models/ViewModels/PostViewModel";
import {PostORMModel} from "../../types/models/ORM/PostORMModel";

export const BoardsService = {
    async GetAllBoards() : Promise<BoardsListViewModel[] | null> {
        const boards : BoardORMModel[] | null = await BoardsRepository.GetAllBoards()

        if(!boards || boards.length == 0){
            return null
        }

        return boards.map(value => {
            return {
                tag: value.tag,
                name: value.name
            };
        });
    },

    async GetBoardByTag(tag : string) : Promise<BoardViewModel | null>{
        const board : BoardORMModel | null = await BoardsRepository.GetBoardByTag(tag)

        if(!board){
            return null
        }

        //mapping board from BoardORMModel to BoardViewModel, filtering all deleted posts
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

    async AddPost(boardTag: string, postTitle: string, postText: string) : Promise<PostViewModel | null>{
        if(!await BoardsRepository.CheckIfBoardExists(boardTag) || !postTitle || !postText) {
            return null
        }

        const createdPost : PostORMModel | null = await BoardsRepository.AddPost(boardTag, postTitle, postText)

        if (!createdPost){
            return null
        }

        //Mapping post ORM model to view model
        return {
            id : createdPost.id,
            title : createdPost.title,
            text : createdPost.text,
            creation_time : createdPost.creation_time,
            reply : createdPost.reply
        }
    },

    async GetPost(boardTag : string, postId : number) : Promise<PostViewModel | null>{
        const foundPost : PostORMModel | null = await BoardsRepository.GetPost(boardTag, postId);

        if (!foundPost){
            return null
        }

        //Mapping post ORM model to view model
        return {
            id : foundPost.id,
            title : foundPost.title,
            text : foundPost.text,
            creation_time : foundPost.creation_time,
            reply : foundPost.reply
        }

    }
}