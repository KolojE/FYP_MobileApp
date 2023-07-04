import { useState } from "react"
import { ReportGroupedByStateAndCity } from "../../types/General"
import { RootState } from "../../redux/store"
import { useSelector } from "react-redux"
import React from "react"
import { getAddressByCoordinates } from "../../api/user"



const useReportGroupedByLocation = () => {
    const groupedReports = useSelector((state: RootState) => state.report.groupedReports)
    const [reportGroupedByLocation, setReportGroupedByLocation] = useState<ReportGroupedByStateAndCity>({})
    const [isLoading, setIsLoading] = useState<boolean>(false)
  
    React.useEffect(() => {

      
      setIsLoading(true)
      const reportGroupedByLocation: ReportGroupedByStateAndCity = {}
      const fetchReportGroupedByLocation = async () => {
        for (const groupedReport of groupedReports) {
          for (const report of groupedReport.reports) {
              try{
              const location = await getAddressByCoordinates(
                report.location.latitude,
                report.location.longitude
                );
  
                if (!reportGroupedByLocation[location.address.state]) {
                  reportGroupedByLocation[location.address.state] = {}
                }

                if(!reportGroupedByLocation[location.address.state][location.address.city??"Other"]){
                  reportGroupedByLocation[location.address.state][location.address.city??"Other"] = []
                }
                
                let grouped = reportGroupedByLocation[location.address.state][location.address.city??"Other"].find((group) => group._id === groupedReport._id) ?? {
                  _id: groupedReport._id,
                  name: groupedReport.name,
                  reports: []
                }
                if (grouped.reports.length<=0) {
                  reportGroupedByLocation[location.address.state][location.address.city??"Other"].push(grouped)
                }
                grouped.reports.push({...report, name: groupedReport.name})
                }
          catch(err){
            console.log(err)
          }  
              }
              
            }
            // console.log(reportGroupedByLocation, "log from useReportGroupedByLocation - Reprot Grouped By Location")
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
  

export default useReportGroupedByLocation