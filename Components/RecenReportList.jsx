import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import RecentReport from "./RecentReport";

export default function RecentReportList(props) {
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
                        props.navigation.navigate("reportList");
                    }}
                >
                    <Text style={{ fontSize: 10, color: "blue" }}>See All</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.recentReportsContainer}>
                <RecentReport />
                <RecentReport />
                <RecentReport />
                <RecentReport />
                <RecentReport />
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