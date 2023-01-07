import React from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function ReportScreen() {
    return (
        <ScrollView contentContainerStyle={styles.window}>
            <View style={styles.titleContainer}>
                <TouchableOpacity style={{ marginRight: "auto" }}>
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
                        <Text style={{ marginLeft: 10 }}>Water Floor</Text>
                        <MaterialCommunityIcons style={{ marginLeft: "auto", marginRight: 10 }} name="waterfall" size={20} color="black" />
                    </View>
                </View>
                <View style={{}}>
                    <Text style={{ margin: 5, fontSize: 8, color: "grey" }}>Report details</Text>
                    <View style={{ backgroundColor: "white", padding: 12, width: "100%" }}>
                        <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: "bold", marginBottom: 10 }}>Description</Text>
                        <Text style={{ fontSize: 10, marginBottom: 10 }}>This is just for the demo of this application, it does not indicate any meaningful texts</Text>
                        <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: "bold", marginBottom: 10 }} >Date & Time</Text>
                        <Text style={{ fontSize: 10, marginBottom: 10 }}>2 JAN 2023 11:45 am</Text>
                        <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: "bold", marginBottom: 10 }} >Location</Text>
                        <Text style={{ fontSize: 10, marginBottom: 10 }}>Part of Block 3503, Jalan Teknokrat 5 ,Cyberjaya 63000</Text>
                        <Image style={{ width: "100%", height: 200 }} source={require("../DemoIamge/mapDemo.png")} />
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