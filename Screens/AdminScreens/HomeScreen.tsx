import React from "react";
import {  View, Text, ActivityIndicator,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VictoryLegend, VictoryPie } from "victory-native";
import Title from "../../Components/Title";
import { getGroupedReportInfoForVictory } from "../../utils/victory";
import { useUserInfoAction } from "../../actions/userAction";
import { useReportAction } from "../../actions/reportAction";
import { useGroupedReports } from "../../utils/hooks/useGroupedReport";
import { useFocusEffect } from "@react-navigation/native";


export default function HomeScreen({ }) {

    const userInfoAction = useUserInfoAction();
    const reportAction = useReportAction();
    const {
        groupedReports,
        loading
    }= useGroupedReports()
    const victoryData = getGroupedReportInfoForVictory({ groupedReport: groupedReports })

    React.useEffect(() => {
        const getLoggedInUserInfoAsync = async () => {
            userInfoAction.fetchUserInfoAction();
        }
        getLoggedInUserInfoAsync();
    }, [])

    useFocusEffect(
        React.useCallback(() => {
        const today = new Date(); // current date and time
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(),0,0,0,0); // set time to midnight
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(),23,59,59,999); // set time to one second before midnight
        reportAction.fetchReportCustom({fromDate:startOfDay,toDate:endOfDay})
    }
    ,[])
    )   




    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <View style={{ width: "100%",flex:1}}>
                <Title title={"Admin Dashboard"} />
                {
                        loading ?
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                            }}
                        >
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>:
                        <>
                {
                    groupedReports.length > 0 ?
                    <View style={{ alignSelf: "center", marginTop: "10%", width: "90%" }}>
                    <Text style={{ color: "#8F8F8F", fontSize: 10, marginBottom: 10 }}>Today's Report</Text>
                    <View style={{ alignItems: "center" }}>
                        <VictoryPie width={300} height={300} style={{ labels: { fontSize: 10 } }} colorScale={["navy", "tomato", "grey"]} data={victoryData.pie} />
                        <Text style={{ marginLeft: "auto" }}>Total report :{victoryData.totalReport} </Text>
                        <VictoryLegend width={300} itemsPerRow={3} title={"Report Type"} height={100} data={victoryData.legend} gutter={20} colorScale={["navy", "tomato", "grey"]} orientation={"horizontal"} />
                    </View>
                </View>:<View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    <Image style={{ height: 200, width: 200 }} source={require("../../assets/no-results.png")} />
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "700",
                                color: "#8F8F8F"
                            }}
                        >No report today</Text>
                </View>
                    }
                        </>
                }
            </View>
        </SafeAreaView >
    )
}