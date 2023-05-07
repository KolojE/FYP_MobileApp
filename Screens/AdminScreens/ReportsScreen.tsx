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


type WeeklyReport = {
    weekoffset:number;
    reports:ReportGroupedByType[];
}

type Info = {
    dateRange:string;
    totalReport:number;

}

export default function ReportsScreen() {
    const [graphVisible, setGraphVisible] = React.useState(false);
    const [filterModal, setFilterModal] = React.useState(false);
    

    const [weeklyReport,setWeeklyReport] = React.useState<WeeklyReport>({
        reports:[],
        weekoffset:0,
    })
    const [info,setInfo] = React.useState<Info>({
        dateRange:"",
        totalReport:0
    })

    const victoryData = getGroupedReportInfoForVictory({groupedReport:weeklyReport.reports})

    React.useEffect(()=>{
        getReportsWeeklyBySubmissionDate({weekOffSet:weeklyReport.weekoffset})
        .then((result)=>{
            setWeeklyReport((prev)=>{return {...prev,reports:result.groupedReport}});
            let totalReport = 0
              result.groupedReport.forEach((group)=>{
                totalReport += group.reports.length;
            })
            setInfo((prev)=>{return {...prev,dateRange:result.dateRange.fromDate.toDateString() + "-" + result.dateRange.toDate.toDateString(),totalReport:totalReport}})       
        },(rej)=>{errorHandler(rej)})
        
    },[])

   
    const data = [{ x: 1, y: 4 }, { x: 2, y: 3 }, { x: 4, y: 5 }, { x: 3, y: 6 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 0 }];
    return (
        <SafeAreaView>
            <ScrollView>
                <Title title={"Reports"} />
                <View style={{ alignItems: "center" }}>
                    <View>

                        <View style={{ borderWidth: 1, borderRadius: 10, width: "80%", margin: 20, paddingTop: "2%", paddingBottom: "2%", flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => { setGraphVisible(false) }} style={{ flex: 1, borderRightWidth: 1 }}>
                                <Text style={{ textAlign: "center" }}>
                                    Day
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setGraphVisible(true) }} style={{ flex: 1, borderRightWidth: 1 }}>
                                <Text style={{ textAlign: "center", color: "blue", fontWeight: "500" }}>
                                    Week
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setGraphVisible(true) }} style={{ flex: 1, borderRightWidth: 1 }}>
                                <Text style={{ textAlign: "center" }}>
                                    Month
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setGraphVisible(true); setFilterModal(true) }} style={{ flex: 1 }}>
                                <Text style={{ textAlign: "center" }}>
                                    Custom
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <SimpleLineIcons name="arrow-left" style={{ marginRight: 10 }} />
                        <Text>
                            {info.dateRange}
                        </Text>
                        <SimpleLineIcons name="arrow-right" style={{ marginLeft: 10 }} />
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
                <FilterModal setFilterModal={setFilterModal} />
            </Modal>
            <Modal visible={false}>

            </Modal>
        </SafeAreaView>
    );
}