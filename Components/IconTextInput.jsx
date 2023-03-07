import React from "react";
import { TextInput, View } from "react-native";


export default function IconTextInput({ icon, placeholder, style, editable }) {
    return (<View style={{ flexDirection: "row", alignItems: "center", ...style }} >
        {icon}
        <TextInput placeholder={placeholder} editable={editable} style={{ width: "100%" }} />
    </View>)
}

