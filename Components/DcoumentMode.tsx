import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, ActivityIndicator, Dimensions } from "react-native";
import { useEffect, useRef, useState } from "react";
import { IReport } from "../types/Models/Report";

import TagSelector from "./TagSelector";

import NumberOfReportByStateVictoryChart from "./NumberOfReportsByStatesVictoryChart";

import useReportGroupedByLocation from "../utils/hooks/useReportGroupedByLocation";
import { useNumberOfReportByStateVictoryData } from "../utils/hooks/useNumberOfReportByStateVictoryData";
import MapViewWithReportMarker from "./MapViewWithReportMarker";
import UpdateReportModal from "../Modals/UpdateReportModal";
import React from "react";

export default function DocumentMode({ navigation }) {

    const reportGroupedByLocation = useReportGroupedByLocation().reportGroupedByLocation;
    const loading = useReportGroupedByLocation().loading;

    const states = Object.keys(reportGroupedByLocation)
    const [selectedStates, setSelectedStates] = useState<string[]>([])
    const [selectedCities, setSelectedCities] = useState<string[]>([])

    const [selectedReport, setSelectedReport] = useState<IReport>()
    const [stateCities, setStateCities] = useState<string[]>([])
    const [reports, setReports] = useState<IReport[]>([])


    const { data } = useNumberOfReportByStateVictoryData(selectedStates, selectedCities, reportGroupedByLocation)

    const mapViewWithMarkerRef = useRef<React.ElementRef<typeof MapViewWithReportMarker>>(null)
    // console.log(reports, "reports - log from DocumentMode.tsx")
    // console.log(markers, "markers- log from DocumentMode.tsx")

    //Use effect to update the cities list when the selected states change
    useEffect(() => {
        const reports: IReport[] = []
        const stateCities: string[] = []
        if (selectedStates.length <= 0) {
            Object.keys(reportGroupedByLocation).forEach((state) => {
                Object.keys(reportGroupedByLocation[state]).forEach((city) => {

                    stateCities.push(city)
                    if (selectedCities.length > 0 && !selectedCities.includes(city)) {
                        return
                    }

                    console.log(reportGroupedByLocation[state][city], "reportGroupedByLocation[state][city] - log from DocumentMode.tsx")
                    reports.push(...reportGroupedByLocation[state][city].map((group) => group.reports).flat())
                    console.log(reports, "reports - log from DocumentMode.tsx - ")
                })
            })
            console.log(reports, "reports - log from DocumentMode.tsx - ")
            mapViewWithMarkerRef.current?.resetCamera()
            setReports(reports)
            setStateCities(stateCities)
            return
        }

        selectedStates.forEach((state) => {
            Object.keys(reportGroupedByLocation[state]).forEach((city) => {
                stateCities.push(city)
                if (selectedCities.length > 0 && !selectedCities.includes(city)) {
                    return
                }
                reports.push(...reportGroupedByLocation[state][city].map((group) => group.reports).flat())
            })
        })
        mapViewWithMarkerRef.current?.resetCamera()
        setReports(reports)
        setStateCities(stateCities)
    }, [selectedStates, selectedCities, reportGroupedByLocation])


    const onStateSelect = (state, selected) => {
        if (selected) {
            setSelectedStates(prev => [...prev, state])
        }
        else {
            setSelectedStates(prev => prev.filter((item) => item !== state))

            Object.keys(reportGroupedByLocation[state]).forEach((city) => {
                setSelectedCities(prev => prev.filter((item) => item !== city))
            })

        }
    }

    const onCitySelect = (city, selected) => {
        if (selected) {
            setSelectedCities(prev => [...prev, city])
        }
        else {
            setSelectedCities(prev => prev.filter((item) => item !== city))
        }
    }
    
    const onReportCardPress = (report: IReport) => {
        setSelectedReport(report)
    }




    const statsTagSelector = states.map((state) => {
        return (
            <View
                style={{
                    margin: 10,
                    alignItems: "center",
                }}>
                <TagSelector tagName={`${state}`} tagValue={`${state}`} onSelect={onStateSelect} key={`${state}`} />
            </View>
        )
    })

    const citiesTagSelector = stateCities.map((city, index) => {
        return (
            <View
                style={{
                    margin: 10,
                    alignItems: "center",
                }}
            >
                <TagSelector tagName={`${city}`} tagValue={`${city}`} onSelect={onCitySelect} key={`${city}}`} />
            </View>
        )

    })





    return (
        <ScrollView
            style={{
                height: "70%",
            }}
            contentContainerStyle={{
                paddingVertical: 20,
                alignItems: "center"
            }}>
            {
                loading ?
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <ActivityIndicator size="large" color={"blue"} />
                    </View> :
                    <>
                        <View style={{
                            justifyContent: "space-between",
                            width: "90%",
                            alignSelf: "center",
                            alignItems: "center",
                        }}>
                            <View
                                style={{
                                    alignItems: "center",
                                    width: "100%",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: "bold",
                                        marginBottom: 10,
                                        alignSelf: "flex-start"
                                    }}
                                >States: {states.length}</Text>
                                <View
                                    style={{
                                        flexWrap: "wrap",
                                        justifyContent: "space-between",
                                        flexDirection: "row"
                                    }}
                                >
                                    {statsTagSelector}
                                </View>
                            </View>
                            <View
                                style={{
                                    alignItems: "center",
                                    width: "100%",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: "bold",
                                        marginBottom: 10,
                                        alignSelf: "flex-start"
                                    }}
                                >Cities: {citiesTagSelector.length}</Text>
                                <View
                                    style={{
                                        flexWrap: "wrap",
                                        justifyContent: "space-between",
                                        flexDirection: "row",
                                    }}
                                >
                                    {citiesTagSelector}
                                </View>
                            </View>
                        </View>
                        <MapViewWithReportMarker
                            reports={reports}
                            onReportCardPress={onReportCardPress}
                            ref={mapViewWithMarkerRef}
                        />
                        <Modal
                            visible={!!selectedReport}
                        >
                            {
                                selectedReport &&
                                <UpdateReportModal
                                    closeModal={() => { setSelectedReport(null) }}
                                    reportID={selectedReport}
                                />
                            }
                        </Modal>
                        <View
                            style={{
                                width: "80%",
                                alignItems: "center",
                                marginTop: 20,
                            }}
                        >
                            <Text style={styles.reportText}>Report Details</Text>
                            <View>
                                <View style={{
                                    width: "100%",
                                    alignItems: "center",
                                }}>
                                    <Text style={styles.reportName}>
                                        Number of Reports By States: {reports.length}
                                    </Text>
                                    <NumberOfReportByStateVictoryChart
                                        victoryBarData={data}
                                    />
                                </View>
                            </View>
                        </View>
                    </>

            }
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    reportText: {
        textAlign: "center",
        fontWeight: "700"
    },
    reportInfoContainer: {
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 2,
        elevation: 2
    },
    reportName: {
        fontWeight: "700",
        fontSize: 18,
        color: "#333"
    },
    reportDetail: {
        flexDirection: "row",
        marginBottom: 5
    },
    reportDetailLabel: {
        fontWeight: "700",
        flex: 1
    },
    reportDetailValue: {
        flex: 1
    }
})

