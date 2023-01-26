import React from "react";
import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextSize, VictoryBar, VictoryChart, VictoryLegend, VictoryPie, VictoryTheme } from "victory-native";
import RecentReportList from "../../Components/RecenReportList";
import RecentReport from "../../Components/RecentReport";
import Title from "../../Components/Title";

const data = [{}]



export default function HomeScreen(props) {

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ width: "100%" }}>
                <Title title={"Admin Dashboard"} />
                <View style={{ alignSelf: "center", marginTop: "10%", width: "90%" }}>
                    <Text style={{ color: "#8F8F8F", fontSize: 10, marginBottom: 10 }}>Today's Report</Text>
                    <View style={{ alignItems: "center" }}>
                        <VictoryPie width={300} height={300} style={{ labels: { fontSize: 10 } }} colorScale={["navy", "tomato", "grey"]} data={[{ x: 20, y: 20 }, { x: 10, y: 10 }, { x: 1, y: 1 }]} />
                        <Text style={{ marginLeft: "auto" }}>Total report : 31</Text>
                    </View>
                    <View style={{ marginStart: "5%" }}>
                        <VictoryLegend itemsPerRow={3} title={"Report Type"} data={[{ name: "flood" }, { name: "fire wild", }, { name: "road crack" }]} gutter={20} colorScale={["navy", "tomato", "grey"]} height={150} orientation={"horizontal"} />
                    </View>
                </View>
                <RecentReportList navigation={props.navigation} />
            </ScrollView>
        </SafeAreaView >
    )
}