import axios from "axios";
import * as securestore from "expo-secure-store"
import IUser from "../types/Models/User";
import { api_url } from "../env";
import errorHandler from "./errorHandler/axiosError";
import { LoginCredentials } from "../types/General";




export async function login(login: LoginCredentials): Promise<IUser> {
    try {

        console.log(api_url)
        const res = await axios.post(`${api_url}/login`, {
            identifier: login.identifier,
            password: login.password,
        });
        if (res.status === 200 && res.headers.hasAuthorization) {
            const jsonWebToken = res.headers.authorization;
            await securestore.setItemAsync("jwt", jsonWebToken.toString());
        }
        const loginUser: IUser = res.data.loginUser;
        return loginUser;

    }
    catch (err) {
        throw err
    }
}

export async function tokenLogin(token:string):Promise<IUser>{
    try{
        const res= await axios.get(`${api_url}/login`,{
            headers:{
                Authorization:`${token}`,
            }
        })
        const loginUser:IUser = res.data.loginUser
        return loginUser
    }
    catch(err){
        errorHandler(err)
    }
}