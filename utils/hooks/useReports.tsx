import { useEffect, useState } from "react";
import { IReport } from "../../types/Models/Report";
import { filterOptions } from "../../types/General";
import { getReport, getReports } from "../../api/complainant";
import { Axios, AxiosError } from "axios";


type useReportsProps = {
    filter?: filterOptions
}


export const useReports = ({ filter }: useReportsProps) => {

    const [reports, setReports] = useState<IReport[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>(null);
    useEffect(() => {
        try {
            console.log(filter)
            setLoading(true)
            const fetchReports = async () => {
                const reports: IReport[] = await getReports({
                    sortBy: filter.sortBy,
                    dateRange: {
                        fromDate: filter.fromDate,
                        toDate: filter.toDate
                    },
                    status: filter.statusIDs,
                    types: filter.typeIDs

                });
                setReports(reports)
                setLoading(false)
                console.log(reports)
            }
            fetchReports()
        } catch (e) {
            if (e instanceof AxiosError && e.response.status == 404) {
                setError("Report not found! Please Contact the Admin")
                setLoading(false)
                return
            }
            setError("Something went wrong! Please try again later")
        }
    }
        , [filter])
    return {
        reports,
        loading,
        error
    }

}

export const useReport = (reportID: string) => {

    const [report, setReport] = useState<IReport>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>(null)
    useEffect(() => {
        setError(null)
        try{
            const fetchReport = async () => {
                setLoading(true)
                const report: IReport = await getReport({ reportID });
                setReport(report)
                setLoading(false)
            }
            fetchReport()
        }catch(e){
            if(e instanceof AxiosError && e.response.status == 404){
                setError("Report not found! Please Contact the Admin")
                setLoading(false)
                return
            }
            setError("Something went wrong! Please try again later")
        }
    }, [])

    return {
        report,
        loading,
        error
    }

}