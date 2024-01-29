import {PrismaClient, Prisma} from "@prisma/client"
import {SignUpORMModelIn} from "../../types/models/Admin/Input/ORM/SignUpORMModelIn";
import {UserORMModelOut} from "../../types/models/Admin/Output/ORM/UserORMModelOut";
import bcrypt from "bcrypt";
import {LogInORMModelIn} from "../../types/models/Admin/Input/ORM/LogInORMModelIn";

const prisma : PrismaClient = new PrismaClient()


export const AdminRepository = {
    async signUp(userData: SignUpORMModelIn): Promise<UserORMModelOut> {
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
        } catch (err) {
            throw err
        }
    },

    async logIn(userData : LogInORMModelIn) : Promise<UserORMModelOut> {
        const user : UserORMModelOut | null = await prisma.user.findFirst({
            where : {
                email : userData.email
            },
            include : {
                Deleted_posts : true,
                Deleted_replies : true
            }
        })

        if (!user){
            throw new Error("email")
        }
        if (!await bcrypt.compare(userData.password, user.password)){
            throw new Error("password")
        }

        return user
    }
}