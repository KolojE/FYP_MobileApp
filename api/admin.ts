import axios from "axios";
import IForm from "./Models/Form";
import { api_url } from "../env";
import { jwtTokenInterception } from "./interceptor/jwtTokenInterception";
import errorHandler from "./errorHandler/axiosError";
import IComplainant from "./Models/Complainant";
import { IReport } from "./Models/Report";
import { getLoggedInUserInfo } from "./user";
import IUser from "./Models/User";



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


export type ReportGroupedByType = {
    _id: string,//form's ID
    name: string,//form's name
    reports: IReport[],//report details
}

export async function getReportGroupedByType({ sortBy, limit, dateRange, status, type }: { sortBy: "subDate" | "upDate", limit?: number, dateRange?: { fromDate?: Date, toDate?: Date }, status?: string[], type?: string[] }): Promise<ReportGroupedByType[]> {
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

        const reportGroupedByType: ReportGroupedByType[] = res.data.reports ? res.data.reports : [];

        return reportGroupedByType;
    } catch (err) {
        errorHandler(err)
    }

}
export async function getReportsWeeklyBySubmissionDate({ weekOffSet }: { weekOffSet: number }): Promise<{ groupedReport: ReportGroupedByType[], dateRange: { fromDate: Date, toDate: Date } }> {
    try {
        const today = new Date();

        const dayOfWeek = today.getDay();

        // Calculate the date of this Monday by subtracting the number of days since Monday (if today is Monday, then subtract 0; if it's Tuesday, then subtract 1; etc.)
        const monday = new Date(today);
        monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) - (weekOffSet * 7));
        monday.setHours(0, 0, 0, 0);
        // Calculate the date of this Sunday by adding the number of days until Sunday (if today is Sunday, then add 0; if it's Saturday, then add 1; etc.)
        const sunday = new Date(today);
        sunday.setDate(today.getDate() + (dayOfWeek === 0 ? 0 : 7 - dayOfWeek) - (weekOffSet * 7))
        sunday.setHours(23, 59, 59, 999);
        const res = await axios.get(`${api_url}/admin/getReport`, {
            params: {
                subFromDate: monday,
                subToDate: sunday,
            }
        })



        return {
            groupedReport: res.data.reports,
            dateRange: {
                fromDate: monday,
                toDate: sunday,
            }
        }
    }
    catch (err) {
        errorHandler(err);
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
