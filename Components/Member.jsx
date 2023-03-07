import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, Touchable, TouchableOpacity } from "react-native";

export default function Member(props) {

    return (
        <View style={{ flexDirection: "row", width: "90%", marginVertical: "5%", alignItems: "center" }}>
            <View>
                <MaterialCommunityIcons name="face-man-profile" size={50} color="black" />
            </View>
            <View style={{ marginLeft: "5%", justifyContent: "center" }}>
                <Text style={{ fontWeight: "bold" }}>Username</Text>
                <Text style={{ fontSize: 10 }}>User ID:U000000</Text>
            </View>
            <TouchableOpacity style={{ marginLeft: "auto" }}>
                <Entypo name="eye" size={30} />
            </TouchableOpacity>
        </View>
    )

}