import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

export default function ReportList(props) {
  return (
    <TouchableOpacity onPress={() => { props.SetReportModal(true) }}
      style={{
        height: 45,
        borderBottomWidth: 0.2,
        borderColor: "grey",
        justifyContent: "center",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Text style={{ fontSize: 12, color: "#00000" }}>#R0152141</Text>
          <Text style={{ fontSize: 8, color: "#828282" }}>
            10 jan 2022 21:32
          </Text>
        </View>
        <View style={{ flex: 2, height: "100%", justifyContent: "center" }}>
          <Text>Water Floord</Text>
        </View>
        <View
          style={{
            flex: 1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 10 }}>Status</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
