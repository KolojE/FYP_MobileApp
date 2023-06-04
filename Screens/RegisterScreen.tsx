import { Octicons, Ionicons, FontAwesome, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconTextInput from "../Components/IconTextInput";
import { useRegistrationAction } from "../actions/authAndRegAction";
import { RegistrationCredentials } from "../types/General";
import {Dimensions} from 'react-native'; 

const { height } = Dimensions.get('window');

export default function RegisterScreen() {
    const [registrationForm, setRegistrationForm] = React.useState<RegistrationCredentials>({
        name: "",
        email: "",
        password: "",
        organization: {
            ID: "",
        }

    })

    const registrationAction = useRegistrationAction();

    const onNameChange = (text: string) => {
        setRegistrationForm(prev => ({ ...prev, name: text }));
    }

    const onEmailChange = (text: string) => {
        setRegistrationForm(prev => ({ ...prev, email: text }));
    }

    const onPasswordChange = (text: string) => {
        setRegistrationForm(prev => ({ ...prev, password: text }));
    }

    const onConfirmPasswordChange = (text: string) => {
        setRegistrationForm(prev => ({ ...prev, confirmPassword: text }));
    }

    const onOrganizationIDChange = (text: string) => {
        setRegistrationForm(prev => ({ ...prev, organization: { ID: text } }));
    }

    function onRegistrationButtonPressed() {
        registrationAction.registrationAction(registrationForm);
    }

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.LogoContainer}>
                <Image source={require("../DemoImage/logo.png")} style={styles.Logo} />
            </View>
            <View style={styles.RegisterContainer}>
                <Text style={styles.Title}>Registration</Text>
                <IconTextInput icon={<Ionicons name="person" style={styles.Icon} />} placeholder="User Name" viewContainerStyle={styles.IconTextInput} editable={true} onTextChange={onNameChange} textInputStyle={{ fontSize: 16 }} inputkey={"name"} />
                <IconTextInput icon={<FontAwesome name="envelope" style={styles.Icon} />} placeholder="Email" viewContainerStyle={styles.IconTextInput} editable={true} onTextChange={onEmailChange} inputkey={"email"} />
                <IconTextInput icon={<FontAwesome5 name="key" style={styles.Icon} />} placeholder="Password" viewContainerStyle={styles.IconTextInput} editable={true} onTextChange={onPasswordChange} inputkey={"password"} />
                <IconTextInput icon={<FontAwesome5 name="key" style={styles.Icon} />} placeholder="Confirm Password" viewContainerStyle={styles.IconTextInput} editable={true} onTextChange={onConfirmPasswordChange} inputkey={"Confirm password"} />
                <IconTextInput icon={<MaterialCommunityIcons name="form-textbox-password" style={styles.Icon} />} placeholder="Organization ID" viewContainerStyle={styles.IconTextInput} editable={undefined} onTextChange={onOrganizationIDChange} inputkey={"organization.ID"} />
                <IconTextInput icon={<Octicons name="organization" style={styles.Icon} />} placeholder="Organization Name" viewContainerStyle={{ ...styles.IconTextInput, height: "15%", backgroundColor: "#b5b3b3" }} editable={false} />
                <TouchableOpacity style={{ ...styles.input, marginTop: "2%", width: "50%", backgroundColor: "#4d8ef7", paddingTop: 10, paddingBottom: 10 }} onPress={() => { onRegistrationButtonPressed() }}>
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
        height: height * 0.75,
        width: "90%",
        position: "relative",
        alignItems: "center",
        backgroundColor: "#FEFCFF",
        borderRadius: 50
    },
    LogoContainer: {
        height: 150,
        width: 150,
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
        marginTop: "4%",
        marginBottom: "3%",
        alignItems: "center",
        flexDirection: "row",
        paddingLeft: "3%",
        height: "5%",
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