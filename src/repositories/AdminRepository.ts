import {PrismaClient, Prisma} from "@prisma/client"
import {UserORMModelIn} from "../../types/models/Admin/Input/ORM/UserORMModelIn";
import {UserORMModelOut} from "../../types/models/Admin/Output/ORM/UserORMModelOut";
import bcrypt from "bcrypt";

const prisma : PrismaClient = new PrismaClient()


export const AdminRepository = {
    signUp: async function (userData: UserORMModelIn): Promise<UserORMModelOut | null> {
        //Hashing password
        const salt = await bcrypt.genSalt()
        userData.userPassword = await bcrypt.hash(userData.userPassword, salt)

        try {
            return prisma.user.create({
                data: {
                    nickname: userData.userNickname,
                    email: userData.userEmail,
                    password: userData.userPassword
                },
                include: {
                    Deleted_posts: true,
                    Deleted_replies: true
                }
            })
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
                throw new Error("Email is already used")
            }

            return null
        }
    }
}