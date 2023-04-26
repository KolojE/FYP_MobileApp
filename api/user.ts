import axios, { AxiosHeaders, RawAxiosRequestHeaders } from "axios";
import IUser from "./Models/User";
import { api_url } from "../env";
import IOrganization from "./Models/Organization";
import { jwtTokenInterception } from "./interceptor/jwtTokenInterception";
import Form from "./Models/Form";
import errorHandler from "./errorHandler/axiosError";


type UserInfo = {
    loggedInUser: IUser,
    organization: IOrganization,

}

axios.interceptors.request.use(jwtTokenInterception);

export async function getLoggedInUserInfo(): Promise<UserInfo> {

    try {

        const res = await axios.get(`${api_url}/user/getUserInfo`)
        const LoggedInUser = res.data
        return LoggedInUser
    } catch (err) {
        errorHandler(err);
    }
}

export async function getForms(): Promise<Array<Form>> {

    try {
        const res = await axios.get(`${api_url}/user/getForms`);
        const forms = res.data.forms;
        return forms;
    } catch (err) {
        errorHandler(err)
    }

}

export async function getForm(id: String): Promise<Form> {
    try {
        const res = await axios.get(`${api_url}/user/getForm`,{
            params:{
                _id:id
            }
        });
        const form = res.data.form;
        return form;

    } catch (err) {
        errorHandler(err)
    }

}