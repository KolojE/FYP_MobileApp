import React from "react";
import { View, TextInput, Image, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function LocationPickerModal(props) {
    return (
        <View style={{ height: "100%" }}>
            <View style={{ height: "100%", width: "100%", alignItems: "center" }}>
                <View style={{ marginTop: "5%", alignSelf: "center", height: "7%", flexDirection: "row", backgroundColor: "white", width: "80%", zIndex: 1, borderRadius: 100, padding: 10 }}>
                    <TextInput style={{ alignSelf: "center", height: "100%", width: "20%" }} onPressIn={() => {
                    }} />
                    <AntDesign style={{ marginLeft: "auto", marginRight: "5%" }} name="search1" size={24} color="black" />
                </View>
                <View style={{ height: "100%", position: "absolute" }}>
                    <Image source={require("../DemoImage/mapDemo.png")} style={{ height: "100%" }} />
                </View>
                <TouchableOpacity onPress={() => { props.setOpenLocationPicker(false) }} style={{ backgroundColor: "#050e2d", width: "30%", height: "5%", zIndex: 1, alignItems: "center", justifyContent: "center", borderRadius: 100, marginTop: "auto", marginBottom: "5%" }}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>Confirm</Text>
                </TouchableOpacity>
            </View>

        </View >
    )
}