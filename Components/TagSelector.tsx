import React from "react";
import { View, Text, TouchableOpacity, StyleProp, ViewStyle, StyleSheet } from "react-native";


type TagSelectorProps = {
tagName:string,
tagValue:any,
onSelect:(value:string,selected:boolean)=>void
}
export default function TagSelector({ tagName, tagValue,onSelect }:TagSelectorProps) {
    const [selected,setSelected] = React.useState<boolean>(false);
    React.useEffect(() => {
        onSelect(tagValue,selected);
    }, [selected])

    
    const onTagPressed = ()=>{
        ;
        setSelected(prev=>!prev);
    }

    const tagSelectedStyle:StyleProp<ViewStyle> = selected?{backgroundColor:"#89CFF0"}:{}

    return (
        <View style={[{ flexDirection: "row", alignItems: "center",borderWidth: 1, padding: 10, borderRadius: 100 },tagSelectedStyle]}>
            <TouchableOpacity onPress={()=>{
                onTagPressed()
            }}>
            <Text>{tagName}</Text>
            </TouchableOpacity>
        </View>
        )}
