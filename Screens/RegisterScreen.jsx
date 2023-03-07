import { Octicons, Ionicons, FontAwesome, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconTextInput from "../Components/IconTextInput";


export default function RegisterScreen() {
    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.LogoContainer}>
                <Image source={require("../DemoIamge/logo.png")} style={styles.Logo} />
            </View>
            <View style={styles.RegisterContainer}>
                <Text style={styles.Title}>Registration</Text>
                <IconTextInput icon={<Ionicons name="person" style={styles.Icon} />} placeholder="User Name" style={styles.IconTextInput} />
                <IconTextInput icon={<FontAwesome name="envelope" style={styles.Icon} />} placeholder="Email" style={styles.IconTextInput} />
                <IconTextInput icon={<FontAwesome5 name="key" style={styles.Icon} />} placeholder="Password" style={styles.IconTextInput} />
                <IconTextInput icon={<MaterialCommunityIcons name="form-textbox-password" style={styles.Icon} />} placeholder="Organization Passcode" style={styles.IconTextInput} />
                <IconTextInput icon={<Octicons name="organization" style={styles.Icon} />} placeholder="Organization Name" style={{ ...styles.IconTextInput, height: "15%", backgroundColor: "#b5b3b3" }} editable={false} />
                <TouchableOpacity style={{ ...styles.input, marginTop: "2%", width: "50%", backgroundColor: "#4d8ef7", paddingTop: 10, paddingBottom: 10 }}>
                    <Text style={{ fontWeight: "bold", textAlign: "center", color: "white" }}>Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>)
}
const styles = StyleSheet.create({
    background:
    {
        width: "100%",
        height: "100%",
        backgroundColor: '#050e2d',
        alignItems: "center",

    },
    RegisterContainer:
    {
        height: "70%",
        width: "90%",
        position: "relative",
        alignItems: "center",
        backgroundColor: "#FEFCFF",
        borderRadius: 50
    },
    LogoContainer: {
        height: 200,
        width: 200
    },
    Logo: {
        flex: 1,
        resizeMode: "contain",
        height: null,
        width: null,
    },
    Title:
    {
        marginTop: "5%",
        fontWeight: "700",
        fontSize: 20,

    },
    IconTextInput:
    {
        marginTop: "5%",
        marginBottom: "5%",
        padding: 5,
        borderRadius: 10,
        width: "70%",
        backgroundColor: "#E0E0E0"
    }
    , Icon: {
        marginRight: "5%",
    },
    input: {
        borderRadius: 100
    }
})