import { createSlice } from "@reduxjs/toolkit"
import { ReportGroupedByType } from "../types/General"



type initialState = {
    loading: boolean,
    error: string | null,
    reports: ReportGroupedByType[],
    dateRange: {
        fromDate: string,
        toDate: string,
    },
}

const reportSlice = createSlice({
    name: "report",
    initialState: {
        loading: false,
        error: null,
        reports: [],
        dateRange:{
            fromDate: "",
            toDate: "",
        }
    } as initialState,

    reducers: {
        startFetchingReport: (state) => {
            state.loading = true
            state.error = null
        },
        fetchReportSuccess: (state, action) => {
            state.reports = action.payload.reports
            state.dateRange.fromDate = action.payload.dateRange.fromDate
            state.dateRange.toDate = action.payload.dateRange.toDate
            state.loading = false
            state.error = null
        }
        ,
        fetchReportError: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }

})
export const { startFetchingReport, fetchReportSuccess, fetchReportError } = reportSlice.actions
export default reportSlice.reducer;