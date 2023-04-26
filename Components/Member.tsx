import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text,TouchableOpacity } from "react-native";
import IComplainant from "../api/Models/Complainant";

export default function Member({_id,name,ID,handleProfileModal}) {

const onViewButtonClicked = ()=>{
    handleProfileModal(_id);
}

    return (
        <View style={{ flexDirection: "row", width: "90%", marginVertical: "5%", alignItems: "center" }}>
            <View>
                <MaterialCommunityIcons name="face-man-profile" size={50} color="black" />
            </View>
            <View style={{ marginLeft: "5%", justifyContent: "center" }}>
                <Text style={{ fontWeight: "bold" }}>{name}</Text>
                <Text style={{ fontSize: 10 }}>User ID:{ID}</Text>
            </View>
            <TouchableOpacity style={{ marginLeft: "auto" }} onPress={onViewButtonClicked}>
                <Entypo name="eye" size={30} />
            </TouchableOpacity>
        </View>
    )

}