import {  MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import IUser from "../api/Models/User";
import IComplainant from "../api/Models/Complainant";


type MemberProps = {
user:IComplainant,
onPressedCallBack:(user:IUser) => void
}

export default function Member({user, onPressedCallBack }:MemberProps) {

    const onPressed = () => {
        onPressedCallBack(user);
    }

    return (
        <TouchableOpacity  onPress={onPressed}>
            <View style={{ flexDirection: "row", width: "90%", marginVertical: "5%", alignItems: "center" }}>
                <View>
                    <MaterialCommunityIcons name="face-man-profile" size={50} color="black" />
                </View>
                <View style={{ marginLeft: "5%", justifyContent: "center" }}>
                    <Text style={{ fontWeight: "bold" }}>{user.name}</Text>
                    <Text style={{ fontSize: 10 }}>User ID:{user.ID}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

}