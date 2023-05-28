import axios, { CancelTokenSource } from "axios";
import IUser from "./Models/User";
import { api_url } from "../env";
import IOrganization from "./Models/Organization";
import { jwtTokenInterception } from "./interceptor/jwtTokenInterception";
import Form from "./Models/Form";
import errorHandler from "./errorHandler/axiosError";
import * as FileSystem from 'expo-file-system';
import { getItemAsync } from "expo-secure-store";



axios.interceptors.request.use(jwtTokenInterception);

type UserInfo = {
    loggedInUser: IUser,
    organization: IOrganization,

}

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
        const res = await axios.get(`${api_url}/user/getForm`, {
            params: {
                _id: id
            }
        });
        const form = res.data.form;
        return form;

    } catch (err) {
        errorHandler(err)
    }

}

export async function uploadProfilePicture({ uri }: { uri: string, fileName: string }) {
    try {

        const uploadResult = await FileSystem.uploadAsync(`${api_url}/user/uploadProfilePicture`, uri, {
            httpMethod: 'POST',
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'profilePicture',
            headers: {
                authorization: `${await getItemAsync('jwt')}`
            }
        });

        console.log(uploadResult)
    } catch (err) {
        errorHandler(err)
    }
}

export async function getProfilePicture(userID: string) {
    try {
        const res = await axios.get(`${api_url}/user/getProfilePicture`, {
            params: {
                _id: userID
            }
        })

        return res.data
    } catch (err) {
        errorHandler(err)
    }
}



export type Openstreetmap = {
    display_name: string,
    lat: number,
    lon: number,
    boundingbox: Array<string>

}

let cancelTokenSource: CancelTokenSource = null;
//Open Street Map API
export async function searchAddress(query: string) {
    try {
        if (cancelTokenSource) {
            cancelTokenSource.cancel("new request made")
        }
        cancelTokenSource = axios.CancelToken.source();
        var addressSuggestion: Openstreetmap[] = []
        const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`, { cancelToken: cancelTokenSource.token })
        res.data.forEach(element => {
            const suggestion:Openstreetmap=element;
            suggestion.lat = parseFloat(element.lat)
            suggestion.lon = parseFloat(element.lon)
            
            addressSuggestion.push(suggestion)

        });
        return addressSuggestion;
    } catch (err) {
        errorHandler(err)
    }
}

