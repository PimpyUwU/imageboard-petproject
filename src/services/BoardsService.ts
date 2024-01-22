import {BoardsRepository} from "../repositories/BoardsRepository";
import {BoardViewModel} from "../../types/models/BoardViewModel";
import {BoardsListViewModel} from "../../types/models/BoardsListViewModel";
import {BoardORMModel} from "../../types/models/ORM/BoardORMModel";

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
        else return {
            tag : board.tag,
            name: board.name,
            description : board.description,
            posts : board.posts
        }
    }
}