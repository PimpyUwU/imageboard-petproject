import {PrismaClient} from '@prisma/client'
import {BoardORMModel} from "../../types/models/ORM/BoardORMModel";

const prisma: PrismaClient = new PrismaClient()

export const BoardsRepository = {
    async GetAllBoards() : Promise<BoardORMModel[] | null> {
        return prisma.boards.findMany();
    },


    async GetBoardByTag(tag: string) : Promise<BoardORMModel | null> {
        return prisma.boards.findFirst({
            where : {tag: tag}
        })
    }
}