import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";


export default function TagSelector({ tagName, tagValue, style, selected }) {
    return (
        <View style={{ ...style, flexDirection: "row", alignItems: "center" }}>
            <Text>{tagName}</Text>
            {
                selected &&
                <Ionicons name="checkmark" />
            }
        </View>);
}