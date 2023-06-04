import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import RecentReport from "./RecentReport";
import { IReport } from "../types/Models/Report";


type RecenReportListProps = {
    navigation: any;
    reports: IReport[];
}

export default function RecentReportList({ navigation, reports }: RecenReportListProps) {

    const [reportRecentReportElement, setRecentReportElement] = React.useState<JSX.Element[]>([])

    const recentReport = reports.sort((report1, report2) => {
        return report1.updateDate.getDate() - report2.updateDate.getDate();
    })


    React.useEffect(() => {
        setRecentReportElement(
            recentReport.slice(0, 5).map(
                (report, index) => {
                    return <RecentReport report={report} key={index} />
                })
        )
    }, [reports])


    return (
        <View style={{ alignSelf: "center", width: "90%" }}>
            <View
                style={{
                    width: "100%",
                    marginTop: "15%",
                    marginBottom: 5,
                    flexDirection: "row",
                }}
            >
                <Text style={{ fontSize: 10, color: "#8F8F8F" }}>Recent Reports</Text>
                <TouchableOpacity
                    style={{ marginLeft: "auto" }}
                    onPress={() => {
                        navigation.navigate("reportList");
                    }}
                >
                    <Text style={{ fontSize: 10, color: "blue" }}>See All</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.recentReportsContainer}>
                {reportRecentReportElement}
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        recentReportsContainer: {
            marginTop: 5,
            marginBottom: "30%",
            width: "100%",
            borderRadius: 15,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 1,
            elevation: 5,
            backgroundColor: "#FEFCFF",
            padding: 12,
        },
    }
)