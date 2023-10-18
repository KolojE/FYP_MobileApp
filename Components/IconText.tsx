import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";


type IconTextProps = {
    icon: string | JSX.Element;
    text: string;
    onPress?: () => void;
    style?:ViewStyle|TextStyle;
}

export default function IconText({ icon, text,style, onPress }: IconTextProps) {
    return (
        <TouchableOpacity style={{...styles.container}} onPress={onPress?onPress:()=>{}}>
            {typeof icon === "string" ? icon : icon}
            <Text style={{...styles.text,...style}}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,

    },
    text: {
        fontSize: 16,
        marginLeft: 8,
    }
})