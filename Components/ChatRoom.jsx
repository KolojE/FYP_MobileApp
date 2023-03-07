import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function ChatRoom({ name, lastMessage, time, setChatRoomModal }) {
    return (
        <TouchableOpacity onPress={() => { setChatRoomModal(true) }} style={{ paddingTop: 10, paddingBottom: 10, width: "100%", flexDirection: "row" }}>
            <View style={{ flex: 1, paddingLeft: 10, justifyContent: "center" }}>
                <MaterialCommunityIcons name="face-man-profile" size={60} color="black" />
            </View>
            <View style={{ flex: 3, justifyContent: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>{name}</Text>
                <Text style={{ fontSize: 12 }}>{lastMessage}</Text>
            </View>
            <View style={{ marginRight: "5%" }}>
                <Text style={{ marginLeft: "auto" }}>{time}</Text>
            </View>
        </TouchableOpacity>
    )
}