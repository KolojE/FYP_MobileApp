import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IReport } from "../types/Models/Report";
import { Ionicons } from "@expo/vector-icons";


type RecenReportProps = {
  report:IReport;
  onForwardReportPressed?: (report:IReport) => void,
}

export default function RecentReport({report,onForwardReportPressed}:RecenReportProps) {

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
            flexDirection:"row"
          }}
        >
          <Text style={{ fontSize: 10,paddingHorizontal:"6%" }}>{report.status.desc}</Text>
          <Ionicons name="send" size={12} color="black"  onPress={()=>{
            onForwardReportPressed(report)
            }}/>
        </View>
      </View>
    </TouchableOpacity>
  );
}
