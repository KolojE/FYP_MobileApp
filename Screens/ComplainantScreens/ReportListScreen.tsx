import React, { useEffect, useState, useCallback } from "react";
import { ScrollView, View, Text, TouchableOpacity, FlatList, RefreshControl, Modal, StyleSheet } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import ReportListContainer from "../../Components/ReportListContainer";
import ReportScreen from "../../Modals/ReportModal";
import { IReport } from "../../types/Models/Report";
import { useReports } from "../../utils/hooks/useReports";

type ReportListScreenProps = {
  navigation: any;
};

export default function ReportListScreen({ navigation }: ReportListScreenProps) {
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState<IReport>(null);
  const [reportListContainerElements, setReportListContainerElements] = useState<JSX.Element>();


  const reports = useReports({
    filter: {
      toDate: new Date(),
      sortBy:"subDate",
    }
  });

  const openReportModal = (report: IReport) => {
    setSelectedReport(report);
    setReportModalVisible(true);
  };

  const closeReportModal = () => {
    setReportModalVisible(false);
  };

  const forwardReport = (report: IReport) => {
    navigation.navigate("Chat", { report: {
     _id: report._id,
     form:report.form,
    }});
  };

  useEffect(() => {
    setReportListContainerElements(
      <ReportListContainer
        onForwardPressed={forwardReport}
        reports={reports}
        onOpenModalPressed={openReportModal}
      />
    );
  }, [reports]);

  
  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="back" size={18} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Reports</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={18} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer} onScroll={()=>{}}>
        <View style={styles.reportListContainer}>{reportListContainerElements}</View>
      </ScrollView>
      <Modal statusBarTranslucent={true} visible={reportModalVisible && selectedReport !== null} animationType="slide">
        <ReportScreen
          closeModal={closeReportModal}
          reportID={selectedReport && selectedReport._id}
          onForwardPressed={forwardReport}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    backgroundColor: "#162147",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 30,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  filterButton: {
    marginLeft: "auto",
  },
  reportListContainer: {
    paddingHorizontal: 10,
  },
});
