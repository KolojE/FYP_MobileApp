import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, StyleProp, ViewStyle, StyleSheet } from "react-native";


type TagSelectorProps = {
tagName:string,
tagValue:any,
setValue:React.Dispatch<React.SetStateAction<any[]>>
}
export default function TagSelector({ tagName, tagValue,setValue}:TagSelectorProps) {
    const [selected,setSelected] = React.useState<boolean>(false);
    React.useEffect(() => {
        if(selected){
            setValue((prev)=>[...prev,tagValue])
        }
        else
        {
            setValue((prev)=>{
                return prev.filter(value=>value!==value)
            })
        }
        
    }, [selected])

    
    const onTagPressed = ()=>{
        setSelected(prev=>!prev);
    }

    const tagSelectedStyle:StyleProp<ViewStyle> = selected?{backgroundColor:"#89CFF0"}:{}

    return (
        <View style={[{ flexDirection: "row", alignItems: "center",borderWidth: 1, padding: 10, borderRadius: 100 },tagSelectedStyle]}>
            <TouchableOpacity onPress={onTagPressed}>
            <Text>{tagName}</Text>
            </TouchableOpacity>
        </View>
        )}
