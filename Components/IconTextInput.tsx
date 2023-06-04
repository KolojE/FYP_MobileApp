import React from "react";
import {  TextInput, TextStyle, View, ViewStyle } from "react-native";

type IconTextInput = {
    icon: JSX.Element,
    placeholder: string,
    viewContainerStyle?: ViewStyle,
    textInputStyle?: TextStyle,
    onFocus?: () => void,
    editable: boolean,
    onTextChange?: (text:string)=>void,
    inputkey?: string,
}



export default function IconTextInput({ icon, placeholder, viewContainerStyle, textInputStyle, onFocus, editable, onTextChange, inputkey }: IconTextInput) {

    const viewStyle: ViewStyle = viewContainerStyle ? viewContainerStyle : { flexDirection: "row", alignItems: "center" }
    const textStyle: TextStyle = textInputStyle ? textInputStyle : { width: "100%" }
    return (<View style={{...viewStyle}}  >
        {icon}
        <TextInput placeholder={placeholder} editable={editable} style={{...textInputStyle,flex:1}} onFocus={onFocus} onChangeText={onTextChange}/>
    </View>)
}

