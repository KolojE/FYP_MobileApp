import React from "react";
import { View,Text } from "react-native";


type ChatBubleProps = {
reply:boolean,
msg:string,
}

export default function ChatBuble({reply,msg}:ChatBubleProps)
{
    const isReply= reply?10:"auto"
    const color =reply?"white":"#80ff88"
    return(
        <View style={{alignItems:"baseline"}}>
        <View style={{marginLeft:isReply, marginRight:10}}>
        <Text style={{fontSize:8}}>
            21-02-28 12:30
        </Text>
        </View>
        <View style={{backgroundColor:color,padding:10,margin:10,marginBottom:0,marginLeft:isReply,borderRadius:10}}>
            <Text style={{fontSize:12}}>
                {msg}
            </Text>
        </View>
        </View>
    )
}