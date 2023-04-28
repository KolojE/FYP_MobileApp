import React from "react";
import { TextInput, View } from "react-native";

type IconTextInput = {
    icon: JSX.Element,
    placeholder: string,
    style: any,
    editable: boolean,
    onChange?: Function,
    inputkey?: string,
}

export default function IconTextInput({ icon, placeholder, style, editable, onChange, inputkey }: IconTextInput) {
    return (<View style={{ flexDirection: "row", alignItems: "center", ...style }} >
        {icon}
        <TextInput placeholder={placeholder} editable={editable} style={{ width: "100%" }} onChangeText={(text) => { onChange({ inputkey, text }) }} />
    </View>)
}

