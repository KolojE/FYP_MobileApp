import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
export default function ProfileModal(props) {

    const [editPassword, setEditPassword] = React.useState(false);
    return (
        <SafeAreaView>

            <View style={{ height: "100%" }}>
                <View style={{ height: "30%", width: "100%" }}>
                    <TouchableOpacity onPress={() => {
                        props.setProfileModal(false);
                    }}>
                        <View style={{ marginTop: "8%", marginLeft: "2%" }}>
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <View style={{ width: "100%", alignItems: "center" }}>
                            <MaterialCommunityIcons name="face-man-profile" size={100} color="black" />
                        </View>
                        <View style={{ width: "100%", alignItems: "center", height: "20%" }}>
                            <Text style={{ fontSize: 10 }}>Total Report : 21 </Text>
                            <Text style={{ fontSize: 10 }}>Report Resolved : 10 </Text>
                        </View>
                    </View>
                    <View style={{ marginTop: "5%", height: "80%", width: "100%", alignItems: "center" }}>
                        <View style={{ width: "80%", height: "30%" }}>
                            <Text style={{ width: "100%", fontSize: 10, color: "grey" }}>Organization ID</Text>
                            <Text style={{ height: "40%", width: "100%", fontSize: 12, color: "grey", borderBottomColor: "grey", borderBottomWidth: 1 }}>OR125232</Text>
                        </View>
                        <View style={{ width: "80%", height: "30%" }}>
                            <Text style={{ width: "100%", fontSize: 10, color: "grey" }}>Organization Name</Text>
                            <Text style={{ height: "40%", width: "100%", fontSize: 12, color: "grey", borderBottomColor: "grey", borderBottomWidth: 1 }}>MOE</Text>
                        </View>
                        <View style={{ width: "80%", height: "30%" }}>
                            <Text style={{ width: "100%", fontSize: 10, color: "grey" }}>User Name</Text>
                            <TextInput style={{ height: "40%", width: "100%", fontSize: 12, borderBottomColor: "black", borderBottomWidth: 1 }} value={"Ng Wen Sing"} />
                        </View>
                        <View style={{ width: "80%", height: "30%" }}>
                            <Text style={{ width: "100%", fontSize: 10, color: "grey" }}>Mobile Number</Text>
                            <TextInput style={{ height: "40%", width: "100%", fontSize: 12, borderBottomColor: "black", borderBottomWidth: 1 }} value={"+601110871337"} />
                        </View>
                        <View style={{ width: "80%", height: "30%" }}>
                            <Text style={{ width: "100%", fontSize: 10, color: "grey" }}>Email</Text>
                            <TextInput style={{ height: "40%", width: "100%", fontSize: 12, borderBottomColor: "black", borderBottomWidth: 1 }} value={"Wenkimao927@gmail.com"} />
                        </View>
                        <View style={{ width: "80%", height: "30%" }}>
                            <Text style={{ width: "100%", fontSize: 10, color: "grey" }}>Password</Text>
                            <TextInput onFocus={() => { setEditPassword(true) }} style={{ height: "40%", width: "100%", fontSize: 12, borderBottomColor: "black", borderBottomWidth: 1 }} secureTextEntry={true} value={"Wensing0831."} />
                        </View>
                        {
                            editPassword && <>
                                < View style={{ width: "80%", height: "30%" }}>
                                    <Text style={{ width: "100%", fontSize: 10, color: "grey" }}>Confirm Password</Text>
                                    <TextInput style={{ height: "40%", width: "100%", fontSize: 12, borderBottomColor: "black", borderBottomWidth: 1 }} secureTextEntry={true} value={"Wensing0831."} />
                                </View>
                                <TouchableOpacity style={{ marginTop: "5%", backgroundColor: "#239ed9", padding: "3%", borderRadius: 100 }} onPress={() => { setEditPassword(false) }}>
                                    <Text style={{ fontSize: 14, color: "white", fontWeight: "bold" }}>Save Change</Text>
                                </TouchableOpacity>
                            </>
                        }
                    </View>
                </View>
            </View >
        </SafeAreaView>
    )
}