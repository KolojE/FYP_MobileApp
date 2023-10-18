import { Entypo, SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal,StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FilterModal from "../../Modals/FilterModal";
import { useReportAction } from "../../actions/reportAction";
import { useSelector } from "react-redux";
import Title from "../../Components/Title";
import { RootState } from "../../redux/store";
import FileDownloadModal from "../../Modals/FileDownloadModal";

import PieMode from "../../Components/PieMode";
import ListMode from "../../Components/ListMode";
import DocumentMode from "../../Components/DcoumentMode";


export default function ReportsScreen({ navigation }) {



    const [filterModal, setFilterModal] = React.useState(false);

    const [mode, setMode] = React.useState<"weekly" | "monthly" | "daily" | "custom">("weekly");
    const [displayMode, setDisplayMode] = React.useState<"pie" | "list"|"document">("pie")
    const [offset, setOffset] = React.useState<number>(0)
    const [saveAsModal, setSaveAsModal] = React.useState<boolean>(false)
    const [filterOptions, setFilterOptions] = React.useState<any>(null)
    const reports = useSelector((state: RootState) => state.report)
    const adminAction = useReportAction()


    React.useEffect(() => {
        if (mode === "weekly") {
                        adminAction.fetchReportByWeekly(offset)
            return
        }

        if (mode === "daily") {
                        adminAction.fetchReportByDaily(offset)
            return
        }

        if (mode === "monthly") {
            adminAction.fetchReportByMonthly(offset)
        }
    }, [offset, mode])

    React.useEffect(() => {
        setOffset(0)
    }, [mode])

    const onFilterButtonPressed = (filterOptions) => {
        adminAction.fetchReportCustom(filterOptions)
        setFilterOptions(filterOptions)
    }

    const onLeftButtonPressed = () => {
        setOffset(offset + 1)

    }
    const onRightButtonPressed = () => {
        setOffset(offset - 1)
    }

    const onListButtonPressed = () => {
        setDisplayMode("list")
    }

    const onDocumentButtonPressed = () => {
      setDisplayMode("document")
    }

    const onPieButtonPressed = () => {
        setDisplayMode("pie")
    }
    const onSaveAsButtonPressed = () => {
        setSaveAsModal(true)
    }

    const onSaveAsModalClose = () => {
        setSaveAsModal(false)
    }

    const onFileTypeSelected = (fileType: string) => {
        if (fileType === "csv") {
            if (mode === "daily") {
                adminAction.fetchReportByDaily(offset, "xlsx")
            }
            if (mode === "weekly") {
                adminAction.fetchReportByWeekly(offset, "xlsx")
            }
            if (mode === "monthly") {
                adminAction.fetchReportByMonthly(offset, "xlsx")
            }
            if (mode === "custom") {
                adminAction.fetchReportCustom(filterOptions, "xlsx")
            }
        }
    }



    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "white" }}>
          <Title title={'Reports'} />
          <View style={[styles.container,{overflow:"hidden"}]}>
            <View style={styles.container}>
              <View style={styles.rowContainer}>
                <TouchableOpacity onPress={() => { setMode('daily') }} style={[styles.modeButton, mode === 'daily' && { borderRightWidth: 1 }]}>
                  <Text style={mode === 'daily' ? styles.activeModeButtonText : styles.modeButtonText}>
                    Day
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setMode('weekly') }} style={[styles.modeButton, mode === 'weekly' && { borderRightWidth: 1 }]}>
                  <Text style={mode === 'weekly' ? styles.activeModeButtonText : styles.modeButtonText}>
                    Week
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setMode('monthly') }} style={[styles.modeButton, mode === 'monthly' && { borderRightWidth: 1 }]}>
                  <Text style={mode === 'monthly' ? styles.activeModeButtonText : styles.modeButtonText}>
                    Month
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setFilterModal(true); setMode('custom') }} style={styles.modeButton}>
                  <Text style={mode === 'custom' ? styles.activeModeButtonText : styles.modeButtonText}>
                    Custom
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.displayButtonContainer}>
                <TouchableOpacity onPress={onPieButtonPressed} style={[styles.displayButton, displayMode === 'pie' && { borderRightWidth: 1 }]}>
                  <Entypo name="pie-chart" size={20} color="black" style={displayMode === 'pie' ? styles.activePieChartIcon : styles.pieChartIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onListButtonPressed} style={styles.displayButton}>
                  <Entypo name="list" size={20} color="black" style={displayMode === 'list' ? styles.activeListIcon : styles.listIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDocumentButtonPressed} style={styles.displayButton}>
                  <Entypo name="documents" size={20} color="black" style={displayMode === 'document' ? styles.activeListIcon : styles.listIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.dateRowContainer}>
              {mode !== 'custom' && (
                <View style={styles.leftButtonContainer}>
                  <TouchableOpacity onPress={onLeftButtonPressed} style={styles.arrowIcon}>
                    <SimpleLineIcons name="arrow-left" />
                  </TouchableOpacity>
                </View>
              )}
              <View style={{ flex: 1, alignItems: 'center' }}>
                {!reports.loading ? (
                  <>
                    {mode === 'daily' ? (
                      <Text>{`${reports.dateRange.fromDate}`}</Text>
                    ) : (
                      <Text>{`${reports.dateRange.fromDate} - ${reports.dateRange.toDate}`}</Text>
                    )}
                  </>
                ) : (
                  <Text style={styles.loadingText}>Loading...</Text>
                )}
              </View>
              {offset !== 0 && (
                <View style={styles.rightButtonContainer}>
                  <TouchableOpacity onPress={onRightButtonPressed} style={styles.arrowIcon}>
                    <SimpleLineIcons name="arrow-right" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          {displayMode === 'pie' && (
            <ScrollView style={{ height: '70%' }}>
              <PieMode navigation={navigation} />
              <TouchableOpacity
                style={styles.exportButton}
                onPress={onSaveAsButtonPressed}
              >
                <Text style={styles.exportButtonText}>Export Data As Excel</Text>
              </TouchableOpacity>
              <FileDownloadModal
                visible={saveAsModal}
                onClose={onSaveAsModalClose}
                onFileTypeSelect={onFileTypeSelected}
              />
            </ScrollView>
          )}
          {displayMode === 'list' && <ListMode navigation={navigation} />}
          {displayMode === 'document' && <DocumentMode navigation={navigation} />}
          <Modal animationType="slide" visible={filterModal}>
            <FilterModal setFilterModal={setFilterModal} onFilter={onFilterButtonPressed} />
          </Modal>
        </SafeAreaView>
      );
}
const styles = StyleSheet.create({

    container: {
      alignItems: 'center',
    },
    rowContainer: {
      borderWidth: 1,
      borderRadius: 10,
      width: '80%',
      marginTop: '5%',
      paddingTop: '2%',
      paddingBottom: '2%',
      flexDirection: 'row',
    },
    modeButton: {
      flex: 1,
      borderRightWidth: 1,
    },
    modeButtonText: {
      textAlign: 'center',
    },
    activeModeButtonText: {
      textAlign: 'center',
      color: 'blue',
    },
    displayButtonContainer: {
      borderWidth: 1,
      borderRadius: 10,
      width: '65%',
      margin: 20,
      paddingTop: '2%',
      paddingBottom: '2%',
      flexDirection: 'row',
    },
    displayButton: {
      flex: 1,
      borderRightWidth: 1,
      alignItems: 'center',
    },
    pieChartIcon: {
      color: 'black',
    },
    activePieChartIcon: {
      color: 'blue',
    },
    listIcon: {
      color: 'black',
    },
    activeListIcon: {
      color: 'blue',
    },
    dateRowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80%',
    },
    leftButtonContainer: {
      position: 'absolute',
      left: 0,
    },
    rightButtonContainer: {
      position: 'absolute',
      right: 0,
    },
    arrowIcon: {
      padding: 10,
    },
    loadingText: {
      textAlign: 'center',
    },
    exportButton: {
      alignSelf: 'center',
      padding: 10,
      marginTop: '20%',
      marginBottom: '10%',
      borderRadius: 100,
      backgroundColor: '#4d8ef7',
    },
    exportButtonText: {
      color: 'white',
      fontWeight: '700',
    },
  });
