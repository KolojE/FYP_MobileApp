import axios from "axios";
import { api_url } from "../env";
import errorHandler from "./errorHandler/axiosError";
import { IReport } from "../types/Models/Report";
import * as FileSystem from 'expo-file-system';
import { getItemAsync } from "expo-secure-store";



export async function submitReport({ report, formID }: { report: object, formID: string }) {

    try {

        const res = await axios.post(`${api_url}/report/reportIncident`, {
            formID: formID,
            field: report
        })
        return res.data.reportID;
    } catch (err) {
        
        errorHandler(err)
    }
}

export async function uploadreportPhotoVideo({ uri }): Promise<string> {

    try {
        const uploadResult = await FileSystem.uploadAsync(`${api_url}/report/uploadReportPhoto`, uri, {
            httpMethod: 'POST',
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'photo',
            headers: {
                authorization: `${await getItemAsync('jwt')}`
            }
        });
        return JSON.parse(uploadResult.body).filePath;
    } catch (err) {
        errorHandler(err)
    }

}

export async function getReport({ reportID }: { reportID: string }): Promise<IReport> {
    const res = await axios.get(`${api_url}/report/getSubmittedReports`,
        {
            params: {
                reportID: reportID,
            }
        })
        
        const report:IReport = {
            _id: res.data.report._id,
            details: res.data.report.details,
            status: {
                desc: res.data.report.status.desc,
                _id: res.data.report.status._id
            },
            form: {
                _id: res.data.report.form._id,
                name: res.data.report.form.name,
                color: res.data.report.form.color,
                isDeleted: res.data.report.form.isDeleted
            },
            complainant:{
                _id:res.data.report.complainant._id,
                name:res.data.report.complainant.name,
                email:res.data.report.complainant.email
            },
            location:{
                latitude:res.data.report.location.latitude,
                longitude:res.data.report.location.longitude
            },
            comment: res.data.report.comment,
            submissionDate: new Date(res.data.report.submissionDate),
            updateDate: new Date(res.data.report.updateDate)
        };

        return report
    }

    export async function getReports({ sortBy, limit, dateRange }: { sortBy?: "subDate" | "upDate", limit?: number, dateRange?: { subFromData?: Date, subToDate?: Date } }): Promise<IReport[]> {
        try {

            const res = await axios.get(`${api_url}/report/getSubmittedReports`,
                {
                    params: {
                        limit: limit,
                        sortBy: sortBy,
                        subFromDate: dateRange?.subFromData,
                        subToDate: dateRange?.subToDate
                    }
                })


            const data = res.data.reports;
            const reports:IReport[]  = data.map((report:IReport):IReport => {
                return {
                    _id: report._id,
                    details: report.details,
                    status:{
                        _id:report.status._id,
                        desc:report.status.desc,
                    },
                    form:{
                        _id:report.form._id,
                        name:report.form.name,
                        color:report.form.color,
                        isDeleted:report.form.isDeleted
                    },
                    submissionDate: new Date(report.submissionDate),
                    updateDate: new Date(report.updateDate),
                    complainant:{
                        _id:report.complainant._id,
                        name:report.complainant.name,
                        email:report.complainant.email
                    },
                    location:{
                        latitude:report.location.latitude,
                        longitude:report.location.longitude
                    },
                    comment:report.comment
                }
            })

            return reports;
        }
        catch (err) {
            errorHandler(err);
        }
    }

    


