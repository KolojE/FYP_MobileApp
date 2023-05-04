import React from "react";
import { View, TouchableOpacity, Text } from "react-native";



export default function ReportList({ SetReportModal, date, reportId, reportName, status }) {

console.log(status)
  return (
    <TouchableOpacity onPress={() => { SetReportModal(true) }}
      style={{
        height: 45,
        borderBottomWidth: 0.2,
        borderColor: "grey",
        justifyContent: "center",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Text style={{ fontSize: 12, color: "#00000" }}>{`#${reportId}`}</Text>
          <Text style={{ fontSize: 8, color: "#828282" }}>
            {date.toDateString()}
          </Text>
        </View>
        <View style={{ flex: 2, height: "100%",paddingLeft:20, justifyContent: "center" }}>
          <Text>{reportName}</Text>
        </View>
        <View
          style={{
            flex: 1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 10 }}>{status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
