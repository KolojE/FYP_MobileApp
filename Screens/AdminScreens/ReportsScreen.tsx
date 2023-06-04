import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VictoryPie, VictoryLegend, VictoryChart, VictoryArea, VictoryScatter, VictoryLine, VictoryAxis } from "victory-native";
import Title from "../../Components/Title";
import FilterModal from "../../Modals/FilterModal";
import { getGroupedReportInfoForVictory } from "../../utils/victory";
import { useReportAction } from "../../actions/reportAction";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";



type Info = {
    totalReport: number;

}

export default function ReportsScreen() {
    const [graphVisible, setGraphVisible] = React.useState(false);
    const [filterModal, setFilterModal] = React.useState(false);
    const [mode, setMode] = React.useState<"weekly" | "monthly" | "daily" | "custom">("weekly");
    const [offset, setOffset] = React.useState<number>(0)
    const [info, setInfo] = React.useState<Info>({
        totalReport: 0
    })

    const groupedReport = useSelector((state: RootState) => state.report)
    console.log(groupedReport)
    const victoryData = getGroupedReportInfoForVictory({ groupedReport: groupedReport.reports })

    const adminAction = useReportAction()

    React.useEffect(() => {
        if (mode === "weekly") {
            console.log("weekly")
            adminAction.fetchReportGroupedByTypeWeelky(offset)
            return
        }

        if (mode === "daily") {
            console.log("daily")
            adminAction.fetchReportGroupedByTypeDaily(offset)
            return
        }

        if (mode === "monthly") {
            adminAction.fetchReportGroupedByTypeMonthly(offset)
        }
    }, [offset, mode])

    React.useEffect(() => {
        setOffset(0)
    }, [mode])

    const onLeftButtonPressed = () => {
        setOffset(offset + 1)

    }
    const onRightButtonPressed = () => {
        setOffset(offset - 1)
    }


    const data = [{ x: 1, y: 4 }, { x: 2, y: 3 }, { x: 4, y: 5 }, { x: 3, y: 6 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 0 }];
    return (
        <SafeAreaView>
            <ScrollView>
                <Title title={"Reports"} />
                <View style={{ alignItems: "center" }}>
                    <View>
                        <View style={{ borderWidth: 1, borderRadius: 10, width: "80%", margin: 20, paddingTop: "2%", paddingBottom: "2%", flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => { setGraphVisible(false), setMode("daily") }} style={{ flex: 1, borderRightWidth: 1 }}>
                                <Text style={mode === "daily" ? { textAlign: "center", color: "blue" } : { textAlign: "center" }}>
                                    Day
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setGraphVisible(true), setMode("weekly") }} style={{ flex: 1, borderRightWidth: 1 }}>
                                <Text style={mode === "weekly" ? { textAlign: "center", color: "blue" } : { textAlign: "center" }}>
                                    Week
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setGraphVisible(false), setMode("monthly") }} style={{ flex: 1, borderRightWidth: 1 }}>
                                <Text style={mode === "monthly" ? { textAlign: "center", color: "blue" } : { textAlign: "center" }}>
                                    Month
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setGraphVisible(false); setFilterModal(true); setMode("custom") }} style={{ flex: 1 }}>
                                <Text style={mode === "custom" ? { textAlign: "center", color: "blue" } : { textAlign: "center" }}>
                                    Custom
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "center", width: "80%" }}>
                        {mode !== "custom" && (
                            <View style={{ position: 'absolute', left: 0 }}>
                                <TouchableOpacity onPress={onLeftButtonPressed} style={{ padding: 10 }}>
                                    <SimpleLineIcons name="arrow-left" />
                                </TouchableOpacity>
                            </View>
                        )}

                        <View style={{ flex: 1, alignItems: 'center' }}>
                           { 
                        !groupedReport.loading? 
                        <>
                        {
                            mode === "daily" ? <Text>{`${groupedReport.dateRange.fromDate}`}</Text> :
                           <Text>{`${groupedReport.dateRange.fromDate} - ${groupedReport.dateRange.toDate}`}</Text>
                        }
                        </>:
                        <Text>Loading...</Text>
                        }
                        </View>

                        {offset !== 0 && (
                            <View style={{ position: 'absolute', right: 0 }}>
                                <TouchableOpacity onPress={onRightButtonPressed} style={{ padding: 10 }}>
                                    <SimpleLineIcons name="arrow-right" />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>

                {
                    !groupedReport.loading?
                    <>
                {
                    groupedReport.reports.length > 0 ?
                    <View style={{ alignItems: "center",justifyContent:"center",minHeight:300,minWidth:300 }}>
                    <VictoryPie width={300} height={300} style={{ labels: { fontSize: 10 } }} colorScale={["navy", "tomato", "grey"]} data={victoryData.pie} />
                    <VictoryLegend width={300} itemsPerRow={3} title={"Report Type"} height={100} data={victoryData.legend} gutter={20} colorScale={["navy", "tomato", "grey"]} orientation={"horizontal"} />
                </View>:
                    <View style={{ alignItems: "center",justifyContent:"center",minHeight:300,minWidth:300 }}>
                    <Text>No report found</Text>
                    </View>
                }   
                    </>:
                    <View style={{ alignItems: "center",justifyContent:"center",minHeight:300,minWidth:300 }}>
                <ActivityIndicator  size={"large"}/></View>
                }
                {graphVisible &&
                    <View>
                        <VictoryChart >
                            <VictoryAxis tickValues={["Mon", "Tue", "Wed", "Thu", "Fri", "Sut", "Sun"]} />
                            <VictoryAxis dependentAxis maxDomain={20} tickValues={[0, 5, 10]} tickFormat={(x) => { console.log(x); return x }} />
                            <VictoryArea interpolation={"natural"} data={data} style={{ data: { opacity: 100, fill: "#a3fcff" } }} />
                            <VictoryScatter data={data} style={{ data: { fill: "blue" } }} />
                            <VictoryLine data={data} interpolation={"natural"} />
                        </VictoryChart>
                    </View>
                }
                <TouchableOpacity style={{ alignSelf: "center", padding: 10, marginBottom: "5%", borderRadius: 100, backgroundColor: "#4d8ef7" }}>
                    <Text style={{ color: "white", fontWeight: "700" }}>Save As</Text>
                </TouchableOpacity>
            </ScrollView>
            <Modal animationType="slide" visible={filterModal}>
                <FilterModal setFilterModal={setFilterModal} />
            </Modal>
            <Modal visible={false}>

            </Modal>
        </SafeAreaView>
    );
}