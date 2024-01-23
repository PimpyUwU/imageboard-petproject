import {PrismaClient} from '@prisma/client'
import {BoardORMModel} from "../../types/models/ORM/BoardORMModel";
import {PostORMModel} from "../../types/models/ORM/PostORMModel";
import {create} from "node:domain";

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
    },

    async CheckIfBoardExists(tag : string) : Promise<boolean> {
        return !!prisma.boards.findFirst({
            where: {
                tag: tag
            }
        })
    },

    async AddPost(boardTag : string, postTitle : string, postText : string) : Promise<PostORMModel | null> {
        let boardId: number | null = null;

        const board = await prisma.boards.findFirst({
            where: {
                tag: boardTag
            },
            select: {
                id: true
            }
        });

        if (board) {
            boardId = board.id;
        }
        else return null

        prisma.post.create({

        })




    }
}