import { useEffect, useState } from "react"
import { ReportGroupedByType } from "../../types/General"
import { RootState } from "../../redux/store"
import { useSelector } from "react-redux"


export const useGroupedReports = () => {
    const [groupedReports, setGroupedReports] = useState<ReportGroupedByType[]>([])
    const {
        reports,
        loading
    } = useSelector((state: RootState) => state.report)

    useEffect(() => {

        const groupedReports: ReportGroupedByType[] = []
        const groupReports = ()=>{ 

            reports.forEach((report) => {
            const index = groupedReports.findIndex((group) => group._id=== report.form._id)
            if (index === -1) {
                groupedReports.push({
                    _id: report.form._id,
                    name: report.form.name,
                    reports: [report]
                })
            } else {
                groupedReports[index].reports.push(report)
            }
        })
    }

    groupReports()
    setGroupedReports(groupedReports)
    }
    ,[reports])

    console.log(groupedReports)

    return {
        groupedReports,
        loading
    }
}