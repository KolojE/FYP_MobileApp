import React from "react";
import { View,Text, TouchableOpacity } from "react-native";
export default function ReportType(props)
{
    return(
        <View style={{width:150}}>
        <TouchableOpacity style={{width:120}}>
        <View style={{margin:10,width:"100%",height:150,alignItems:"center",justifyContent:"center"}}>
            <View style={{backgroundColor:props.color,borderRadius:20,justifyContent:"center",alignItems:"center",width:"100%",height:120}}>
                {props.image}
            </View>
            <Text style={{fontWeight:"700",marginTop:10}}>{props.label}</Text>
        </View>
        </TouchableOpacity>
        </View>
    )
}