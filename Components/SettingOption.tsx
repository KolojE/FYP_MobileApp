import { AntDesign } from "@expo/vector-icons"
import React from "react"
import { TouchableOpacity, View,Text } from "react-native"

export function SettingOption({setModal,label})
{
    return(

        <TouchableOpacity onPress={() => { setModal(true) }} style={{ marginBottom: "10%", borderBottomWidth: 0.3, height: "10%" }}>
                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                            <Text>{label}</Text>
                            <AntDesign name="right" style={{ marginLeft: "auto", marginRight: "5%" }} />
                        </View>
                    </TouchableOpacity>
    )
}