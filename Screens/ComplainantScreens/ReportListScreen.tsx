import React, {useState} from "react";
import {  View, Text, TouchableOpacity, FlatList, RefreshControl, Modal, StyleSheet } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import ReportScreen from "../../Modals/ReportModal";
import { IReport } from "../../types/Models/Report";
import { useReports } from "../../utils/hooks/useReports";
import SearchBar from "../../Components/SearchBar";
import ReportList from "../../Components/ReportList";
import FilterModal from "../../Modals/FilterModal";
import { filterOptions } from "../../types/General";

type ReportListScreenProps = {
  navigation: any;
};

export default function ReportListScreen({ navigation }: ReportListScreenProps) {
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState<IReport>(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterOptions, setFilterOptions] = useState<filterOptions>({
    toDate: new Date(),
    sortBy:"subDate",
  });



  const {
    reports,
    loading,
  }= useReports({
    filter: filterOptions,
  });

  const [filtered, setFiltered] = useState<IReport[]>([]);



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

  const renderItem = ({ item }) => {
    return (
      <ReportList 
      report={item}
      onForwardMessagePress={forwardReport}
      onPressed={() => {
        openReportModal(item);
      }}
      />
    );
  }

  const onFilter = (filter: filterOptions) => {
    setFilterOptions(filter);
  }


  const onSearchTextChanged = (text: string) => {
    setFiltered(reports.filter((report) => report.form.name.toLowerCase().includes(text.toLowerCase())||report._id.toLowerCase().includes(text.toLowerCase())));
  }

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
        <TouchableOpacity
         style={styles.filterButton}
          onPress={() => {
            setFilterModalVisible(true);
          }}
        >
          <Ionicons name="filter" size={18} color="white" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
          <SearchBar 
            onSearchTextChanged={onSearchTextChanged}
            />
      </View>
      <FlatList
      data={filtered.length > 0 ? filtered : reports}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      style={styles.reportListContainer}  
      />
      <Modal statusBarTranslucent={true} visible={reportModalVisible && selectedReport !== null} animationType="slide">
        <ReportScreen
          closeModal={closeReportModal}
          reportID={selectedReport && selectedReport._id}
          onForwardPressed={forwardReport}
        />
      </Modal>
      <Modal
      visible={filterModalVisible}
      >
        <FilterModal 
        onFilter={
          onFilter
        }
        setFilterModal={setFilterModalVisible}
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
    paddingBottom: 20,
  },
  header: {
    backgroundColor: "#162147",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
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
