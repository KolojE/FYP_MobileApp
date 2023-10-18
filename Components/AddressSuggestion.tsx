import { Entypo } from "@expo/vector-icons";
import React from "react";
import { View,Text, TouchableOpacity } from "react-native";
import { Openstreetmap } from "../api/user";


type AddressSuggestionProps = {
    item: Openstreetmap,
    onPressed?:({lon,lat,display_name,boundingbox}:Openstreetmap)=>void 
}

export default  function AddressSuggestion({item,onPressed}:AddressSuggestionProps) {
        return (
        <TouchableOpacity onPress={()=>{onPressed(item)}}>
        <View style={{flexDirection:"row",padding:5,alignItems:"center",width:"100%"}}>
            <Entypo name="location" size={24} color="black" style={{padding:10}} />
            <Text>{item.display_name}</Text>
        </View>
        </TouchableOpacity>)
        
}