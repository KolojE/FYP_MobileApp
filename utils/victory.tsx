import { ReportGroupedByType } from "../types/General"

export function getGroupedReportInfoForVictory({ groupedReport }: { groupedReport: ReportGroupedByType[] }) {
    const reports = {
        legend: [],
        pie: [],
        totalReport: 0,
    }

    groupedReport.length > 0 &&
        groupedReport.forEach((res) => {
            reports.legend.push({ name: res.name })
            reports.pie.push({ x: res.reports.length, y: res.reports.length })
            reports.totalReport += res.reports.length
        })
    return reports
}