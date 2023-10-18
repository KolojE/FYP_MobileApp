import React from "react";
import { View, Text, TouchableOpacity, StyleProp, ViewStyle, StyleSheet } from "react-native";


type TagSelectorProps<T> = {
tagName:string,
tagValue:T,
onSelect:(value:T,selected:boolean)=>void,
multiSelect?:boolean
}
export default function TagSelector<T>({ tagName, tagValue,onSelect,multiSelect=true }:TagSelectorProps<T>) {
    const [selected,setSelected] = React.useState<boolean>(false);
    React.useEffect(() => {
        onSelect(tagValue,selected);
    }, [selected])

    
    const onTagPressed = ()=>{
        setSelected(prev=>!prev);
    }


    const tagSelectedStyle:StyleProp<ViewStyle> = multiSelect?selected?{backgroundColor:"#89CFF0"}:{}:{};

    return (
        <View style={[{ flexDirection: "row", alignItems: "center",borderWidth: 1, padding: 10, borderRadius: 100 },tagSelectedStyle]}>
            <TouchableOpacity onPress={()=>{
                onTagPressed()
            }}>
            <Text>{tagName}</Text>
            </TouchableOpacity>
        </View>
        )}
