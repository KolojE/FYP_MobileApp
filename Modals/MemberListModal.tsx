import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, ScrollView, Modal } from "react-native";
import IconTextInput from "../Components/IconTextInput";
import Member from "../Components/Member";
import ProfileModal from "./ProfileModal";
export default function MemeberListModal(props) {
    const [profileModal, setProfileModal] = React.useState(false);
    return (
        <View style={styles.searchContainer}>
            <AntDesign onPress={() => { props.setMemberListModal(false) }} name="down" size={24} style={{ marginRight: "auto", marginLeft: "5%", marginTop: "5%" }} />
            <View style={{ flexDirection: "row" }}>
                <IconTextInput icon={<Entypo name="magnifying-glass" style={{ marginRight: 10 }} />} placeholder="Search" style={styles.searchBox} editable={true} />
            </View>
            <ScrollView style={{ width: "100%" }} contentContainerStyle={{ width: "100%", alignItems: 'center' }}>
                <Text style={{ color: "grey", marginVertical: "5%" }}>Deactivated Members</Text>
                <Member />
                <Member />
                <Text style={{ color: "grey", marginVertical: "5%" }}>Activated Members</Text>
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
            </ScrollView>
            <Modal visible={profileModal}>
                <ProfileModal setProfileModal={setProfileModal} />
            </Modal>
        </View>)
}

const styles = StyleSheet.create({
    searchContainer: {
        width: "100%",
        alignItems: "center"
    },
    searchBox: {
        borderWidth: 1,
        width: "90%",
        marginTop: "5%",
        borderRadius: 100,
        paddingLeft: 10,
        paddingTop: 2,
        paddingBottom: 2,
    }
});