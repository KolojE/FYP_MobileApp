import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { IReport } from "../types/Models/Report";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


type ReportListProps = {
  onPressed?: (report: IReport) => void,
  report: IReport,
}

export default function ReportList({ onPressed, report }: ReportListProps) {

  const { submissionDate, _id, name } = report;
  const status= useSelector((state: RootState) => state.userinfo).userinfo.statuses.find((status) => status._id === report.status._id);
  return (
    <TouchableOpacity onPress={onPressed ? () => { onPressed(report) } : () => { }}
      style={{
        height: 45,
        borderBottomWidth: 0.2,
        borderColor: "grey",
        justifyContent: "center",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Text style={{ fontSize: 12, color: "#00000" }}>{`#${_id}`}</Text>
          <Text style={{ fontSize: 8, color: "#828282" }}>
            {new Date(submissionDate).toDateString()}
          </Text>
        </View>
        <View style={{ flex: 2, height: "100%", paddingLeft: 20, justifyContent: "center" }}>
          <Text>{name}</Text>
        </View>
        <View
          style={{
            flex: 1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 10 }}>{status.desc}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
