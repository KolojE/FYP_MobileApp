import {  MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import IUser from "../api/Models/User";
import IComplainant from "../api/Models/Complainant";
import { Image } from "react-native";

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
                <Image style={{height:60,width:60,borderRadius:100}} source={{uri:`data:image/jpeg;base64,${user.base64ProfilePicture}`}} />
                </View>
                <View style={{ marginLeft: "5%", justifyContent: "center" }}>
                    <Text style={{ fontWeight: "bold" }}>{user.name}</Text>
                    <Text style={{ fontSize: 10 }}>User ID:{user.ID}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

}