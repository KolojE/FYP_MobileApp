import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { IReport } from "../types/Models/Report";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Ionicons } from "@expo/vector-icons";

type ReportListProps = {
  onPressed?: (report: IReport) => void;
  onForwardMessagePress: (report: IReport) => void;
  report: IReport;
};

export default function ReportList({ onPressed, onForwardMessagePress, report }: ReportListProps) {
  const { submissionDate, _id, name } = report;
  const status = useSelector((state: RootState) => state.userinfo).userinfo.statuses.find(
    (status) => status._id === report.status._id
  );

  return (
    <TouchableOpacity
      onPress={onPressed ? () => onPressed(report) : () => {}}
      style={styles.container}
    >
      <View style={styles.rowContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.reportId}>{`#${_id}`}</Text>
          <Text style={styles.submissionDate}>{new Date(submissionDate).toDateString()}</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
        </View>
        <TouchableOpacity
          style={styles.statusContainer}
          onPress={() => onForwardMessagePress(report)}
        >
          <Text style={styles.statusDescription}>{status.desc}</Text>
          <Ionicons name="send" size={15} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderBottomWidth: 0.2,
    borderColor: "grey",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
  },
  infoContainer: {
    justifyContent: "center",
    flex: 1,
  },
  reportId: {
    fontSize: 12,
    color: "#00000",
  },
  submissionDate: {
    fontSize: 8,
    color: "#828282",
  },
  nameContainer: {
    flex: 2,
    height: "100%",
    paddingLeft: 20,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
  },
  statusContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  statusDescription: {
    fontSize: 14,
  },
  icon: {
    padding: 5,
  },
});
