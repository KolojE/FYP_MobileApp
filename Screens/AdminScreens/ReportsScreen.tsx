import { Entypo, SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal, ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VictoryPie, VictoryLegend, VictoryChart, VictoryArea, VictoryScatter, VictoryLine, VictoryAxis } from "victory-native";
import Title from "../../Components/Title";
import FilterModal from "../../Modals/FilterModal";
import { getGroupedReportInfoForVictory } from "../../utils/victory";
import { useReportAction } from "../../actions/reportAction";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ReportGroupedByType } from "../../types/General";
import { IReport } from "../../types/Models/Report";
import ReportList from "../../Components/ReportList";
import report from "../../redux/report";
import UpdateReportModal from "../../Modals/UpdateReportModal";



export default function ReportsScreen() {
    const [filterModal, setFilterModal] = React.useState(false);

    const [mode, setMode] = React.useState<"weekly" | "monthly" | "daily" | "custom">("weekly");
    const [displayMode, setDisplayMode] = React.useState<"pie" | "list">("pie")
    const [offset, setOffset] = React.useState<number>(0)


    const groupedReport = useSelector((state: RootState) => state.report)
    const victoryData = getGroupedReportInfoForVictory({ groupedReport: groupedReport.groupedReports })

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

    const onListButtonPressed = () => {

    }


    return (
        <SafeAreaView>
                <Title title={"Reports"} />
                <View style={{ alignItems: "center" }}>
                    <View style={{ alignItems: "center" }}>
                        <View style={{ borderWidth: 1, borderRadius: 10, width: "80%", marginTop: "5%", paddingTop: "2%", paddingBottom: "2%", flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => { setMode("daily") }} style={{ flex: 1, borderRightWidth: 1 }}>
                                <Text style={mode === "daily" ? { textAlign: "center", color: "blue" } : { textAlign: "center" }}>
                                    Day
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setMode("weekly") }} style={{ flex: 1, borderRightWidth: 1 }}>
                                <Text style={mode === "weekly" ? { textAlign: "center", color: "blue" } : { textAlign: "center" }}>
                                    Week
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setMode("monthly") }} style={{ flex: 1, borderRightWidth: 1 }}>
                                <Text style={mode === "monthly" ? { textAlign: "center", color: "blue" } : { textAlign: "center" }}>
                                    Month
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterModal(true); setMode("custom") }} style={{ flex: 1 }}>
                                <Text style={mode === "custom" ? { textAlign: "center", color: "blue" } : { textAlign: "center" }}>
                                    Custom
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderWidth: 1, borderRadius: 10, width: "65%", margin: 20, paddingTop: "2%", paddingBottom: "2%", flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => { setDisplayMode("pie") }} style={{ flex: 1, borderRightWidth: 1, alignItems: "center" }}>
                                <Entypo name="pie-chart" size={20} color="black" style={displayMode === "pie" ? { color: "blue" } : {}} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setDisplayMode("list") }} style={{ flex: 1, borderRightWidth: 1, alignItems: "center" }}>
                                <Entypo name="list" size={20} color="black" style={displayMode === "list" ? { color: "blue" } : {}} />
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
                                !groupedReport.loading ?
                                    <>
                                        {
                                            mode === "daily" ? <Text>{`${groupedReport.dateRange.fromDate}`}</Text> :
                                                <Text>{`${groupedReport.dateRange.fromDate} - ${groupedReport.dateRange.toDate}`}</Text>
                                        }
                                    </> :
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
                    displayMode === "pie" &&
                    <PieMode />
                }
                {
                    displayMode === "list" &&
                    <ListMode/>
                }
            <Modal animationType="slide" visible={filterModal}>
                <FilterModal setFilterModal={setFilterModal} />
            </Modal>
        </SafeAreaView>
    );
}


function PieMode() {

    const groupedReport = useSelector((state: RootState) => state.report)
    const victoryData = getGroupedReportInfoForVictory({ groupedReport: groupedReport.groupedReports })

    return (
        <>
            {
                !groupedReport.loading ?
                    <>
                        {
                            groupedReport.groupedReports.length > 0 ?
                                <View style={{ alignItems: "center", justifyContent: "center", minHeight: 300, minWidth: 300 }}>
                                    <VictoryPie width={300} height={300} style={{ labels: { fontSize: 10 } }} colorScale={["navy", "tomato", "grey"]} data={victoryData.pie} />
                                    <VictoryLegend width={300} itemsPerRow={3} title={"Report Type"} height={100} data={victoryData.legend} gutter={20} colorScale={["navy", "tomato", "grey"]} orientation={"horizontal"} />
                                </View> :
                                <View style={{ alignItems: "center", justifyContent: "center", minHeight: 300, minWidth: 300 }}>
                                    <Text>No report found</Text>
                                </View>
                        }
                    </> :
                    <View style={{ alignItems: "center", justifyContent: "center", minHeight: 300, minWidth: 300 }}>
                        <ActivityIndicator size={"large"} /></View>
            }
            <TouchableOpacity style={{ alignSelf: "center", padding: 10, marginBottom: "5%", borderRadius: 100, backgroundColor: "#4d8ef7" }}>
                <Text style={{ color: "white", fontWeight: "700" }}>Save As</Text>
            </TouchableOpacity>
        </>
    )
}

function ListMode()
{
    const groupedReport = useSelector((state: RootState) => state.report)

    let reports:IReport[] = []
     groupedReport.groupedReports.map((report:ReportGroupedByType)=>{
        report.reports.map((r:IReport)=>{
            reports.push({...r,name:report.name}) // retrive the name from the GroupedReport
        })
    })

    const [selectedReport,setSelectedReport]    = React.useState<IReport>(null)


    function renderItem({item}:{item:IReport}){
        return (
        <View style={{width:"90%",alignSelf:"center"}}>
        <ReportList onPressed={onReportPressed} report={item} key={item._id}/>
        </View>
        )

    }

    const onReportPressed = (report:IReport) => {
        console.log(report)
        setSelectedReport(report)
    }
    
    const onModalClose = () => {
        setSelectedReport(null)
    }

    return (
        <>
        <FlatList 
        data={reports}
        renderItem={renderItem}
        />
        <Modal visible={!!selectedReport} >
            <UpdateReportModal closeModal={onModalClose} report={selectedReport}  />
        </Modal>
        </>
    )
}