import React, { useContext } from "react";
import { View, Text,  Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SettingOption } from "../../Components/SettingOption";
import FormListModal from "../../Modals/FormListModal";
import MemeberListModal from "../../Modals/MemberListModal";
import ProfileModal from "../../Modals/ProfileModal";
import AuthContext from "../../Contexts/LoggedInUserContext";
import { deleteItemAsync } from "expo-secure-store";



export default function SettingScreen({navigation}) {
    const [memberListModal, setMemberListModal] = React.useState(false);
    const [formListModal, setFormListModal] = React.useState(false);
    const [profileModal, setProfileModal] = React.useState(false);
    const setLoggedInUser= useContext(AuthContext).setLoggedInUser;
console.log(formListModal)
    const onLogoutPress=()=>{
        deleteItemAsync("jwt");
        setLoggedInUser(null)
    }
    return (
        <SafeAreaView style={{}}>
            <View style={{ position: "relative", height: "100%", backgroundColor: "#050e2d" }}>
                <View style={{ alignSelf: "center", justifyContent: "center", flex: 2, paddingBottom: "50%" }}>
                    <Text style={{ fontSize: 24, color: "white", fontWeight: "bold", textAlign: "center" }}> Settings</Text>
                    <Text style={{ fontSize: 10, color: "white", textAlign: "center", marginTop: "2%" }}>Organization ID: OR111252</Text>
                    <Text style={{ fontSize: 10, color: "white", textAlign: "center", marginTop: "2%" }}>MOE Admin (A112551)</Text>
                </View>
                <View style={{ position: "relative", width: "100%", marginTop: "auto", backgroundColor: "#cdcfd5", borderTopLeftRadius: 20, borderTopRightRadius: 20, flex: 2 }}>

                </View>
            </View>
            <View style={{ backgroundColor: "white", position: "absolute", alignSelf: "center", height: "50%", width: "85%", borderRadius: 30, top: "40%" ,padding:"5%"}}>
                <View style={{ width: "90%", alignSelf: "center", height: "100%", justifyContent: "center" }}>
                    <SettingOption label={"Company Profile"} setModal={setProfileModal} />
                    <SettingOption label={"Profile"} setModal={setProfileModal} />
                    <SettingOption label={"Report Forms"} setModal={setFormListModal} />
                    <SettingOption label={"Members"} setModal={setMemberListModal} />
                    <SettingOption label={"Logout"} setModal={onLogoutPress} />
                </View>
            </View>
            <Modal visible={memberListModal} animationType="slide">
                <MemeberListModal setMemberListModal={setMemberListModal} />
            </Modal>
            <Modal visible={formListModal} presentationStyle="pageSheet"
                style={{ margin: 0 }} animationType="slide">
                <FormListModal setFormListModal={setFormListModal} isVisible={formListModal} navigation={navigation} />
            </Modal>
            <Modal visible={profileModal} animationType="slide">
                <ProfileModal reRenderCallback={()=>{}} user={useContext(AuthContext).loggedInUser} setProfileModal={setProfileModal} editable={true} />
            </Modal>
        </SafeAreaView >
    );
}