import {BoardsRepository} from "../repositories/BoardsRepository";
import {BoardViewModel} from "../../types/models/Output/ViewModels/BoardViewModel";
import {BoardsListViewModel} from "../../types/models/Output/ViewModels/BoardsListViewModel";
import {BoardORMModeOut} from "../../types/models/Output/ORM/BoardORMModeOut";
import {PostViewModel} from "../../types/models/Output/ViewModels/PostViewModel";
import {PostORMModelOut} from "../../types/models/Output/ORM/PostORMModelOut";
import {PostServiceModelIn} from "../../types/models/Input/ServiceModels/PostServiceModelIn";
import {PostORMModelIn} from "../../types/models/Input/ORM/PostORMModelIn";

export const BoardsService = {
    async GetAllBoards() : Promise<BoardsListViewModel[] | null> {
        const boards : BoardORMModeOut[] | null = await BoardsRepository.GetAllBoards()

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
        const board : BoardORMModeOut | null = await BoardsRepository.GetBoardByTag(tag)

        if(!board){
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

    async AddPost(postData : PostServiceModelIn) : Promise<PostViewModel | null>{
        if(!await BoardsRepository.CheckIfBoardExists(postData.boardTag) || !postData.postTitle || !postData.postText) {
            return null
        }

        //map postData from PostServiceModel to PostORMModel (input)
        const post : PostORMModelIn = {
            boardTag : postData.boardTag,
            postTitle : postData.postTitle,
            postText : postData.postText
        }

        const createdPost : PostORMModelOut | null = await BoardsRepository.AddPost(post)

        if (!createdPost){
            return null
        }

        //Mapping PostORMModel to PostViewModel
        return {
            id : createdPost.id,
            title : createdPost.title,
            text : createdPost.text,
            creation_time : createdPost.creation_time,
            reply : createdPost.reply
        }
    },

    async GetPost(boardTag : string, postId : number) : Promise<PostViewModel | null>{
        const foundPost : PostORMModelOut | null = await BoardsRepository.GetPost(boardTag, postId);

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
    },

    async AddReplyToPost(){}
}