import React, { useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, StyleSheetProperties } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import IUser, { roles } from "../api/Models/User";
import AuthContext from "../Contexts/LoggedInUserContext";
import { activateMember, deleteDeactivatedMember } from "../api/admin";
import IComplainant from "../api/Models/Complainant";


type Profile =
    {
        reRenderCallback?: Function,
        setProfileModal: Function,
        user: IComplainant | IUser,
        editable: boolean,

    }
export default function ProfileModal({ reRenderCallback, setProfileModal, user, editable }: Profile) {

    const LoggedInUser = useContext(AuthContext).loggedInUser;
    const [editPassword, setEditPassword] = React.useState(false);

    const onBackButtonPressed = () => {
        setProfileModal((prev) => {
            return {
                ...prev, visible: false
            }
        })
    }
    const onActivationButtonPress = () => {
        activateMember(user._id,!activation)
        setProfileModal((prev) => {
            reRenderCallback();
            return {
                ...prev, visible: false
            }
        })
    }
    const onRemoveButtonPress = () => {
        deleteDeactivatedMember(user._id)
        setProfileModal((prev) => {
            reRenderCallback();
            return {
                ...prev, visible: false
            }
        })
    }

    const activation ="activation" in user && user.activation
    

    const activationButtonStyle =  activation? { backgroundColor: "#ff3d3d" } : { backgroundColor: "#91f2ab" }
    return (
        <SafeAreaView>

            <View style={{ height: "100%" }}>
                <View style={{ height: "30%", width: "100%" }}>
                    <TouchableOpacity onPress={onBackButtonPressed}>
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
                        <Field label={'Organization ID'} value={user.organization.ID} editable={false} />
                        <Field label={'Organization Name'} value={user.organization.name} editable={false} />
                        <Field label={'Email'} value={user.email} editable={false} />
                        <Field label={'User Name'} value={user.name} editable={editable} />
                        <Field label={'Mobile Number'} value={user.contact?.phoneNo} editable={editable} />

                        {
                            LoggedInUser._id === user._id &&
                            <>
                                <Field label={'Change Password'} value={""} editable={true} passwordField={true} />
                                {
                                    editPassword && <>
                                        <Field label={'Confirm Password'} value={""} editable={true} passwordField={true} />
                                        <TouchableOpacity style={{ marginTop: "5%", backgroundColor: "#239ed9", padding: "3%", borderRadius: 100 }} onPress={() => { setEditPassword(false) }}>
                                            <Text style={{ fontSize: 14, color: "white", fontWeight: "bold" }}>Save Change</Text>
                                        </TouchableOpacity>
                                    </>
                                }
                            </>
                        }
                        {
                            LoggedInUser.role === roles.admin &&
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ marginTop: 100, margin: 20, padding: 10, borderRadius: 100, ...activationButtonStyle }}>
                                    <TouchableOpacity onPress={onActivationButtonPress}>
                                        <Text>
                                            {activation? "Deactivate" : "Activate"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                {
                                    !activation &&
                                    <View style={{ marginTop: 100, margin: 20, padding: 10, borderRadius: 100, backgroundColor: "#ff3d3d" }}>
                                        <TouchableOpacity onPress={onRemoveButtonPress}>
                                            <Text>
                                                Remove
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        }
                    </View>
                </View>
            </View >
        </SafeAreaView>
    )

    function Field({ label, value, editable, passwordField = false }) {
        return <View style={{ width: "80%", height: "30%" }}>
            <Text style={{ width: "100%", fontSize: 10, color: "grey" }}>{label}</Text>
            <TextInput editable={editable} onFocus={passwordField ? () => { setEditPassword(true) } : () => { return }} style={{ height: "40%", width: "100%", fontSize: 12, color: "grey", borderBottomColor: "grey", borderBottomWidth: 1 }}>{value}</TextInput>
        </View>
    }
}