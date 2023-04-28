import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Alert, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react"


export default function LoginScreen({ navigation, onLogin }) {

    const [loginForm, setLoginForm] = useState({ identifier: "", password: "" });

    const handleEmailUsernameChange = (newIdentifier) => {
        setLoginForm((prev) => {
            return { ...prev, identifier: newIdentifier };
        });
    };

    const handlePasswordChange = (newPassword) => {
        setLoginForm((prev) => {
            return { ...prev, password: newPassword }
        })
    };

    const onLoginButtonPressed = async ()=>{

    !await onLogin(loginForm)&&
    alert("Password / Email incorrect ! Please try again!");


}


    return (
        <SafeAreaView>
            <View style={styles.background}>
                <View style={styles.top_container}>
                    <View style={{ height: 200, width: 200 }}>
                        <Image source={require("../DemoImage/logo.png")} style={{ flex: 1, resizeMode: "contain", height: null, width: null }} />
                    </View>
                    <Text style={styles.Title}>S.C.E - Safer, Cleaner ,Efficient</Text>
                </View>
                <View style={styles.loginContainer}>
                    <TextInput style={styles.input} placeholder={"Email / Username"} onChangeText={handleEmailUsernameChange} />
                    <TextInput style={styles.input} placeholder={"Password"} secureTextEntry onChangeText={handlePasswordChange} />
                    <TouchableOpacity style={{ ...styles.input, marginTop: 50, width: "50%", backgroundColor: "#4d8ef7", paddingTop: 10, paddingBottom: 10 }} onPress={onLoginButtonPressed}>
                        <Text style={{ fontWeight: "bold", textAlign: "center", color: "white" }}>Login</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 10, marginTop: 20 }}>
                        No account yet ? <Text onPress={() => { navigation.navigate("Register") }} style={{ color: "#9757ff" }}>Sign up</Text> here !
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background:
    {
        width: "100%",
        backgroundColor: '#050e2d',

    },
    top_container:
    {
        width: "100%",
        height: "45%",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
    loginContainer:
    {
        height: "55%",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FEFCFF",
        borderTopEndRadius: 60,
        borderTopStartRadius: 60,
    },
    Title:
    {
        position: "absolute",
        bottom: 0,
        right: 0,
        margin: "2%",
        marginRight: "1%",
        fontSize: 15,
        width: "60%",
        fontWeight: "bold",
        fontFamily: "sans-serif",
        color: "white",

    },
    input:
    {
        textAlign: "center",
        width: "60%",
        backgroundColor: "#b0cbde",
        padding: 2,
        marginTop: 10,
        borderRadius: 100,
    }
})

