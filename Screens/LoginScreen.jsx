import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Dimensions} from "react-native"
import { useState } from "react"


export default function LoginScreen({navigation}) {

const [loginForm,setLoginForm]= useState({email_username:"",password:""});
    return (

        <View style={styles.background}>
            <View style={styles.top_container}>
                <Text style={{fontSize:25}}>Logo</Text>  
                <Text style={styles.Title}>S.C.E - Safer, Cleaner ,Efficient</Text>
            </View>
            <View style={styles.loginContainer}>
                    <TextInput style={styles.input} placeholder={"Email / Username"}  onChangeText={newText=>{
                            console.log(newText);
                    }}/>
                    <TextInput style={styles.input} placeholder={"Password"} secureTextEntry onChangeText={(newText)=>
                    {
                            console.log(newText);
                    }}/>

                    <TouchableOpacity style={{ ...styles.input, backgroundColor: "#4d8ef7", paddingTop: 10, paddingBottom: 10 }} onPress={login}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>Login</Text>
                    </TouchableOpacity>
                <Text>No account yet ? <Text onPress={() => { Alert.alert("redirected to signup page") }} style={{ color: "#9757ff" }}>Sign up</Text> here !</Text>
                </View>

        </View>
    )


function login()
{
    navigation.navigate('Landing')
}
}


const height = Dimensions.get("window");
const styles = StyleSheet.create({
    background:
    {
        ...height,
        width:"100%",
        backgroundColor: '#89CFF0',
        
    },
    top_container:
    {
        width:"100%",
        height:"45%",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
    loginContainer: 
    {
        height:"55%",
        position:"relative",
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

    },
    input:
    {
        textAlign: "center",
        width: "60%",
        backgroundColor: "#abf5ed",
        padding: 5,
        marginTop:40,
        borderRadius: 100,
    }
})

