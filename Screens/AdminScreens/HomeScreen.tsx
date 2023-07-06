import React from "react";
import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VictoryLegend, VictoryPie } from "victory-native";
import Title from "../../Components/Title";
import { getGroupedReportInfoForVictory } from "../../utils/victory";
import { useUserInfoAction } from "../../actions/userAction";
import { useReportAction } from "../../actions/reportAction";
import { useGroupedReports } from "../../utils/hooks/useGroupedReport";


export default function HomeScreen({ }) {

    const userInfoAction = useUserInfoAction();
    const reportAction = useReportAction();
    const groupedReport= useGroupedReports()
    const victoryData = getGroupedReportInfoForVictory({ groupedReport: groupedReport })

    React.useEffect(() => {
        const getLoggedInUserInfoAsync = async () => {
            userInfoAction.fetchUserInfoAction();
        }
        getLoggedInUserInfoAsync();


        const today = new Date(); // current date and time
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(),0,0,0,0); // set time to midnight
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(),23,59,59,999); // set time to one second before midnight
        reportAction.fetchReportCustom({fromDate:startOfDay,toDate:endOfDay})
    }, [])





    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ width: "100%" }}>
                <Title title={"Admin Dashboard"} />
                <View style={{ alignSelf: "center", marginTop: "10%", width: "90%" }}>
                    <Text style={{ color: "#8F8F8F", fontSize: 10, marginBottom: 10 }}>Today's Report</Text>
                    <View style={{ alignItems: "center" }}>
                        <VictoryPie width={300} height={300} style={{ labels: { fontSize: 10 } }} colorScale={["navy", "tomato", "grey"]} data={victoryData.pie} />
                        <Text style={{ marginLeft: "auto" }}>Total report :{victoryData.totalReport} </Text>
                        <VictoryLegend width={300} itemsPerRow={3} title={"Report Type"} height={100} data={victoryData.legend} gutter={20} colorScale={["navy", "tomato", "grey"]} orientation={"horizontal"} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}