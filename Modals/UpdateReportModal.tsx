import React, { useEffect } from "react";
import { Image, View, ScrollView, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ActivityIndicator, Alert } from "react-native";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { IReport } from "../types/Models/Report";
import { detailRenderer } from "../utils/reportHandler";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useReportAction } from "../actions/reportAction";
import { useAdminReport } from "../utils/hooks/useReportGroupedByLocation";
import FormIcon from "../Components/FormIcon";


type ReportModalProps = {
  onForwardPressed?: (report: IReport) => void;
  closeModal: () => void;
  reportID: string;
  forwardButton?: boolean;

};

export default function UpdateReportModal({
  onForwardPressed,
  reportID,
  forwardButton = true,
  closeModal
}: ReportModalProps) {

  const { report,error,loading } = useAdminReport(reportID);
  const [comment, setComment] = React.useState(report?.comment?.comment ?? "");
  const [updatedStatus, setUpdatedStatus] = React.useState<string>(report?.status?._id ?? "");

  const reportAction = useReportAction();

  const statuses = useSelector((state: RootState) => state.userinfo.userinfo.statuses);
  const statuesOptions = useSelector((state: RootState) => statuses.map((status) => {
    return <Picker.Item label={status.desc} value={status._id} key={status._id} />
  }))

  if(error)
  {
    Alert.alert("Error",error);
    closeModal();
  }

  useEffect(() => {
    if (report == null) return;
    setUpdatedStatus(report.status._id);
    setComment(report.comment.comment);
  },
    [report])

  const onStatusChange = (itemValue: string, itemIndex: number) => {
    setUpdatedStatus(itemValue);
  }

  const onCommentChange = (text: string) => {
    setComment(text);
  }

  const onForwardButtonPressed = () => {
    onForwardPressed(report);
    closeModal();
  }

  const updateReport = () => {
    const reportToUpdate: IReport = {
      ...report,
      status: {
        _id: updatedStatus,
        desc: statuses.find((status) => status._id === updatedStatus).desc
      },
      comment: {
        comment: comment,
      }
    };
    reportAction.updateReportAction(reportToUpdate);
    closeModal();
  };

  const [detailElements, setDetailElements] = React.useState<JSX.Element[]>([]);

  React.useEffect(() => {

    if (report == null) return;
    const details = report.details;
    let detailElements: JSX.Element[] = [];
    for (const key in details) {
      const detail = details[key];
      detailElements.push(detailRenderer(detail, key));
    }
    setDetailElements(detailElements);
  }, [report]);


  return (
    <SafeAreaView style={styles.container}>
      {
        loading? <ActivityIndicator
          size={100}
          color="#0000ff"
          style={{
            alignSelf: "center",
            flex: 1,
          }}
        /> :
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeModal}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.reportIdContainer} >
              <Text style={styles.reportId}>{report._id}</Text>
              {
                forwardButton &&
                <Ionicons
                  name="send"
                  size={24}
                  color="black"
                  onPress={onForwardButtonPressed}
                  style={{ marginLeft: 10 }}
                />
              }
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Title</Text>
                <View style={styles.detailValueContainer}>
                  <Text style={styles.detailValue}>{report.form.name}</Text>
                  <FormIcon icon={report.form.icon?report.form.icon:"file-document"} size={24} />
                </View>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Submission Date</Text>
                <Text style={styles.detailValue}>
                  {new Date(report.submissionDate).toDateString()}
                </Text>
              </View>
              {detailElements}
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Latest Updated Date</Text>
              <Text style={styles.detailValue}>
                {new Date(report.updateDate).toDateString()}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Updated By</Text>
              <Text style={styles.detailValue}>
                {"N/A"}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Updates Comment</Text>
              <TextInput
                style={styles.commentInput}
                placeholder="Enter admin comment..."
                value={comment}
                onChangeText={onCommentChange}
              />
            </View>
            <View style={styles.detailRow}>
              <View style={{ alignContent: "center" }}>
                <Text style={[styles.detailLabel]}>Submitted By:</Text>
                <Text style={[styles.detailValue, { fontSize: 12 }]}>
                  {"Name: " + report.complainant.name}
                </Text>
                <Text style={[styles.detailValue, { fontSize: 12, flexWrap: "wrap" }]}>
                  {"Email: " + report.complainant.email}
                </Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Status</Text>
              <Picker style={{ flex: 1 }} selectedValue={updatedStatus} onValueChange={onStatusChange}>
                {statuesOptions}
              </Picker>
            </View>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={updateReport}>
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
          </ScrollView>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  reportIdContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reportId: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 10,
  },

  detailsContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  detailLabel: {
    flex: 1,
    fontWeight: "bold",
    marginRight: 10,
  },
  detailValueContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 4,
  },
  detailValue: {
    flex: 1,
    marginRight: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
  },
  updateButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 20,
  },
  updateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
