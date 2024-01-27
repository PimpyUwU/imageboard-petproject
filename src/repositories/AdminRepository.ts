import {PrismaClient} from "@prisma/client"
import {UserORMModelIn} from "../../types/models/Admin/Input/ORM/UserORMModelIn";
import {UserORMModelOut} from "../../types/models/Admin/Output/ORM/UserORMModelOut";
import bcrypt from "bcrypt";

const prisma : PrismaClient = new PrismaClient()


export const AdminRepository = {
    async signUp(userData : UserORMModelIn) : Promise<UserORMModelOut | null>  {
        //Hashing password
        const salt = await bcrypt.genSalt()
        userData.userPassword = await bcrypt.hash(userData.userPassword, salt)

        return prisma.user.create({
            data : {
                nickname : userData.userNickname,
                email : userData.userEmail,
                password : userData.userPassword
            },
            include : {
                Deleted_posts : true,
                Deleted_replies : true
            }
        })
    }
}