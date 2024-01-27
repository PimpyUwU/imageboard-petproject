import {PrismaClient} from "@prisma/client"
import {UserORMModelIn} from "../../types/models/Admin/Input/ORM/UserORMModelIn";
import {UserRepositoryModelOut} from "../../types/models/Admin/Output/ORM/UserRepositoryModelOut";
import bcrypt from "bcrypt";

const prisma : PrismaClient = new PrismaClient()


export const AdminRepository = {
    async signUp(userData : UserORMModelIn) : Promise<UserRepositoryModelOut | null>  {
        //Hashing password
        const salt = await bcrypt.genSalt()
        userData.password = await bcrypt.hash(userData.password, salt)


    }
}