import axios from "axios";
import IForm from "../types/Models/Form";
import { api_url } from "../env";
import { jwtTokenInterception } from "./interceptor/jwtTokenInterception";
import errorHandler from "./errorHandler/axiosError";
import IComplainant from "../types/Models/Complainant";
import IUser from "../types/Models/User";
import { ReportGroupedByType } from "../types/General";



axios.interceptors.request.use(jwtTokenInterception);


export async function addNewForm(form: IForm) {
    try {
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

    } catch (err) {
        errorHandler(err)
    }
}

export async function getMembers(): Promise<IComplainant[]> {
    try {
        const res = await axios.get(`${api_url}/admin/viewMembers`)

        const members: Array<IComplainant> = [];
        res.data.members.forEach(async (member) => {
        const user:IUser = member.user
        console.log(user)
            delete member.user
            members.push({
                ...member,
                ...user,
                compID: member.ID
            })
        })
        return members;
    } catch (err) {
        errorHandler(err)
    }
}

export async function activateMember(id: string, activationStatus: boolean) {
    try {
        const res = await axios.post(`${api_url}/admin/memberActivation`, {
            id: id,
            activation: activationStatus,
        });

    }
    catch (err) {
        errorHandler(err);
    }

}

export async function deleteDeactivatedMember(id: string) {
    try {
        const res = await axios.delete(`${api_url}/admin/deleteMember`, {
            params: {
                _id: id
            }
        })
    }
    catch (err) {
        errorHandler(err)
    }
}



export async function getReportGroupedByType({ sortBy, limit, dateRange, status, types: type }: { sortBy: "subDate" | "upDate", limit?: number, dateRange?: { fromDate?: Date, toDate?: Date }, status?: string[], types?: string[] }): Promise<ReportGroupedByType[]> {
    try {

        const statusParams = status ? status.length > 0 ? status.toString() : undefined : undefined
        const typeParams = type ? type.length > 0 ? type.toString() : undefined : undefined
        const res = await axios.get(`${api_url}/admin/getReport`, {
            params: {
                sortBy: sortBy,
                limit: limit,
                subFromDate: dateRange.fromDate,
                subToDate: dateRange.toDate,
                status: statusParams,
                type: typeParams,
            }
        })

        const reportGroupedByType: ReportGroupedByType[] = res.data.reports? res.data.reports : [];

        return reportGroupedByType;
    } catch (err) {
        errorHandler(err)
    }

}


export type ReprotElement = {
    type: {
        _id: string,
        name: string,
    }[],
    status: {
        _id: string,
        desc: string,
    }[],
}

export async function getReportElement({ includeType, includeStatus }: { includeType?: boolean, includeStatus?: boolean }): Promise<ReprotElement> {

    try {
        const res = await axios.get(`${api_url}/admin/getReportElement`, {
            params: {
                type: includeType,
                status: includeStatus
            }
        })

        return res.data.element
    }
    catch (err) {
        errorHandler(err);
    }
}
