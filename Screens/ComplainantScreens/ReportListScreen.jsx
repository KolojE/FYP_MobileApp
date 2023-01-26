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

export default function ReportListScreen(props) {

  const [ReportModal, SetReportModal] = React.useState(false);
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
              props.navigation.goBack();
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
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <View style={{ width: "95%" }}>
            <ReportListContainer SetReportModal={SetReportModal} />
            <ReportListContainer SetReportModal={SetReportModal} />
            <ReportListContainer SetReportModal={SetReportModal} />
            <ReportListContainer SetReportModal={SetReportModal} />
          </View>
        </ScrollView>
        <Modal statusBarTranslucent={true} visible={ReportModal}
          animationType="slide"
        >
          <ReportScreen
            SetReportModal={SetReportModal}
          />
        </Modal>
      </View>
    </SafeAreaView>
  );
}
