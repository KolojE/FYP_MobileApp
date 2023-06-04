import axios from "axios"
import { api_url } from "../env"
import errorHandler from "./errorHandler/axiosError"
import IUser from "../types/Models/User"
import * as securestore from "expo-secure-store"

import { RegistrationCredentials } from "../types/General"

export async function registration(form:RegistrationCredentials):Promise<IUser>
{
    try{

        const res=await axios.post(`${api_url}/register`,{
            email:form.email,
            password:form.password,
            organization:{
                ID:form.organization.ID
                
            },
            name:form.name,
            
        })
            const registeredUser=res.data.user
            const jsonWebToken = res.headers.authorization;
            await securestore.setItemAsync("jwt", jsonWebToken.toString());
        return registeredUser
    }catch(err)
    {
        errorHandler(err);
    }
}