import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { getGroupedReportInfoForVictory } from "../utils/victory"
import { IReport } from "../types/Models/Report"
import { VictoryLegend, VictoryPie } from "victory-native"
import { ActivityIndicator, Modal,View,StyleSheet,Text } from "react-native"
import { useGroupedReports } from "../utils/hooks/useGroupedReport"
import { useRef, useState } from "react"
import UpdateReportModal from "../Modals/UpdateReportModal"
import MapViewWithReportMarker from "./MapViewWithReportMarker"

export default function PieMode({ navigation }) {

    const {loading, reports}= useSelector((state: RootState) => state.report)
    const groupedReports = useGroupedReports();
    const victoryData = getGroupedReportInfoForVictory({groupedReport: groupedReports })

    const [selectedReport, setSelectedReport] = useState<IReport | null>(null)

    const mapRef = useRef<React.ElementRef<typeof MapViewWithReportMarker>>(null)


    return (
        <>
          {!loading ? (
            <>
              {groupedReports.length > 0 ? (
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
                  <MapViewWithReportMarker 
                  reports={reports}
                  onReportCardPress={(report) => {
                    setSelectedReport(report)
                  }}
                  key={reports.length}
                  ref={mapRef}
                  />
                  <Modal visible={!!selectedReport}>
                    {selectedReport && (
                      <UpdateReportModal
                        reportID={selectedReport._id}
                        closeModal={() => setSelectedReport(null)}
                        onForwardPressed={report => {
                          ;
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

