import { createSlice } from "@reduxjs/toolkit"
import { ReportGroupedByType } from "../types/General"
import { IReport } from "../types/Models/Report"



type initialState = {
    loading: boolean,
    error: string | null,
    reports: IReport[],
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
        dateRange: {
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
        },
        startDownloadingReport: (state) => {
            state.loading = true
            state.error = null
        },
        downloadReportSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        downloadReportError: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        updateReportStart: (state) => {
            state.loading = true
            state.error = null
        },
        updateReportSuccess: (state, action) => {
            const report: IReport = action.payload
            state.reports = state.reports.map((report) =>report._id === action.payload._id ? report = action.payload : report)
            state.loading = false
            state.error = null
        },
        updateReportError: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }

})
export const {
    startFetchingReport,
    fetchReportSuccess,
    fetchReportError,
    updateReportStart,
    updateReportSuccess,
    updateReportError,
    startDownloadingReport,
    downloadReportSuccess,
    downloadReportError,
} = reportSlice.actions
export default reportSlice.reducer;