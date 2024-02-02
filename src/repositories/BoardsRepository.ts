import {PrismaClient} from '@prisma/client'
import {BoardORMModeOut} from "../../types/models/Boards/Output/ORM/BoardORMModeOut";
import {PostORMModelOut} from "../../types/models/Boards/Output/ORM/PostORMModelOut";
import {PostORMModelIn} from "../../types/models/Boards/Input/ORM/PostORMModelIn";
import {ReplyORMModelin} from "../../types/models/Boards/Input/ORM/ReplyORMModelin";
import {ReplyORMModelOut} from "../../types/models/Boards/Output/ORM/ReplyORMModelOut";

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
    },

    async AddReplyToPost(reply : ReplyORMModelin) : Promise<ReplyORMModelOut | null> {
        return prisma.reply.create({
            data: {
                title: reply.replyTitle,
                text: reply.replyText,
                reply_id: reply.replyId,
                post_id: reply.postId
            }
        });
    },

    async DeletePost(userId : number, postId : number) : Promise<PostORMModelOut | null> {
        try {
            const post: PostORMModelOut | null = await prisma.post.update({
                data: {
                    is_deleted: true,
                },
                where: {
                    id: postId
                },
                include: {
                    reply: true
                }
            })

            if (!post){
                return null
            }

            const replyIDs : {id : number}[] = await prisma.reply.findMany({
                where : {
                    post_id : postId
                },
                select : {
                    id : true
                }
            })

            //marking replies as deleted
            await prisma.$transaction(
                replyIDs.map((reply) => {
                        return prisma.reply.update({
                            where: {
                                id : reply.id
                            },
                            data: {
                                is_deleted: true
                            },
                            select: {
                                id: true
                            }
                        })
                    }
                )
            );

            const data: {reply_id : number, admin_id : number}[] = []
            //moving data to input ORM object
            for(let i = 0 ; i < replyIDs.length; i++){
                data.push({
                    reply_id : replyIDs[i].id,
                    admin_id : userId
                })
            }

            prisma.deleted_posts.create({
                data : {
                    admin_id : userId,
                    post_id : postId
                }
            })

            if(replyIDs.length != 0){
                prisma.deleted_replies.createMany({
                        data : data
                })
            }



            return post
        }
        catch (err){
            throw err
        }
    },

    async DeleteReply(userId : number, replyId : number) : Promise<ReplyORMModelOut | null>{
        try{
            const deletedReply : ReplyORMModelOut | null = await prisma.reply.delete({
                where : {
                    id : replyId
                }
            })

            if(!deletedReply){
                return null
            }
            prisma.deleted_replies.create({
                data : {
                    reply_id : deletedReply.id,
                    admin_id : userId
                }
            })

            return deletedReply
        }
        catch (err){
            throw err
        }
    }
}