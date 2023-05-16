import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, ScrollView, Modal } from "react-native";
import IconTextInput from "../Components/IconTextInput";
import Member from "../Components/Member";
import ProfileModal from "./ProfileModal";
import { getMembers } from "../api/admin";
import IComplainant from "../api/Models/Complainant";



type MemeberListModalProps = {
setMemberListModal:React.Dispatch<React.SetStateAction<boolean>>;
}


export default function MemeberListModal({setMemberListModal}:MemeberListModalProps) {
    const [activatedMembers, setActivatedMembers] = React.useState<Array<IComplainant>>([]);
    const [deactivatedMembers, setDeactivatedMembers] = React.useState<Array<IComplainant>>([]);
    const [members, setMembers] = React.useState<Array<IComplainant>>([]);


    const [activatedMemberElements, setActivatedMemberElements] = React.useState<Array<JSX.Element>>([]);
    const [deactivatedMemberElements, setDeactivatedMemberElements] = React.useState<Array<JSX.Element>>([]);
    const [profileModal, setProfileModal] = React.useState({
        visible: false,
        modal: <ProfileModal reRenderCallback={Renderer} editable={false} setProfileModal={undefined} user={undefined} />
    });
    React.useEffect(() => {
        Renderer()
    }, [])


    React.useEffect(() => {

        setActivatedMemberElements(() => {
            return activatedMembers.map((member, index) => {
                return <Member user={member} onPressedCallBack={handleProfileModal} key={index} />
            })
        })

        setDeactivatedMemberElements(() => {
            return deactivatedMembers.map((member, index) => {
                return <Member user={member} onPressedCallBack={handleProfileModal} key={index} />
            })
        })
    }, [activatedMembers, deactivatedMembers])

    const handleProfileModal = (id) => {
        const member = members.find(member => {
            return member._id === id
        }
        )

        setProfileModal((prev) => {
            return {
                ...prev,
                visible: true,
                modal: <ProfileModal
                    editable={false} reRenderCallback={Renderer} setProfileModal={setProfileModal} user={member} />
            }
        })
    }

    function Renderer() {

        const activatedMembers_: Array<IComplainant> = []
        const deactivatedMembers_: Array<IComplainant> = []

        getMembers().then((members) => {
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
        })
    }

    return (
        <View style={styles.searchContainer}>
            <AntDesign onPress={() => { setMemberListModal(false) }} name="down" size={24} style={{ marginRight: "auto", marginLeft: "5%", marginTop: "5%" }} />
            <View style={{ flexDirection: "row" }}>
                <IconTextInput icon={<Entypo name="magnifying-glass" style={{ marginRight: 10 }} />} placeholder="Search" style={styles.searchBox} editable={true} />
            </View>
            <ScrollView style={{ width: "100%" }} contentContainerStyle={{ width: "100%", alignItems: 'center' }}>
                {
                    deactivatedMembers.length > 0 &&
                    <>
                        <Text style={{ color: "grey", marginVertical: "5%" }}>Deactivated Members</Text>
                        {deactivatedMemberElements}
                    </>
                }
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