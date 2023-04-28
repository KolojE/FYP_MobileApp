import axios from "axios"
import { api_url } from "../env"
import errorHandler from "./errorHandler/axiosError"


export type registrationForm ={
    email:string,
    password:string,
    organization:{
        ID:string,
    }
    name:string,
    
}
export async function registration(form:registrationForm)
{
    try{

        const registeredUser =await axios.post(`${api_url}/register`,{
            email:form.email,
            password:form.password,
            organization:{
                ID:form.organization.ID
                
            },
            name:form.name,
            
            
        })
    }catch(err)
    {
        errorHandler(err);
    }
}