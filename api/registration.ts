import axios from "axios"
import { api_url } from "../env"
import errorHandler from "./errorHandler/axiosError"
import IUser from "../types/Models/User"
import * as securestore from "expo-secure-store"

import { RegistrationCredentials } from "../types/General"
import IOrganization from "../types/Models/Organization"

export async function registration(form: RegistrationCredentials): Promise<IUser> {
    try {

        const res = await axios.post(`${api_url}/register`, {
            email: form.email,
            password: form.password,
            organization: {
                ID: form.organization.ID
            },
            name: form.name,

        })
        const registeredUser = res.data.user
        const jsonWebToken = res.headers.authorization;
        if (jsonWebToken) {
            await securestore.setItemAsync("jwt", jsonWebToken?.toString());
        }
        return registeredUser
    } catch (err) {
        errorHandler(err)
        throw err
    }
}

export async function getOrganization(ID: string): Promise<IOrganization> {
    try {
        const res = await axios.get(`${api_url}/organization/getOrganization`, {
            params: {
                ID: ID
            }
        })

        if (!res.data.result) {
            throw new Error("Organization not found")
        }

        return res.data.result
    }
    catch (err) {
        errorHandler(err)
    }
}