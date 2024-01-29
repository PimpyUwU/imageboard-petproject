import {AdminRepository} from "../repositories/AdminRepository";
import {SignUpServiceModelIn} from "../../types/models/Admin/Input/ServiceModels/SignUpServiceModelIn";
import {SignUpORMModelIn} from "../../types/models/Admin/Input/ORM/SignUpORMModelIn";
import {UserORMModelOut} from "../../types/models/Admin/Output/ORM/UserORMModelOut";
import {UserServiceModelOut} from "../../types/models/Admin/Output/ServiceModels/UserServiceModelOut";
import {LogInServiceModelIn} from "../../types/models/Admin/Input/ServiceModels/LogInServiceModelIn";
import {LogInORMModelIn} from "../../types/models/Admin/Input/ORM/LogInORMModelIn";

export const AdminService  = {
    async signUp(userData : SignUpServiceModelIn) : Promise<UserServiceModelOut | null>{
        const user : SignUpORMModelIn = {
            userNickname : userData.userNickname,
            userEmail : userData.userEmail,
            userPassword : userData.userPassword
        }

        if(!user.userEmail || !user.userPassword){
            return null
        }

        try {
            const createdUser:  UserORMModelOut | null = await AdminRepository.signUp(user)

            if(!createdUser){
                return null
            }
            return createdUser
        }
        catch (err){
            throw err
        }
    },

    async logIn(user : LogInServiceModelIn) {
        const userData : LogInORMModelIn = {
            email : user.email,
            password : user.password
        }

        try {
            const rUser : UserORMModelOut = await AdminRepository.logIn(userData)

            const mappedUser : UserServiceModelOut = {
                id : rUser.id,
                nickname : rUser.nickname,
                email : rUser.email,
                password : rUser.password,
                role : rUser.role,
                is_verified : rUser.is_verified,
                Deleted_posts : rUser.Deleted_posts,
                Deleted_replies : rUser.Deleted_replies,
            }

            return mappedUser
        }
        catch (err){
            throw err
        }
    }
}