import {PrismaClient} from '@prisma/client'
import {BoardORMModeOut} from "../../types/models/Output/ORM/BoardORMModeOut";
import {PostORMModelOut} from "../../types/models/Output/ORM/PostORMModelOut";
import {PostORMModelIn} from "../../types/models/Input/ORM/PostORMModelIn";

const prisma: PrismaClient = new PrismaClient()

export const BoardsRepository = {
    async GetAllBoards() : Promise<BoardORMModeOut[] | null> {
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


    async GetBoardByTag(tag: string) : Promise<BoardORMModeOut | null> {
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

    async AddPost(post : PostORMModelIn): Promise<PostORMModelOut | null> {
        let board_id: number | null = null;

        const board = await prisma.boards.findFirst({
            where: {
                tag: post.boardTag
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

        return prisma.post.create({
            data: {
                board_id : board_id,
                title : post.postTitle,
                text : post.postText
            },
            include: {
                reply: true
            }
        })
    },

    async GetPost(boardTag : string, postId : number) : Promise<PostORMModelOut | null>{
        return prisma.post.findFirst({
            where: {
                id: postId,
                board: {
                    tag: boardTag
                },
                is_deleted : false
            },
            include: {
                reply: true
            }
        });
    }

}