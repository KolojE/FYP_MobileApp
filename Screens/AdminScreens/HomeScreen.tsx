import React from "react";
import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VictoryLegend, VictoryPie } from "victory-native";
import Title from "../../Components/Title";
import {  getReportGroupedByType} from "../../api/admin";
import errorHandler from "../../api/errorHandler/axiosError";
import { getGroupedReportInfoForVictory } from "../../utils/victory";
import { ReportGroupedByType } from "../../types/General";


export default function HomeScreen({ }) {

    const [todayReports, setTodayReports] = React.useState<ReportGroupedByType[]>([])


    React.useEffect(() => {

        const today = new Date(); // current date and time
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(),0,0,0,0); // set time to midnight
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(),23,59,59,999); // set time to one second before midnight

        getReportGroupedByType({ sortBy: "subDate", dateRange: { fromDate: startOfDay, toDate: endOfDay } }).then((res) => {
            
            setTodayReports(res);
        
        }, (rej) => { errorHandler(rej) })

    }, [])


    React.useEffect(() => {

    }, [todayReports])




    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ width: "100%" }}>
                <Title title={"Admin Dashboard"} />
                <View style={{ alignSelf: "center", marginTop: "10%", width: "90%" }}>
                    <Text style={{ color: "#8F8F8F", fontSize: 10, marginBottom: 10 }}>Today's Report</Text>
                    <View style={{ alignItems: "center" }}>
                        <VictoryPie width={300} height={300} style={{ labels: { fontSize: 10 } }} colorScale={["navy", "tomato", "grey"]} data={getGroupedReportInfoForVictory({groupedReport:todayReports}).pie} />
                        <Text style={{ marginLeft: "auto" }}>Total report : {getGroupedReportInfoForVictory({groupedReport:todayReports}).totalReport}</Text>
                        <VictoryLegend width={300} itemsPerRow={3} title={"Report Type"} height={100} data={getGroupedReportInfoForVictory({groupedReport:todayReports}).legend} gutter={20} colorScale={["navy", "tomato", "grey"]} orientation={"horizontal"} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}