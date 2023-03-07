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
            <ReportList reportName={"Road Crack"} reportId={"#R0152325"} date={"11 feb 2022 21:00"} status={"Resolved"} SetReportModal={props.SetReportModal} />
            <ReportList reportName={"Flood"} reportId={"#R0152145"} date={"31 jan 2022 21:00"} status={"Resolved"} SetReportModal={props.SetReportModal} />
            <ReportList reportName={"Wild Fire"} reportId={"#R0122323"} date={"27 jan 2022 21:00"} status={"Resolved"} SetReportModal={props.SetReportModal} />
            <ReportList reportName={"Flood"} reportId={"#R0122123"} date={"22 jan 2022 21:00"} status={"Resolved"} SetReportModal={props.SetReportModal} />
            <ReportList reportName={"Flood"} reportId={"#R0104395"} date={"10 jan 2022 21:00"} status={"Resolved"} SetReportModal={props.SetReportModal} />
            <ReportList reportName={"Wild Fire"} reportId={"#R0122310"} date={"8 jan 2022 21:00"} status={"Resolved"} SetReportModal={props.SetReportModal} />
        </View>
    )
}