import {AdminRepository} from "../repositories/AdminRepository";
import {UserServiceModelIn} from "../../types/models/Admin/Input/ServiceModels/UserServiceModelIn";
import {UserORMModelIn} from "../../types/models/Admin/Input/ORM/UserORMModelIn";
import * as querystring from "querystring";
import {UserORMModelOut} from "../../types/models/Admin/Output/ORM/UserORMModelOut";

export const AdminService  = {
    async signUp(userData : UserServiceModelIn){
        const user : UserORMModelIn = {
            userNickname : userData.userNickname,
            userEmail : userData.userEmail,
            userPassword : userData.userPassword
        }
        if(!user.userEmail || !user.userPassword){
            return null
        }

        const createdUser : UserORMModelOut | null = await AdminRepository.signUp(user)
        if(!createdUser){
            return null
        }


    }
}