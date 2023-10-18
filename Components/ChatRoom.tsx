import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IComplainant from "../types/Models/Complainant";
import { Image } from "react-native";
type ChatRoomProps = {
    user:IComplainant,
    lastMessage:string,
    lastMessageReceived:boolean,
    time:Date,
    onPressed:(user:IComplainant) => void

}

export default function ChatRoom({ user, lastMessage,lastMessageReceived, time, onPressed }: ChatRoomProps) {
    return (
        <TouchableOpacity onPress={() => { onPressed(user) }} style={{ paddingTop: 10, paddingBottom: 10, width: "100%", flexDirection: "row" }}>
            <View style={{ flex: 1, paddingLeft: 10, justifyContent: "center" }}>
                {
                    user.base64ProfilePicture ?
                    <Image style={{height:60,width:60,borderRadius:100}} source={{uri:`data:image/jpeg;base64,${user.base64ProfilePicture}`}} />:
                    <MaterialCommunityIcons name="face-man-profile" size={60} color="black" />
                }
            </View>
            <View style={{ flex: 3, justifyContent: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>{user.name}</Text>
                <Text style={{ fontSize: 12 }}>{lastMessageReceived? lastMessage:"You: "+lastMessage}</Text>
            </View>
            <View style={{ marginRight: "5%" }}>
                <Text style={{ marginLeft: "auto" }}>{time.toLocaleTimeString()}</Text>
            </View>
        </TouchableOpacity>
    )
}