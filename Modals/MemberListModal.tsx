import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, ScrollView, Modal } from "react-native";
import IconTextInput from "../Components/IconTextInput";
import Member from "../Components/Member";
import ProfileModal from "./ProfileModal";
import { viewMembers } from "../api/admin";
import IComplainant from "../api/Models/Complainant";


export default function MemeberListModal(props) {
    const [activatedMembers, setActivatedMembers] = React.useState<Array<IComplainant>>([]);
    const [deactivatedMembers, setDeactivatedMembers] = React.useState<Array<IComplainant>>([]);
    const [members, setMembers] = React.useState<Array<IComplainant>>([]);


    const [activatedMemberElements, setActivatedMemberElements] = React.useState<Array<JSX.Element>>([]);
    const [deactivatedMemberElements, setDeactivatedMemberElements] = React.useState<Array<JSX.Element>>([]);
    const [profileModal, setProfileModal] = React.useState({
        visible: false,
        modal: <ProfileModal editable={false} setProfileModal={undefined} user={undefined} />
    });
    React.useEffect(() => {
        const activatedMembers_: Array<IComplainant> = []
        const deactivatedMembers_: Array<IComplainant> = []

        viewMembers().then((members) => {
            members.forEach((member) => {
                if (member.activation) {
                    activatedMembers_.push(member);
                }
                else {
                    deactivatedMembers_.push(member);
                }
            })
            setMembers(members);
            setActivatedMembers(activatedMembers_);
            setDeactivatedMembers(deactivatedMembers_);
        }, (rej) => {
            console.log(rej)
        })
    }, [])

    React.useEffect(() => {

        setActivatedMemberElements(() => {
            return activatedMembers.map((member, index) => {
                return <Member _id={member._id} ID={member.compID} name={member.name} handleProfileModal={handleProfileModal} key={index} />
            })
        })

        setDeactivatedMemberElements(() => {
            return deactivatedMembers.map((member, index) => {
                return <Member _id={member._id} ID={member.compID} name={member.name} handleProfileModal={handleProfileModal} key={index} />
            })
        })
        console.log(deactivatedMemberElements)
    }, [activatedMembers, deactivatedMembers])

    const handleProfileModal = (id) => {
        const member = members.find(member => {
            console.log(member._id + "===" + id)
            return member._id === id
        }
        )

        setProfileModal((prev) => {
            return {
                ...prev,
                visible: true,
                modal: <ProfileModal editable={false} setProfileModal={setProfileModal} user={member} />
            }
        })
    }

    return (
        <View style={styles.searchContainer}>
            <AntDesign onPress={() => { props.setMemberListModal(false) }} name="down" size={24} style={{ marginRight: "auto", marginLeft: "5%", marginTop: "5%" }} />
            <View style={{ flexDirection: "row" }}>
                <IconTextInput icon={<Entypo name="magnifying-glass" style={{ marginRight: 10 }} />} placeholder="Search" style={styles.searchBox} editable={true} />
            </View>
            <ScrollView style={{ width: "100%" }} contentContainerStyle={{ width: "100%", alignItems: 'center' }}>
                <Text style={{ color: "grey", marginVertical: "5%" }}>Deactivated Members</Text>
                {deactivatedMemberElements}
                <Text style={{ color: "grey", marginVertical: "5%" }}>Activated Members</Text>
                {activatedMemberElements}
            </ScrollView>
            <Modal visible={profileModal.visible}>
                {profileModal.modal}
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