import { useState } from "react"
import { ReportGroupedByStateAndCity } from "../../types/General"
import React from "react"
import { getAddressByCoordinates } from "../../api/user"
import { useGroupedReports } from "./useGroupedReport"
import { IReport } from "../../types/Models/Report"
import { getReport } from "../../api/admin"



const useReportGroupedByLocation = () => {
  const groupedReports = useGroupedReports()
  const [reportGroupedByLocation, setReportGroupedByLocation] = useState<ReportGroupedByStateAndCity>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)

  React.useEffect(() => {

    const reportGroupedByLocation: ReportGroupedByStateAndCity = {}
    const fetchReportGroupedByLocation = async () => {
      setIsLoading(true)

      for (const groupedReport of groupedReports) {
        for (const report of groupedReport.reports) {
          try {
            const location = await getAddressByCoordinates(
              report.location.latitude,
              report.location.longitude
            );

            if (!reportGroupedByLocation[location.address.state]) {
              reportGroupedByLocation[location.address.state] = {}
            }

            if (!reportGroupedByLocation[location.address.state][location.address.city ?? "Other"]) {
              reportGroupedByLocation[location.address.state][location.address.city ?? "Other"] = []
            }

            let grouped = reportGroupedByLocation[location.address.state][location.address.city ?? "Other"].find((group) => group._id === groupedReport._id) ?? {
              _id: groupedReport._id,
              name: groupedReport.name,
              reports: []
            }
            if (grouped.reports.length <= 0) {
              reportGroupedByLocation[location.address.state][location.address.city ?? "Other"].push(grouped)
            }
            grouped.reports.push(report)
          }
          catch (err) {
            console.log(err)
          }
        }

      }
      setReportGroupedByLocation(reportGroupedByLocation)
      setIsLoading(false)
    }
    fetchReportGroupedByLocation();


  }, [groupedReports])


  return {
    reportGroupedByLocation,
    loading: isLoading
  }
}

export const useAdminReport = (reportID:string) => {

  const [report, setReport] = useState<IReport>(null)
  const [loading, setLoading] = useState<boolean>(false)

  React.useEffect(
    () => {
      const fetchReport = async () => {
        setLoading(true)
        const report: IReport = await getReport(reportID);
        setReport(report)
        setLoading(false)
      }
      fetchReport()
  },
  [reportID])

  return {
    report,
    loading,
  }
}


export default useReportGroupedByLocation