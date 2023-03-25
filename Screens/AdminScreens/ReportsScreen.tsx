import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VictoryPie, VictoryLegend, VictoryChart, VictoryArea, VictoryScatter, VictoryLine, VictoryAxis } from "victory-native";
import Title from "../../Components/Title";
import FilterModal from "../../Modals/FilterModal";



export default function ReportsScreen() {
    const [graphVisible, setGraphVisible] = React.useState(false);
    const [filterModal, setFilterModal] = React.useState(false);
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
                            30-Jan - 05-Feb
                        </Text>
                        <SimpleLineIcons name="arrow-right" style={{ marginLeft: 10 }} />
                    </View>
                </View>
                <View style={{ alignItems: "center" }}>
                    <VictoryPie width={300} height={300} style={{ labels: { fontSize: 10 } }} colorScale={["navy", "tomato", "grey"]} data={[{ x: 10, y: 10 }, { x: 6, y: 6 }, { x: 4, y: 4 }]} />
                    <VictoryLegend width={300} itemsPerRow={3} title={"Report Type"} height={100} data={[{ name: "flood" }, { name: "fire wild" }, { name: "road crack" }]} gutter={20} colorScale={["navy", "tomato", "grey"]} orientation={"horizontal"} />
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