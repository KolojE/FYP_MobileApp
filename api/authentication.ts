import axios from "axios";
import * as securestore from "expo-secure-store"
import IUser from "./Models/User";
import { api_url } from "../env";
import errorHandler from "./errorHandler/axiosError";


interface login {
    identifier: String,
    password: String,

}


export async function authenticate(login: login): Promise<IUser> {
    console.log(login)
    try {
        const res = await axios.post(`${api_url}/login`, {
            identifier: login.identifier,
            password: login.password,
        });
        if (res.status === 200 && res.headers.hasAuthorization) {
            const jsonWebToken = res.headers.authorization;
            console.log(jsonWebToken)
            await securestore.setItemAsync("jwt", jsonWebToken.toString());
        }
        const loginUser: IUser = res.data.loginUser;
        return loginUser;

    }
    catch (err) {
        console.log(err)
        errorHandler(err);
    }
}

export async function tokenAuthentication(token:string):Promise<IUser>{
    console.log(token)
    try{
        const res= await axios.get(`${api_url}/login`,{
            headers:{
                Authorization:`${token}`,
            }
        })
        console.log(res.data.loginUser);
        const loginUser:IUser = res.data.loginUser
        return loginUser
    }
    catch(err){
        errorHandler(err)
    }
}