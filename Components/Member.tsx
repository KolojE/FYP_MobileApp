import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import IComplainant from "../types/Models/Complainant";
import { Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type MemberProps = {
user:IComplainant,
onPressed:(user:IComplainant) => void
}

export default function Member({user, onPressed}:MemberProps) {

    const onTouchablePressed= () => {
                onPressed(user);
    }

    return (
        <TouchableOpacity  onPress={onTouchablePressed}>
            <View style={{ flexDirection: "row", width: "90%", marginVertical: "5%", alignItems: "center" }}>
                <View>
                    {
                        user.base64ProfilePicture?
                        <Image style={{height:60,width:60,borderRadius:100}} source={{uri:`data:image/jpeg;base64,${user.base64ProfilePicture}`}} />:
                        <MaterialCommunityIcons name="face-man-profile" size={60} color="black" style={{ backgroundColor: "white", borderRadius: 100 }} />
                    }
                </View>
                <View style={{ marginLeft: "5%", justifyContent: "center" }}>
                    <Text style={{ fontWeight: "bold" }}>{user.name}</Text>
                    <Text style={{ fontSize: 10 }}>User ID:{user.ID}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

}