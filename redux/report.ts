import { createSlice } from "@reduxjs/toolkit"
import { ReportGroupedByType } from "../types/General"
import { IReport } from "../types/Models/Report"



type initialState = {
    loading: boolean,
    error: string | null,
    groupedReports: ReportGroupedByType[],
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
        groupedReports: [],
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
            state.groupedReports = action.payload.reports
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
            state.groupedReports = state.groupedReports.map((group) => {
                group.reports = group.reports.map((r) => {
                    if (r._id === report._id) {
                        return report
                    }
                    return r
                })
                return group;
            }
            )
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