import axios from "axios"
import { api_url } from "../env"
import errorHandler from "./errorHandler/axiosError"
import IUser from "./Models/User"


export type registrationForm ={
    email:string,
    password:string,
    organization:{
        ID:string,
    }
    name:string,
    
}
export async function registration(form:registrationForm):Promise<IUser>
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
        const registeredUser = res.data.user;
        return registeredUser
    }catch(err)
    {
        errorHandler(err);
    }
}