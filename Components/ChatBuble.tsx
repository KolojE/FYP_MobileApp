import React from "react";
import { View,Text } from "react-native";


export default function ChatBuble(props)
{
    const reply= props.reply?10:"auto"
    const color = props.reply?"white":"#80ff88"
    return(
        <View style={{alignItems:"baseline"}}>
        <View style={{marginLeft:reply, marginRight:10}}>
        <Text style={{fontSize:8}}>
            21-02-28 12:30
        </Text>
        </View>
        <View style={{backgroundColor:color,padding:10,margin:10,marginBottom:0,marginLeft:reply,borderRadius:10}}>
            <Text style={{fontSize:12}}>
                {props.msg}
            </Text>
        </View>
        </View>
    )
}