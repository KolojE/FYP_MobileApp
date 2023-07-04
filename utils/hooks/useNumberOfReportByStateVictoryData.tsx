import React from "react"
import { ReportGroupedByStateAndCity } from "../../types/General"



type VictoryBarData = {
    [key: string]: {
        x: string,
        y: number
    }[]
}

export const useNumberOfReportByStateVictoryData = (selectedStates: string[], selectedCities: string[], reportGroupedByLocation: ReportGroupedByStateAndCity) => {

    const [data, setData] = React.useState<VictoryBarData>({})

    React.useEffect(() => {
        const victoryBarData:VictoryBarData = {};

        (selectedStates.length>0?selectedStates:Object.keys(reportGroupedByLocation)).forEach((state) => {
            let totalStateReport = 0
            let groupName = ""
            Object.keys(reportGroupedByLocation[state]).forEach((city) => {

                if (selectedCities.length > 0 && !selectedCities.includes(city)) {
                    return
                }

                reportGroupedByLocation[state][city].forEach(
                    (group) => {
                        totalStateReport = group.reports.length
                        groupName = group.name
                        if (!victoryBarData[state]) {
                            victoryBarData[state] = []
                        }

                        
                        const reportType =  victoryBarData[state].find((item)=>{
                            return item.x === groupName
                            })

                            if(!reportType){
                                victoryBarData[state].push({
                                    x: groupName,
                                    y: totalStateReport
                                })
                                return
                            }

                            reportType.y += totalStateReport
                        
                    }
                    //State's total report for different types of report
                )
            })
        })


        setData(victoryBarData)

    },
        [
            selectedStates,
            selectedCities,
            reportGroupedByLocation
        ])

    return {
        data
    }
}