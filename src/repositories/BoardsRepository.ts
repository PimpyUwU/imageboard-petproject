import {PrismaClient} from '@prisma/client'
import {BoardORMModel} from "../../types/models/ORM/BoardORMModel";
import {PostORMModel} from "../../types/models/ORM/PostORMModel";
import {CreatePostORMModel} from "../../types/models/ORM/CreatePostORMModel";

const prisma: PrismaClient = new PrismaClient()

export const BoardsRepository = {
    async GetAllBoards() : Promise<BoardORMModel[] | null> {
        return prisma.boards.findMany(
            {
                include : {
                    posts : {
                        include : {
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
            include : {
                posts : {
                    include : {
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

    async AddPost(boardTag: string, post_title: string, post_text: string): Promise<PostORMModel | null> {
        let board_id: number | null = null;

        const board = await prisma.boards.findFirst({
            where: {
                tag: boardTag
            },
            select: {
                id: true
            }
        });

        if (!board) {
            return null;
        } else {
            board_id = board.id;
        }

        const postData: CreatePostORMModel = {
            title: post_title,
            text: post_text,
            board_id: board_id
        };

        return prisma.post.create({
            data: postData,
            include: {
                reply: true
            }
        })
    }

}