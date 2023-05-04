import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IReport } from "../api/Models/Report";


type RecenReportProps = {
  report:IReport;

}

export default function RecentReport({report}:RecenReportProps) {

  return (
    <TouchableOpacity
      style={{
        height: 45,
        borderBottomWidth: 0.2,
        borderColor: "grey",
        borderStyle: "dotted",
        justifyContent: "center",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Text style={{ fontSize: 12, color: "#00000" }}>{report._id}</Text>
          <Text style={{ fontSize: 8, color: "#828282" }}>
            {report.updateDate.toLocaleString()}
          </Text>
        </View>
        <View style={{ flex: 2, height: "100%", justifyContent: "center" }}>
          <Text>{report.name}</Text>
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
