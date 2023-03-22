import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";


export default function TagSelector({ tagName, tagValue, style, selected, selectedStyle }) {
    const [tagStyle, setTagStyle] = React.useState({ ...style });

    React.useEffect(() => {
        if (selected)
            setTagStyle((prevStyle) => { return { ...prevStyle, ...selectedStyle } });
    }, [])
    return (
        <View style={{ ...tagStyle, flexDirection: "row", alignItems: "center" }}>
            <Text>{tagName}</Text>
            {
                selected &&
                <Ionicons name="checkmark" />
            }
        </View>);
}