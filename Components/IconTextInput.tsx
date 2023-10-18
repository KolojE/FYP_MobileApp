import React from "react";
import {  TextInput, TextStyle, View, ViewStyle } from "react-native";

type IconTextInput = {
    icon: JSX.Element,
    placeholder: string,
    viewContainerStyle?: ViewStyle,
    textInputStyle?: TextStyle,
    editable: boolean,
    secret?: boolean,
    value?:string,
    onTextChange?: (text:string)=>void,
    onFocus?: () => void,
}



export default function IconTextInput({ icon, placeholder, viewContainerStyle, textInputStyle,editable,value,secret, onFocus, onTextChange }: IconTextInput) {

    const viewStyle: ViewStyle = viewContainerStyle ? viewContainerStyle : { flexDirection: "row", alignItems: "center" }
    const textStyle: TextStyle = textInputStyle ? textInputStyle : { width: "100%" }
    return (<View style={{...viewStyle}}  >
        {icon}
        <TextInput placeholder={placeholder} editable={editable} style={{...textInputStyle,flex:1}} onFocus={onFocus} onChangeText={onTextChange} value={value} secureTextEntry={secret}/>
    </View>)
}

