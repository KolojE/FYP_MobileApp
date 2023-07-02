import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { getGroupedReportInfoForVictory } from "../utils/victory"
import React from "react"
import { IReport } from "../types/Models/Report"
import MapView, { Marker } from "react-native-maps"
import CustomMarker from "./CustomMarker"
import { VictoryLegend, VictoryPie } from "victory-native"
import { ActivityIndicator, Modal, TouchableOpacity, View,StyleSheet,Text } from "react-native"
import { Entypo, FontAwesome, Foundation } from "@expo/vector-icons"
import UpdateReportModal from "../Modals/UpdateReportModal"
import FadeInView from "./FadeInView"

export default function PieMode({ navigation }) {

    const groupedReport = useSelector((state: RootState) => state.report)
    const victoryData = getGroupedReportInfoForVictory({ groupedReport: groupedReport.groupedReports })

    const [reportLocationMarker, setReportLocationMarker] = React.useState<Array<{ report: IReport, location: { lo: number, la: number }, marker: JSX.Element }>>([])

    const [selectedReport, setSelectedReport] = React.useState<IReport | null>(null)
    const [focusedLocation, setFocusedLocation] = React.useState<number>(-1)
    const [isFocused, setIsFocused] = React.useState<boolean>(false)

    const mapRef = React.useRef<MapView | null>(null)
    React.useEffect(() => {
        setReportLocationMarker(() => [])
        setFocusedLocation(() => -1)
        setIsFocused(() => false)
        groupedReport.groupedReports.forEach((group) => {

            group.reports.forEach((report, index) => {
                setReportLocationMarker((prev) => {
                    return [...prev, {
                        location: {
                            lo: report.location.longitude,
                            la: report.location.latitude
                        },
                        report: { ...report, name: group.name },
                        marker: <Marker
                            coordinate={{ latitude: report.location.latitude, longitude: report.location.longitude }}
                            tracksViewChanges={false}
                        >
                            <FontAwesome name="dot-circle-o" size={35} color="blue" />
                        </Marker>,
                    }]
                })
            })
        })
    }, [groupedReport])

    console.log("reportLocationMarker", reportLocationMarker.length)

    React.useEffect(() => {


        setReportLocationMarker((prev) => prev.map((marker, index) => {

            if (!isFocused) {
                return {
                    ...marker,
                    marker: <CustomMarker
                        key={index}
                        report={marker.report}
                        focusedLocation={focusedLocation}
                        index={index} latitude={marker.location.la}
                        longitude={marker.location.lo}
                        onMarkerPress={onMarkerPress} />
                }
            }

            if (index !== focusedLocation) {
                return {
                    ...marker,
                    marker: <CustomMarker
                        key={index}
                        report={marker.report}
                        focusedLocation={focusedLocation}
                        index={index} latitude={marker.location.la}
                        longitude={marker.location.lo}
                        onMarkerPress={onMarkerPress} />
                }
            }
            return {
                ...marker,
                marker: <CustomMarker
                    key={index}
                    report={marker.report}
                    focusedLocation={focusedLocation}
                    index={index} latitude={marker.location.la}
                    longitude={marker.location.lo}
                    onMarkerPress={onMarkerPress}
                    animated={true} />
            }
        }
        ))
    }
        , [focusedLocation, isFocused]
    )



    const onMarkerPress = (report: IReport) => {
        console.log(report)

    }

    const onNextPressed = () => {
        if (focusedLocation < reportLocationMarker.length - 1 && reportLocationMarker.length > 0) {
            setFocusedLocation(focusedLocation + 1)
            setIsFocused(true)
            mapRef.current?.animateToRegion({
                latitude: reportLocationMarker[focusedLocation + 1].location.la + 0.0015,
                longitude: reportLocationMarker[focusedLocation + 1].location.lo,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            })
        }
    }

    const onPreviousPressed = () => {
        if (focusedLocation > 0) {
            setFocusedLocation(focusedLocation - 1)
            setIsFocused(true)
            mapRef.current?.animateToRegion({
                latitude: reportLocationMarker[focusedLocation - 1].location.la + 0.0015,
                longitude: reportLocationMarker[focusedLocation - 1].location.lo,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            })
        }
    }

    const onRefreshPressed = () => {
        setFocusedLocation(-1)
        setIsFocused(false)
        fitToCoordinates();
    }
    console.log(JSON.stringify(groupedReport, null, 2))
    const fitToCoordinates = () => {

        mapRef.current?.fitToCoordinates(reportLocationMarker.map((marker) => {
            return {
                latitude: marker.location.la,
                longitude: marker.location.lo
            }
        }), {
            edgePadding: {
                top: 100,
                right: 100,
                bottom: 100,
                left: 100,

            },
            animated: true
        })
    }
    return (
        <>
          {!groupedReport.loading ? (
            <>
              {groupedReport.groupedReports.length > 0 ? (
                <>
                  <View style={styles.container}>
                    <VictoryPie
                      width={300}
                      height={300}
                      style={{ labels: { fontSize: 10 } }}
                      colorScale={["navy", "tomato", "grey"]}
                      data={victoryData.pie}
                    />
                    <VictoryLegend
                      width={300}
                      itemsPerRow={3}
                      title={"Report Type"}
                      height={100}
                      data={victoryData.legend}
                      gutter={20}
                      colorScale={["navy", "tomato", "grey"]}
                      orientation={"horizontal"}
                    />
                  </View>
                  <View>
                    <Text style={[styles.reportText, { textAlign: "center", fontWeight: "700" }]}>Reported Incident Location</Text>
                    <View style={styles.reportLocationContainer}>
                      <Entypo name="chevron-left" size={30} color="black" onPress={onPreviousPressed} />
                      <Text>
                        {isFocused ? `${focusedLocation + 1}/${reportLocationMarker.length}` : `Total Reports: ${reportLocationMarker.length}`}
                      </Text>
                      <Entypo name="chevron-right" size={30} color="black" onPress={onNextPressed} />
                    </View>
                  </View>
                  <View style={styles.mapContainer}>
                    <MapView
                      ref={mapRef}
                      key={reportLocationMarker.length}
                      zoomEnabled={true}
                      rotateEnabled={false}
                      scrollEnabled={false}
                      style={styles.mapView}
                      initialRegion={{
                        latitude: reportLocationMarker[focusedLocation]?.location?.la ?? 0,
                        longitude: reportLocationMarker[focusedLocation]?.location?.lo ?? 0,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                      }}
                      onLayout={fitToCoordinates}
                    >
                      {reportLocationMarker.map(marker => marker.marker)}
                    </MapView>
                    <View style={styles.overlayContainer}>
                      <FadeInView
                        style={styles.overlayView}
                        duration={500}
                        isVisible={isFocused}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedReport(reportLocationMarker[focusedLocation]?.report);
                          }}
                          style={styles.reportInfoContainer}
                        >
                          <Text style={styles.reportName}>
                            {reportLocationMarker[focusedLocation]?.report?.name}
                          </Text>
                          <View style={styles.reportDetail}>
                            <Text style={styles.reportDetailLabel}>Report ID: </Text>
                            <Text>{reportLocationMarker[focusedLocation]?.report?._id}</Text>
                          </View>
                          <View style={styles.reportDetail}>
                            <Text style={styles.reportDetailLabel}>Report Date: </Text>
                            <Text>
                              {new Date(reportLocationMarker[focusedLocation]?.report?.submissionDate).toUTCString()}
                            </Text>
                          </View>
                          <View style={styles.reportDetail}>
                            <Text style={styles.reportDetailLabel}>Submitted BY: </Text>
                            <Text>{reportLocationMarker[focusedLocation]?.report?.complainant.name}</Text>
                          </View>
                          <View style={styles.reportDetail}>
                            <Text style={styles.reportDetailLabel}>Report Status: </Text>
                            <Text>{reportLocationMarker[focusedLocation]?.report?.status.desc}</Text>
                          </View>
                        </TouchableOpacity>
                      </FadeInView>
                    </View>
                    <TouchableOpacity
                      style={styles.refreshButton}
                      onPress={onRefreshPressed}
                    >
                      <Foundation name="refresh" size={20} color="black" style={{}} />
                    </TouchableOpacity>
                  </View>
                  <Modal visible={!!selectedReport}>
                    {selectedReport && (
                      <UpdateReportModal
                        reportID={selectedReport}
                        closeModal={() => setSelectedReport(null)}
                        onForwardPressed={report => {
                          console.log(report.name);
                          setSelectedReport(null);
                          navigation.navigate("ChatRoom", { report: report, complainantID: report.complainant._id });
                        }}
                      />
                    )}
                  </Modal>
                </>
              ) : (
                <View style={[styles.container, styles.noReportContainer]}>
                  <Text>No report found</Text>
                </View>
              )}
            </>
          ) : (
            <View style={[styles.container, styles.noReportContainer]}>
              <ActivityIndicator size="large" />
            </View>
          )}
        </>
      );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  pieChartContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center"
  },
  reportLocationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center"
  },
  mapContainer: {
    width: "90%",
    height: 400,
    alignSelf: "center",
    marginTop: 20
  },
  mapView: {
    width: "100%",
    height: "100%"
  },
  overlayContainer: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    width: "100%",
    height: "40%",
    alignItems: "center"
  },
  overlayView: {
    backgroundColor: "white",
    width: "90%",
    height: "100%",
    borderRadius: 10,
    elevation: 5
  },
  refreshButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  noReportContainer: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 300,
    minWidth: 300
  },
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
});
