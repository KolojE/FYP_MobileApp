import React from "react";
import { View, Text } from "react-native";
import ReportList from "./ReportList";
import { IReport } from "../types/Models/Report";



type ReportListContainerPorps = {
    dateRange?: {
        fromDate: Date,
        toDate: Date,
    }
    reports: IReport[];
    onOpenModalPressed: (report:IReport)=>void;
    onForwardPressed: (report:IReport)=>void;
}

export default function ReportListContainer({ dateRange, reports,onForwardPressed, onOpenModalPressed}: ReportListContainerPorps) {

    const [reportElement, setReportElemnts] = React.useState<JSX.Element[]>([])

    React.useEffect(() => {
        setReportElemnts(() => {
            return reports.map<JSX.Element>((report) => {
                return <ReportList onForwardMessagePress={onForwardPressed} onPressed={onOpenModalPressed} report={report} key={report._id} />
            })
        })
    }, [reports])



    return (
        <View style={{ marginBottom: "5%" }}>
            <View style={{ }}>
                <Text style={{ fontSize: 12, color: "grey" }}>
                    {dateRange && dateRange.fromDate.toDateString() + " - " + dateRange.toDate.toDateString()}
                </Text>
            </View>
                    {reportElement}
        </View>
    )
}