import {AdminRepository} from "../repositories/AdminRepository";
import {UserServiceModelIn} from "../../types/models/Admin/Input/ServiceModels/UserServiceModelIn";
import {UserORMModelIn} from "../../types/models/Admin/Input/ORM/UserORMModelIn";
import {UserORMModelOut} from "../../types/models/Admin/Output/ORM/UserORMModelOut";
import {UserServiceModelOut} from "../../types/models/Admin/Output/ServiceModels/UserServiceModelOut";

export const AdminService  = {
    async signUp(userData : UserServiceModelIn) : Promise<UserServiceModelOut | null>{
        const user : UserORMModelIn = {
            userNickname : userData.userNickname,
            userEmail : userData.userEmail,
            userPassword : userData.userPassword
        }
        if(!user.userEmail || !user.userPassword){
            return null
        }

        try {
            const createdUser: UserORMModelOut | null = await AdminRepository.signUp(user)

            if(!createdUser){
                return null
            }
            return createdUser
        }
        catch (err){
            throw err
        }
    }
}