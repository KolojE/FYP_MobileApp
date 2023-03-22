import react from "react";
import { StyleSheet, View, Text } from "react-native";


export default function Title(props) {
    return (
        <View style={styles.titleContainer}>
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 24, position: "absolute", bottom: "20%", marginLeft: "10%" }}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    window: {
        minHeight: "100%",
        alignItems: "center",
    },
    titleContainer: {
        backgroundColor: "#050e2d",
        width: "90%",
        height: 70,
        borderBottomEndRadius: 100,
        marginRight: "20%"
    },
});