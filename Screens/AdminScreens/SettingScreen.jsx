import { Ionicons, AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingScreen() {
    return (
        <SafeAreaView style={{}}>
            <View style={{ position: "relative", height: "100%", backgroundColor: "#050e2d" }}>
                <View style={{ alignSelf: "center", justifyContent: "center", flex: 2, paddingBottom: "50%" }}>
                    <Text style={{ fontSize: 24, color: "white", fontWeight: "bold", textAlign: "center" }}> Settings</Text>
                    <Text style={{ fontSize: 10, color: "white", textAlign: "center", marginTop: "2%" }}>Organization ID: OR111252</Text>
                    <Text style={{ fontSize: 10, color: "white", textAlign: "center", marginTop: "2%" }}>MOE Admin (A112551)</Text>
                </View>
                <View style={{ position: "relative", width: "100%", marginTop: "auto", backgroundColor: "#cdcfd5", borderTopLeftRadius: 20, borderTopRightRadius: 20, flex: 2 }}>

                </View>
            </View>
            <View style={{ backgroundColor: "white", position: "absolute", alignSelf: "center", height: "45%", width: "85%", borderRadius: 30, top: "40%" }}>
                <View style={{ width: "90%", alignSelf: "center", height: "100%", justifyContent: "center" }}>
                    <View style={{ marginBottom: "5%", borderBottomWidth: 0.3, alignItems: "center", height: "15%", flexDirection: "row" }}>
                        <Text>Company Profile</Text>
                        <AntDesign name="right" style={{ marginLeft: "auto", marginRight: "5%" }} />
                    </View>
                    <View style={{ marginBottom: "5%", borderBottomWidth: 0.3, alignItems: "center", height: "15%", flexDirection: "row" }}>
                        <Text>Profile</Text>
                        <AntDesign name="right" style={{ marginLeft: "auto", marginRight: "5%" }} />
                    </View>
                    <View style={{ marginBottom: "5%", borderBottomWidth: 0.3, alignItems: "center", height: "15%", flexDirection: "row" }}>
                        <Text>Report Forms</Text>
                        <AntDesign name="right" style={{ marginLeft: "auto", marginRight: "5%" }} />
                    </View>
                    <View style={{ marginBottom: "5%", borderBottomWidth: 0.3, alignItems: "center", height: "15%", flexDirection: "row" }}>
                        <Text>Memebers</Text>
                        <AntDesign name="right" style={{ marginLeft: "auto", marginRight: "5%" }} />
                    </View>
                </View>
            </View>
        </SafeAreaView >
    );
}