import React from "react";
import { StyleProp, TextInput, TextStyle, View, ViewStyle } from "react-native";

type IconTextInput = {
    icon: JSX.Element,
    placeholder: string,
    viewContainerStyle?: StyleProp<ViewStyle>,
    textInputStyle?: StyleProp<TextStyle>,
    onFocus?: () => void,
    editable: boolean,
    onChange?: Function,
    inputkey?: string,
}



export default function IconTextInput({ icon, placeholder, viewContainerStyle, textInputStyle, onFocus, editable, onChange, inputkey }: IconTextInput) {

    const viewStyle: StyleProp<ViewStyle> = viewContainerStyle ? viewContainerStyle : { flexDirection: "row", alignItems: "center" }
    const textStyle: StyleProp<TextStyle> = textInputStyle ? textInputStyle : { width: "100%" }
    return (<View style={viewStyle}  >
        {icon}
        <TextInput placeholder={placeholder} editable={editable} style={textInputStyle} onFocus={onFocus} onChangeText={(text) => { onChange({ inputkey, text }) }} />
    </View>)
}

