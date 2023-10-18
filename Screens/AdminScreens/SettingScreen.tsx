import React from "react";
import { View, Text, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SettingOption } from "../../Components/SettingOption";
import FormListModal from "../../Modals/FormListModal";
import MemeberListModal from "../../Modals/MemberListModal";
import ProfileModal from "../../Modals/ProfileModal";
import { useAuthAction } from "../../actions/authAndRegAction";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import OrganizationProfileScreen from "../../Modals/OrganizationProfileModal";



export default function SettingScreen({ navigation }) {
    const [memberListModal, setMemberListModal] = React.useState(false);
    const [formListModal, setFormListModal] = React.useState(false);
    const [profileModal, setProfileModal] = React.useState(false);
    const [organizationProfileModal, setOrganizationProfileModal] = React.useState(false);

    const authAction = useAuthAction();
    const loggedInUser = useSelector((state: RootState) => state.authentication.loggedInUser);
    const userInfo = useSelector((state: RootState) => state.userinfo.userinfo);
    const onLogoutPress = () => {
        authAction.logoutAction();
    }

    const onOrganizationProfileModalClose = () => {
        setOrganizationProfileModal(false)
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
            <View style={{ backgroundColor: "white", position: "absolute", alignSelf: "center", height: "50%", width: "85%", borderRadius: 30, top: "40%", padding: "5%" }}>
                <View style={{ width: "90%", alignSelf: "center", height: "100%", justifyContent: "center" }}>
                    <SettingOption label={"Company Profile"} setModal={setOrganizationProfileModal} />
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
                <FormListModal closeModal={()=>{
                    setFormListModal(false)
                }} navigation={navigation} />
            </Modal>
            <Modal visible={profileModal} animationType="slide">
                <ProfileModal closeModal={()=>{setProfileModal(false)}} userInfo={userInfo}/> 
            </Modal>
            <Modal visible={organizationProfileModal} animationType="slide">
                <OrganizationProfileScreen closeModal={onOrganizationProfileModalClose} organization={userInfo.organization} organizationStatues={userInfo.statuses} />
            </Modal>
        </SafeAreaView >
    );
}