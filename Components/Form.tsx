import { Entypo } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";

export default function Form({ formName, formStatus, formIcon, formCreatedOn }) {

    return (<View style={{ flexDirection: "row", width: "80%", marginTop: "5%" }}>
        <View style={{ width: "20%" }}>
            {formIcon}
        </View>
        <View >
            <View style={{ alignItems: "center", flexDirection: "row" }}>
                <Text style={{ fontWeight: "600", fontSize: 16, minWidth: "30%" }}>{formName}</Text>
                <Text style={{ fontSize: 10, paddingLeft: 10, color: "green" }}>{formStatus}</Text>
            </View>
            <Text style={{ fontSize: 10 }}>Created On: {formCreatedOn}</Text>
        </View>
        <View style={{ flexDirection: "row", alignSelf: "center", marginLeft: "auto" }}>
            <Entypo name="edit" size={20} style={{ padding: 5 }} onPress={() => { }} />
            <Entypo name="trash" size={20} style={{ padding: 5 }} onPress={() => { }} />
        </View>
    </View>)
}