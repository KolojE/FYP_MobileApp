import axios from "axios";
import IForm from "../types/Models/Form";
import { api_url } from "../env";
import { jwtTokenInterception } from "./interceptor/jwtTokenInterception";
import errorHandler from "./errorHandler/axiosError";
import IComplainant from "../types/Models/Complainant";
import IUser from "../types/Models/User";
import { ReportGroupedByType, updateOrganizaitonInfoArgs } from "../types/General";
import { IReport } from "../types/Models/Report";



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
            const user: IUser = member.user
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
        return res.data;
    }
    catch (err) {
        errorHandler(err);
    }

}

export async function deleteDeactivatedMember(id: string): Promise<IComplainant> {
    try {
        const res = await axios.delete(`${api_url}/admin/deleteMember`, {
            params: {
                _id: id
            }
        })

        return res.data;
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
        const groupedReports: ReportGroupedByType[] = res.data.reports;
        const reportGroupedByType: ReportGroupedByType[] = groupedReports.map((groupedReport) => {
            return {
                _id: groupedReport._id.toString(),
                reports: groupedReport.reports.map((report) => {
                    return {
                        _id: report._id.toString(),
                        status: report.status,
                        submissionDate: report.submissionDate,
                        updateDate: report.updateDate,
                        name: report.name,
                        details: report.details,
                    };
                }),
                name: groupedReport.name,
            };
        });
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

export async function updateCreateOrganizaitonInfoAndStatues({organization,statuses,statusesToDelete}:updateOrganizaitonInfoArgs)
{

    console.log(organization)
    try{
        const res = await axios.post(`${api_url}/admin/updateOrganization`,{
            organization:organization,
            statuses:statuses,
            statusesToDelete:statusesToDelete,
        })

        console.log(JSON.stringify(res.data,null,2))
        return {
            newStatuses:res.data.statuses,
            newOrganizationInfo:res.data.organization,
        }
    }catch (err)
    {
        errorHandler(err)
    }
}

export async function updateReport(report:IReport)
{
    console.log(api_url)
    try{
        const res = await axios.post(`${api_url}/admin/updateReport`,{
            reportID:report._id,
            status:report.status,
            comment:report.status.comment,
        })
        return res.data.report;
    }catch(err)
    {
        errorHandler(err)
    }
}