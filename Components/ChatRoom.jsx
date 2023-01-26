import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function ChatRoom(props) {
    return (
        <TouchableOpacity onPress={() => { props.setChatRoomModal(true) }} style={{ paddingTop: 10, paddingBottom: 10, width: "100%", flexDirection: "row" }}>
            <View style={{ flex: 1, paddingLeft: 10, justifyContent: "center" }}>
                <MaterialCommunityIcons name="face-man-profile" size={60} color="black" />
            </View>
            <View style={{ flex: 3, justifyContent: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>Ali</Text>
                <Text style={{ fontSize: 12 }}>Last Message</Text>
            </View>
            <View style={{ marginRight: "5%" }}>
                <Text style={{ marginLeft: "auto" }}>6:03 pm</Text>
            </View>
        </TouchableOpacity>
    )
}