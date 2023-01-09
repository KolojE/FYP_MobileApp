import React from "react";
import { View, Text } from "react-native";
import ReportList from "./ReportList";




export default function ReportListContainer(props) {
    return (
        <View style={{ marginBottom: "5%" }}>
            <View style={{ paddingTop: "3%" }}>
                <Text style={{ fontSize: 8, color: "grey" }}>
                    10 Jan 2020 - 17 Jan 2020
                </Text>
            </View>
            <ReportList SetReportModal={props.SetReportModal} />
            <ReportList SetReportModal={props.SetReportModal} />
            <ReportList SetReportModal={props.SetReportModal} />
            <ReportList SetReportModal={props.SetReportModal} />
            <ReportList SetReportModal={props.SetReportModal} />
            <ReportList SetReportModal={props.SetReportModal} />
        </View>
    )
}