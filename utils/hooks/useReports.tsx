import { useEffect, useState } from "react";
import { IReport } from "../../types/Models/Report";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { filterOptions } from "../../types/General";
import { getReport, getReports } from "../../api/complainant";
import report from "../../redux/report";


type useReportsProps = {
    filter?: filterOptions
}


export const useReports = ({filter}:useReportsProps) => {

    const [reports, setReports] = useState<IReport[]>([]);

    useEffect(() => {
        const fetchReports = async () => {
            const reports: IReport[] = await getReports(filter); 
            console.log(reports,null,2)
            setReports(reports)
        }
        fetchReports()
    }
    ,[])

    return reports

}

export const useReport = (reportID:string) =>{

    const [report, setReport] = useState<IReport>(null);
    const [loading,setLoading] = useState<boolean>(true)

    useEffect(() => {

        const fetchReport = async () => {
            setLoading(true)
            const report: IReport = await getReport({reportID}); 
            setReport(report)
            setLoading(false)
        }
        fetchReport()
    },[])

    return {
        report,
        loading
    }

}