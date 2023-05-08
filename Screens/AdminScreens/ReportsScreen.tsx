import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VictoryPie, VictoryLegend, VictoryChart, VictoryArea, VictoryScatter, VictoryLine, VictoryAxis } from "victory-native";
import Title from "../../Components/Title";
import FilterModal from "../../Modals/FilterModal";
import { ReportGroupedByType, getReportsWeeklyBySubmissionDate } from "../../api/admin";
import errorHandler from "../../api/errorHandler/axiosError";
import { getGroupedReportInfoForVictory } from "../../utils/victory";
import { getReportGroupedByType } from "../../api/admin";


type WeeklyReport = {
    offset: number;
    reports: ReportGroupedByType[];
}

type Info = {
    dateRange: string;
    totalReport: number;

}



export default function ReportsScreen() {
    const [graphVisible, setGraphVisible] = React.useState(false);
    const [filterModal, setFilterModal] = React.useState(false);
    const [mode, setMode] = React.useState<"weekly" | "monthly" | "daily" | "custom">("weekly");

    const [Report, setReport] = React.useState<WeeklyReport>({
        reports: [],
        offset: 0,
    })
    const [info, setInfo] = React.useState<Info>({
        dateRange: "",
        totalReport: 0
    })

    const victoryData = getGroupedReportInfoForVictory({ groupedReport: Report.reports })

    React.useEffect(() => {

        if (mode === "weekly") {
            getReportsWeeklyBySubmissionDate({ weekOffSet: Report.offset })
                .then((result) => {
                    setReport((prev) => { return { ...prev, reports: result.groupedReport } });
                    let totalReport = 0
                    result.groupedReport.forEach((group) => {
                        totalReport += group.reports.length;
                    })
                    setInfo((prev) => { return { ...prev, dateRange: result.dateRange.fromDate.toDateString() + "-" + result.dateRange.toDate.toDateString(), totalReport: totalReport } })
                }, (rej) => { errorHandler(rej) })
            return
        }


        if (mode === "daily") {
            const start = new Date()
            const end = new Date();
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);

            start.setDate(start.getDate() - Report.offset)
            end.setDate(start.getDate())

            getReportGroupedByType({ sortBy: "subDate", dateRange: { fromDate: start, toDate: end } })
                .then((result) => {
                    setReport((prev) => { return { ...prev, reports: result } })
                    let totalReport = 0
                    result.forEach((group) => {
                        totalReport += group.reports.length;
                    })
                    setInfo({ dateRange: start.toDateString(), totalReport: totalReport })

                })

            return
        }


        if (mode === "monthly") {
            const start = new Date();
            const end = new Date();
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);

            start.setDate(1);
            end.setDate(0);

            start.setMonth(new Date().getMonth() - Report.offset);
            end.setMonth(new Date().getMonth() - Report.offset);

            console.log(`${start} - ${end}`)
            getReportGroupedByType({ sortBy: "subDate", dateRange: { fromDate: start, toDate: end } })
                .then((result) => {
                    setReport((prev) => { return { ...prev, reports: result } })
                    let totalReport = 0
                    result.forEach((group) => {
                        totalReport += group.reports.length;
                    })
                    setInfo({ dateRange: `${start.toDateString()} - ${end.toDateString()}`, totalReport: totalReport })

                })
        }


    }, [Report.offset, mode])

    React.useEffect(() => {
        setReport(prev => ({ offset: 0, reports: prev.reports }))
    }, [mode])

    const onLeftButtonPressed = () => {
        setReport((prev) => {
            return { offset: prev.offset + 1, reports: [] }
        })

        console.log(Report)
    }
    const onRightButtonPressed = () => {
        setReport((prev) => {
            return { offset: prev.offset - 1, reports: [] }
        })
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
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {
                            mode!=="custom"&&
                        <TouchableOpacity onPress={onLeftButtonPressed} style={{ paddingRight: 10 }}><SimpleLineIcons name="arrow-left" style={{ paddingRight: 10 }} /></TouchableOpacity>
                    }
                        <Text>
                            {info.dateRange}
                        </Text>
                        {
                            Report.offset !== 0 ?
                            <TouchableOpacity onPress={onRightButtonPressed} style={{ paddingLeft: 10 }}><SimpleLineIcons name="arrow-right" style={{ paddingLeft: 10 }} /></TouchableOpacity> : <View style={{ marginLeft: 20 }}></View>
                        }
                    </View>
                </View>
                <View style={{ alignItems: "center" }}>
                    <VictoryPie width={300} height={300} style={{ labels: { fontSize: 10 } }} colorScale={["navy", "tomato", "grey"]} data={victoryData.pie} />
                    <VictoryLegend width={300} itemsPerRow={3} title={"Report Type"} height={100} data={victoryData.legend} gutter={20} colorScale={["navy", "tomato", "grey"]} orientation={"horizontal"} />
                </View>
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
                <FilterModal setInfo={setInfo} setReport={setReport} setFilterModal={setFilterModal} />
            </Modal>
            <Modal visible={false}>

            </Modal>
        </SafeAreaView>
    );
}