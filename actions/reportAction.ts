import { useDispatch, useSelector } from "react-redux";
import { getReportGroupedByType, updateReport } from "../api/admin"
import { fetchReportError, fetchReportSuccess, startFetchingReport, updateReportStart, updateReportSuccess } from "../redux/report";
import { filterOptions } from "../types/General";
import { IReport } from "../types/Models/Report";
import { RootState } from "../redux/store";



export const useReportAction = () => {

    const dispatch = useDispatch();


    const fetchReportGroupedByTypeWeelky = async (offset: number) => {

        try {
            console.log("fetching report")
            console.log("offset", offset)
            dispatch(startFetchingReport());
            const today = new Date();
            const dayOfWeek = today.getDay();

            // Calculate the date of this Monday by subtracting the number of days since Monday (if today is Monday, then subtract 0; if it's Tuesday, then subtract 1; etc.)
            const monday = new Date(today);
            monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) - (offset * 7));
            monday.setHours(0, 0, 0, 0);
            // Calculate the date of this Sunday by adding the number of days until Sunday (if today is Sunday, then add 0; if it's Saturday, then add 1; etc.)
            const sunday = new Date(today);
            sunday.setDate(today.getDate() + (dayOfWeek === 0 ? 0 : 7 - dayOfWeek) - (offset * 7))
            sunday.setHours(23, 59, 59, 999);


            const res = await getReportGroupedByType({ sortBy: "subDate", dateRange: { fromDate: monday, toDate: sunday } })

            dispatch(fetchReportSuccess({ reports: res, dateRange: { fromDate: monday.toDateString(), toDate: sunday.toDateString()} }))

        } catch (err) {
            dispatch(fetchReportError(err.message))
            new Error(err.message)
        }
    };

    const fetchReportGroupedByTypeMonthly = async (offset: number) => {
        try {

            dispatch(startFetchingReport());
            const today = new Date();

            const start = new Date(today.getFullYear(), today.getMonth() - offset, 1);
            const end = new Date(today.getFullYear(), today.getMonth() - offset + 1, 0);
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);


            const res = await getReportGroupedByType({ sortBy: "subDate", dateRange: { fromDate: start, toDate: end } })
            dispatch(fetchReportSuccess({ reports: res, dateRange: { fromDate: start.toDateString(), toDate: end.toDateString() } }))
        } catch (err) {
            dispatch(fetchReportError(err.message))
            new Error(err.message)
        }
    }
    const fetchReportGroupedByTypeDaily = async (offset: number) => {
        try {
            dispatch(startFetchingReport())
            const start = new Date()
            const end = new Date();
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);

            start.setDate(start.getDate() - offset)
            end.setDate(end.getDate() - offset)

            const res =await getReportGroupedByType({ sortBy: "subDate", dateRange: { fromDate: start, toDate: end } })
            dispatch(fetchReportSuccess({ reports: res, dateRange: { fromDate: start.toDateString(), toDate: end.toDateString() } }))
        } catch (err) {
            dispatch(fetchReportError(err.message))
            new Error(err.message)
        }
    }
    const fetchReportGroupedByTypeCustom = async (filter:filterOptions) => {

        try{
            const fromDate = new Date(filter.fromDate)
            const toDate = new Date(filter.toDate)
            const status = filter.statusIDs
            const types = filter.typeIDs
            dispatch(startFetchingReport())
            const res = await getReportGroupedByType({ sortBy: "subDate", dateRange: { fromDate: fromDate, toDate: toDate }, status: status, types:types })
            dispatch(fetchReportSuccess({ reports: res, dateRange: { fromDate: fromDate.toDateString(), toDate: toDate.toDateString() } }))
        }
        catch(err){
            dispatch(fetchReportError(err.message))
            new Error(err.message)
        }

    }

    const updateReportAction = async (updatedReport:IReport) => {

        dispatch(updateReportStart())
        const res = await updateReport(updatedReport)
        dispatch(updateReportSuccess({...res}))

    }

    return { fetchReportGroupedByTypeWeelky,  fetchReportGroupedByTypeMonthly, fetchReportGroupedByTypeDaily, fetchReportGroupedByTypeCustom,updateReportAction }
}




