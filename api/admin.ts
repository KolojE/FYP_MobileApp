import axios from "axios";
import IForm from "./Models/Form";
import { api_url } from "../env";
import { jwtTokenInterception } from "./interceptor/jwtTokenInterception";
import errorHandler from "./errorHandler/axiosError";
import IComplainant from "./Models/Complainant";



axios.interceptors.request.use(jwtTokenInterception);

export async function addNewForm(form: IForm) {
    try {
        console.log(form)
        const res = await axios.post(`${api_url}/admin/addForm`, {
            name: form.name,
            activation: form.activation_Status,
            fields: form.fields
        })

    } catch (err) {
        errorHandler(err);
    }
}

export async function updateForm(form: IForm) {

    try {
        if (!form._id) {
            throw new Error("Form ID is not provided!");
        }
        const res = await axios.post(`${api_url}/admin/updateForm`, {
            _id: form._id,
            name: form.name,
            activation: form.activation_Status,
            fields: form.fields
        })

        console.log(JSON.stringify(res.data))
    } catch (err) {
        errorHandler(err)
    }

}

export async function deleteForm(id: string) {

    try {
        const res = await axios.delete(`${api_url}/admin/deleteForm`, {
            params: {
                _id: id
            }
        })

        console.log(JSON.stringify(res.data))
    } catch (err) {
        errorHandler(err)
    }
}

export async function viewMembers(): Promise<Array<IComplainant>> {
    try {
        const res = await axios.get(`${api_url}/admin/viewMembers`)

        const members: Array<IComplainant> = [];
        res.data.members.forEach((member) => {
            const user = member.user
            delete member.user
            members.push({
                ...member,
                ...user,
                compID:member.ID
            })
        })
        console.log(res.data.members)
        return members;
    } catch (err) {
        errorHandler(err)
    }
}

export async function activateMember()
