import { AntDesign, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ReportListContainer from "../../Components/ReportListContainer";
import ReportScreen from "../../Modals/ReportModal";
import { IReport } from "../../api/Models/Report";
import { getReport } from "../../api/complainant";

type ReportListScreenProps = {
  reports: IReport[];
  navigation: any;
}

export default function ReportListScreen({ navigation }: ReportListScreenProps) {

  const [ReportModal, setReportModal] = React.useState(false);
  const [reports, setReports] = React.useState<IReport[]>([]);
  const [reportListContainerElements, setReportListContainerElements] = React.useState<JSX.Element>();


  React.useEffect(() => {
    getReport({ sortBy: "subDate", limit: 20 }).then(
      (res) => {
        setReports(res);
      }
    )
  }, [])


  React.useEffect(() => {
    setReportListContainerElements((prev) => {
      return <ReportListContainer reports={reports} setReportModal={setReportModal} />
    })
  }, [reports])


  const getReportToDate = () => {
    getReport((
      {
        dateRange: {
          subToDate: new Date(reports[reports.length - 1].submissionDate)
        }
        , limit: 10,
        sortBy: "subDate"
      })).then((reports) => {

        setReports((prev) => {
          return reports.concat(prev).filter((report, index, self) => {
            index === self.findIndex((t) => t._id === report._id)
          })
        })

      })
  }



  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  const onScroll = ({ nativeEvent }) => {
    if (isCloseToBottom(nativeEvent)) {
      getReportToDate()
    }
  }

  return (
    <SafeAreaView>

      <View style={{ height: "100%", width: "100%" }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "7%",
            paddingBottom: "5%",
            backgroundColor: "#162147",
            width: "100%",
            flexDirection: "row",
            borderBottomEndRadius: 20,
            borderBottomStartRadius: 30,
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: "5%" }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign name="back" size={18} color="white" />
          </TouchableOpacity>
          <Text style={{ color: "white", marginLeft: "15%", fontWeight: "bold", fontSize: 16 }}>
            Reports
          </Text>
          <TouchableOpacity style={{ marginLeft: "auto", marginRight: "10%" }}>
            <Ionicons name="filter" size={18} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ alignItems: "center" }} onScroll={onScroll}>
          <View style={{ width: "95%" }}>
            {reportListContainerElements}
          </View>
        </ScrollView>
        <Modal statusBarTranslucent={true} visible={ReportModal}
          animationType="slide"
        >
          <ReportScreen
            SetReportModal={setReportModal}
          />
        </Modal>
      </View>
    </SafeAreaView>
  );
}
