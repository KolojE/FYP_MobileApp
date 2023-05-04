import axios from "axios";
import { api_url } from "../env";
import errorHandler from "./errorHandler/axiosError";
import { IReport } from "./Models/Report";



export async function submitReport({ report, formID }: { report: Object, formID: string }) {

    try {
        const res = await axios.post(`${api_url}/report/reportIncident`, {
            formID: formID,
            field: report
        })
    } catch (err) {
        errorHandler(err)
    }
}

export async function getReport({sortBy,limit,dateRange}:{sortBy:"subDate"|"upDate",limit:number,dateRange?:{subFromData?:Date,subToDate?:Date}}): Promise<IReport[]> {
    try {
        const res = await axios.get(`${api_url}/report/getSubmittedReports`,
            {
                params: {
                    limit: limit,
                    sortBy:sortBy,
                    subFromDate:dateRange?.subFromData,
                    subToDate:dateRange?.subToDate
                }
            })
            

            const resovled = reportReponseResolver({reports:res.data.reports})
        return resovled;
    }
    catch (err) {
        errorHandler(err);
    }
}

export async function getReportsWeeklyBySubmissionDate({ weekOffSet }: { weekOffSet: number }): Promise<{ reports: IReport[], dateRange: { fromDate: Date, toDate: Date } }> {
    try {
        const today = new Date();

        // Calculate the day of the week (0 = Sunday, 1 = Monday, etc.)
        const dayOfWeek = today.getDay();

        // Calculate the date of this Monday by subtracting the number of days since Monday (if today is Monday, then subtract 0; if it's Tuesday, then subtract 1; etc.)
        const monday = new Date(today);
        monday.setDate(today.getDate() - dayOfWeek + 1 - (weekOffSet * 7));

        // Calculate the date of this Sunday by adding the number of days until Sunday (if today is Sunday, then add 0; if it's Saturday, then add 1; etc.)
        const sunday = new Date(today);
        sunday.setDate(today.getDate() + (7 - dayOfWeek) - (weekOffSet * 7));

        const res = await axios.get(`${api_url}/report/getSubmittedReports`, {
            params: {
                subFromDate: monday,
                subToDate: sunday,
            }
        })


        return {
            reports: reportReponseResolver({reports:res.data.reports}),
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


const reportReponseResolver = ({ reports }: { reports: any[] }): IReport[] => {


    const resovled: IReport[] = reports.map((report) => {
        const report_: IReport = {
            _id: report._id,
            name: report.name,
            details: report.details,
            submissionDate: new Date(report.submissionDate),
            updateDate: new Date(report.updateDate),
            status:report.status,
            
        }

      

        return report_;
    })

    return resovled
}