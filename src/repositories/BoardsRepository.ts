import {PrismaClient} from '@prisma/client'
import {BoardORMModel} from "../../types/models/ORM/BoardORMModel";

const prisma: PrismaClient = new PrismaClient()

export const BoardsRepository = {
    async GetAllBoards() : Promise<BoardORMModel[] | null> {
        return prisma.boards.findMany(
            {
                select : {
                    id : true,
                    tag: true,
                    name : true,
                    description : true,
                    posts : {
                        select : {
                            id : true,
                            title : true,
                            text : true,
                            creation_time : true,
                            is_deleted : true,
                            board_id : true,
                            reply : true
                        }
                    }
                },
            }
        );
    },


    async GetBoardByTag(tag: string) : Promise<BoardORMModel | null> {
        return prisma.boards.findFirst({
            where : {
                tag: tag
            },
            select : {
                id : true,
                tag: true,
                name : true,
                description : true,
                posts : {
                    select : {
                        id : true,
                        title : true,
                        text : true,
                        creation_time : true,
                        is_deleted : true,
                        board_id : true,
                        reply : true
                    }
                }
            }
        })
    }
}