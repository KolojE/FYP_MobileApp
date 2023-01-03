import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { useLinkProps } from "@react-navigation/native";
import React from "react";
import {
  ScrollView,
  View,
  Text,
  Touchable,
  TouchableOpacity,
} from "react-native";
import ReportList from "../Components/ReportList";

export default function ReportListScreen(props) {
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "8%",
          paddingBottom: "5%",
          backgroundColor: "#89CFF0",
          width: "100%",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{ marginLeft: "5%", flex: 3 }}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <AntDesign name="back" size={18} color="black" />
        </TouchableOpacity>
        <Text style={{ flex: 3, fontWeight: "bold", fontSize: 16 }}>
          Reports
        </Text>
        <TouchableOpacity style={{ flex: 1 }}>
          <SimpleLineIcons name="magnifier" size={16} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View style={{ width: "95%" }}>
          <ReportList />
          <ReportList />
          <ReportList />
          <ReportList />
          <ReportList />
          <ReportList />
          <ReportList />
          <ReportList />
          <ReportList />
          <ReportList />
          <ReportList />
          <ReportList />
          <ReportList />
          <ReportList />
          <ReportList />
        </View>
      </ScrollView>
    </View>
  );
}
