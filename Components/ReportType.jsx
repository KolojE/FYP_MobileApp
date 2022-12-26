import React from "react";
import { View,Text, TouchableOpacity } from "react-native";
export default function ReportType(props)
{
    return(
        <TouchableOpacity>
        <View style={{margin:10,width:150,height:150,alignItems:"center",justifyContent:"center"}}>
            <View style={{backgroundColor:props.color,borderRadius:20,justifyContent:"center",alignItems:"center",width:120,height:120}}>
                {props.image}
            </View>
            <Text style={{fontWeight:"700",marginTop:10}}>{props.label}</Text>
        </View>
        </TouchableOpacity>
    )
}