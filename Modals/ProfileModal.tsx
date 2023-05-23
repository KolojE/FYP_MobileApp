import React, { useContext } from "react";
import { View, Text, TouchableOpacity, TextInput} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import IUser, { roles } from "../api/Models/User";
import AuthContext from "../Contexts/LoggedInUserContext";
import { activateMember, deleteDeactivatedMember } from "../api/admin";
import IComplainant from "../api/Models/Complainant";
import * as ImagePicker from 'expo-image-picker';
import { Image } from "react-native";
import { getProfilePicture, uploadProfilePicture } from "../api/user";

type Profile =
    {
        setMemberActivationCallBack?: ({_id}:{_id:string})=>void,
        setProfileModal: Function,
        user: IComplainant | IUser,
        setUser?: React.Dispatch<React.SetStateAction<IUser | IComplainant>>,
        editable: boolean,

    }
export default function ProfileModal({ setMemberActivationCallBack, setProfileModal, user,setUser, editable }: Profile) {

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
        setProfileModal((prev) => {
            setMemberActivationCallBack({_id:user._id})
            return {
                ...prev, visible: false
            }
        })
    }
    const onRemoveButtonPress = () => {
        deleteDeactivatedMember(user._id)
        setProfileModal((prev) => {
            return {
                ...prev, visible: false
            }
        })
    }

    const onProfilePicturePressed = async () => {
        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (image.canceled) {
            return;
        }

    setUser((prev)=>{
        return {
            ...prev,
            base64ProfilePicture:image.assets[0].base64
        }
    }
    )
    await uploadProfilePicture({ uri:image.assets[0].uri, fileName:image.assets[0].fileName})


    }

    const activation = "activation" in user && user.activation

    const activationButtonStyle = activation ? { backgroundColor: "#ff3d3d" } : { backgroundColor: "#91f2ab" }
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
                        <TouchableOpacity onPress={onProfilePicturePressed}>
                            <View style={{ width: "100%", alignItems: "center" }}>
                                <Image style={{height:100,width:100,borderRadius:100}} source={{uri:`data:image/jpg;base64,${user.base64ProfilePicture}`}} />
                            </View>
                        </TouchableOpacity>
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
                                            {activation ? "Deactivate" : "Activate"}
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