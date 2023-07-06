import axios from "axios";
import IForm from "../types/Models/Form";
import { api_url } from "../env";
import { jwtTokenInterception } from "./interceptor/jwtTokenInterception";
import errorHandler from "./errorHandler/axiosError";
import IComplainant from "../types/Models/Complainant";
import IUser from "../types/Models/User";
import { ReportGroupedByType, updateOrganizaitonInfoArgs } from "../types/General";
import { IReport } from "../types/Models/Report";
import * as FileSystem from 'expo-file-system';
axios.interceptors.request.use(jwtTokenInterception);


export async function addNewForm(form: IForm) {
    try {
        const res = await axios.post(`${api_url}/admin/addForm`, {
            name: form.name,
            color: form.color,
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
            color: form.color,
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


export async function getReport(id: string): Promise<IReport> {
    const res = await axios.get(`${api_url}/admin/getReport`, {
        params: {
            reportID: id
        }
    })
    const report: IReport = {
        _id: res.data.report._id,
        status: res.data.report.status,
        submissionDate: res.data.report.submissionDate,
        updateDate  : res.data.report.updateDate,
        form: res.data.report.form,
        details: res.data.report.details,
        complainant: res.data.report.complainant,
        location: {
            latitude: res.data.report.location.latitude,
            longitude: res.data.report.location.longitude
        }
    }
    return report
}

export async function getReports({ sortBy, limit, dateRange, status, types, reportID }: { sortBy: "subDate" | "upDate", limit?: number, dateRange?: { fromDate?: Date, toDate?: Date }, status?: string[], types?: string[], reportID?: string }): Promise<IReport[]> {
    try {

        const statusParams = status ? status.length > 0 ? status.toString() : undefined : undefined
        const typeParams = types ? types.length > 0 ? types.toString() : undefined : undefined
        const res = await axios.get(`${api_url}/admin/getReport`, {
            params: {
                sortBy: sortBy,
                limit: limit,
                subFromDate: dateRange?.fromDate,
                subToDate: dateRange?.toDate,
                status: statusParams,
                type: typeParams,
                reportID: reportID
            }
        })

        const result= res.data.reports

        const reports: IReport[] = [];
        result.forEach(async (report) => {
            reports.push({
                _id: report._id,
                status: report.status,
                submissionDate: report.submissionDate,
                updateDate  : report.updateDate,
                form: report.form,
                details: report.details,
                complainant: report.complainant,
                location: {
                    latitude: report.location.latitude,
                    longitude: report.location.longitude
                }
            })
        })

        return reports
    } catch (err) {
        errorHandler(err)
    }

}

export async function downloadReportExcel({ sortBy, limit, dateRange, status, types: type }: { sortBy: "subDate" | "upDate", limit?: number, dateRange?: { fromDate?: Date, toDate?: Date }, status?: string[], types?: string[] }) {
    try {
        const res = await axios.get(`${api_url}/admin/downloadReportExcel`, {
            params: {
                sortBy: sortBy,
                limit: limit,
                subFromDate: dateRange?.fromDate,
                subToDate: dateRange?.toDate,
                status: status,
                type: type,
            },
        })

        const result = await FileSystem.downloadAsync(`${api_url}/${res.data.fileUrl}`, FileSystem.documentDirectory + "report.xlsx")
        return result

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

export async function updateCreateOrganizaitonInfoAndStatues({ organization, statuses, statusesToDelete }: updateOrganizaitonInfoArgs) {

    try {
        const res = await axios.post(`${api_url}/admin/updateOrganization`, {
            organization: organization,
            statuses: statuses,
            statusesToDelete: statusesToDelete,
        })

        return {
            newStatuses: res.data.statuses,
            newOrganizationInfo: res.data.organization,
        }
    } catch (err) {
        errorHandler(err)
    }
}

export async function updateReport(report: IReport): Promise<IReport> {
    try {
        const res = await axios.post(`${api_url}/admin/updateReport`, {
            reportID: report._id,
            status: report.status,
            comment: report.status.comment,
        })
        return {
            ...report,
            status: res.data.report.status._id,
        };
    } catch (err) {
        errorHandler(err)
    }
}
