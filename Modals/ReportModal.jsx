import React, { useEffect } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EvidencePhoto from "../Components/EvidencePhoto";


export default function ReportModal(props) {

    return (
        <ScrollView contentContainerStyle={styles.window}>
            <View style={styles.titleContainer}>
                <TouchableOpacity style={{ marginRight: "auto" }} onPress={() => { props.SetReportModal(false) }}>
                    <AntDesign name="down" size={24} color="black" />
                </TouchableOpacity>
                <View style={{
                    alignSelf: "center"
                }}>
                    < Text >
                        #R0152141
                    </Text>
                </View>
            </View >
            <View style={{ width: "100%" }}>
                <View style={{}}>
                    <Text style={{ margin: 5, fontSize: 8, color: "grey" }}>Report Title</Text>
                    <View style={{ backgroundColor: "white", padding: 10, width: "100%", flexDirection: "row" }}>
                        <Text style={{ marginLeft: 10 }}>Flood</Text>
                        <MaterialCommunityIcons style={{ marginLeft: "auto", marginRight: 10 }} name="waterfall" size={20} color="black" />
                    </View>
                </View>
                <View style={{}}>
                    <Text style={{ margin: 5, fontSize: 8, color: "grey" }}>Report details</Text>
                    <View style={{ backgroundColor: "white", padding: 12, width: "100%" }}>
                        <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: "bold", marginBottom: 10 }}>Description</Text>
                        <Text style={{ fontSize: 10, marginBottom: 10 }}>This is just for the demo of this application, it does not indicate any meaningful texts</Text>
                        <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: "bold", marginBottom: 10 }} >Submission Date & Time </Text>
                        <Text style={{ fontSize: 10, marginBottom: 10 }}>2 JAN 2023 11:45 am</Text>
                        <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: "bold", marginBottom: 10 }} >Incident Date & Time</Text>
                        <Text style={{ fontSize: 10, marginBottom: 10 }}>1 JAN 2023 9:07 am</Text>
                        <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: "bold", marginBottom: 10 }} >Location</Text>
                        <Text style={{ fontSize: 10, marginBottom: 10 }}>Part of Block 3503, Jalan Teknokrat 5 ,Cyberjaya 63000</Text>
                        <Image style={{ width: "100%", height: 200, marginBottom: 10 }} source={require("../DemoIamge/mapDemo.png")} />
                        <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: "bold", marginBottom: 10 }} >Evidence Photos</Text>
                        <Text></Text>
                        <ScrollView horizontal={true} >
                            <View style={{ flexDirection: "row" }}>
                                <EvidencePhoto />
                                <EvidencePhoto />
                                <EvidencePhoto />
                                <EvidencePhoto />
                                <EvidencePhoto />
                                <EvidencePhoto />
                            </View>
                        </ScrollView>
                    </View>
                    <Text style={{ margin: 5, fontSize: 8, color: "grey" }}>Other details</Text>
                    <View style={{ backgroundColor: "white", padding: 12, width: "100%" }}>
                        <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: "bold", marginBottom: 10 }}>Suspected Violator</Text>
                        <Text style={{ fontSize: 10, marginBottom: 10 }}>No suspected violator is identified</Text>
                        <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: "bold", marginBottom: 10 }}>Critical Level</Text>
                        <Text style={{ fontSize: 10, marginBottom: 10, color: "red", fontWeight: "bold" }}>High</Text>
                        <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: "bold", marginBottom: 10 }}>Is The Event Still On Going?</Text>
                        <Text style={{ fontSize: 10, marginBottom: 10 }}>Yes</Text>
                    </View>
                    <Text style={{ margin: 5, fontSize: 8, color: "grey" }}>Status</Text>
                    <View style={{ backgroundColor: "white", padding: 12, width: "100%", marginBottom: 20 }}>
                        <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: "bold", marginBottom: 10 }}>Description</Text>
                        <Text style={{ fontSize: 10, marginBottom: 10 }}>The issue has been resolved.</Text>

                        <Text style={{ fontSize: 10, fontWeight: "bold", marginBottom: 10, marginTop: 20 }}>Latest Update:  {"3 Jan 2023 12:11 AM"} </Text>
                        <Text style={{ fontSize: 10, fontWeight: "bold", marginBottom: 10 }}>Updated By: Ali (A112)</Text>
                        <View style={{ width: "100%", flexDirection: "row" }}>
                            <Text style={{ fontSize: 12, fontWeight: "bold", color: "green" }}>Resolved</Text>
                            <AntDesign name="checkcircleo" size={16} color="green" style={{ marginLeft: "auto" }} />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView >
    );
}


const styles = StyleSheet.create({

    window: {
        overflow: "scroll",
        minHeight: "100%",
    },
    titleContainer: {
        width: "90%",
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "center"
    },
})