import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet,  Modal, FlatList } from "react-native";
import IconTextInput from "../Components/IconTextInput";
import Member from "../Components/Member";
import ProfileModal from "./ProfileModal";
import { activateMember, getMembers } from "../api/admin";
import IComplainant from "../api/Models/Complainant";
import fetchProfilePicture from "../utils/fetchprofilePicture";



type MemeberListModalProps = {
    setMemberListModal: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function MemeberListModal({ setMemberListModal }: MemeberListModalProps) {
    const [activatedMembers, setActivatedMembers] = React.useState<Array<IComplainant>>([]);
    const [deactivatedMembers, setDeactivatedMembers] = React.useState<Array<IComplainant>>([]);
    const [members, setMembers] = React.useState<Array<IComplainant>>([]);

    const [profileModal, setProfileModal] = React.useState({
        visible: false,
        modal: <ProfileModal setMemberActivationCallBack={setMemberActivationCallBack} editable={false} setProfileModal={undefined} user={undefined} />
    });

    React.useEffect(() => {
        const getMembersAsync = async () => {
            const members = await getMembers();
            setMembers(members);
        }
        getMembersAsync();
    }, [])

    React.useEffect(() => {
        const setMemberProfilePicturesAsync = async () => {
            fetchProfilePicture({ setMembers, members })
        }
        const setMembersAsync = async () => {
            setActivatedMembers(members.filter((member) => member.activation));
            setDeactivatedMembers(members.filter((member) => !member.activation));
        }


        setMemberProfilePicturesAsync();
        setMembersAsync();
    }, [members])




    function setMemberActivationCallBack({ _id }) {
        setMembers((prev) => {
            return prev.map((member) => {
                if (member._id === _id) {
                    activateMember(_id, !member.activation)
                    return {
                        ...member,
                        activation: !member.activation
                    }
                }
                return member;
            })
        })
    }
    const handleProfileModal = (member) => {
        setProfileModal((prev) => {
            return {
                ...prev,
                visible: true,
                modal: <ProfileModal
                    editable={false} setMemberActivationCallBack={setMemberActivationCallBack} setProfileModal={setProfileModal} user={member} />
            }
        })
    }


    const renderMember = ({ item }) => {
        return <Member user={item} onPressedCallBack={handleProfileModal} key={item.id} />
    }



    return (
        <View style={styles.searchContainer}>
            <AntDesign onPress={() => { setMemberListModal(false) }} name="down" size={24} style={{ marginRight: "auto", marginLeft: "5%", marginTop: "5%" }} />
            <View style={{ flexDirection: "row" }}>
                <IconTextInput icon={<Entypo name="magnifying-glass" style={{ marginRight: 10 }} />} placeholder="Search" viewContainerStyle={styles.searchBox} editable={true} />
            </View>
            {

                deactivatedMembers.length > 0 && <>
                    <Text style={{ color: "grey", marginVertical: "5%" }}>Deactivated Members</Text>
                    <FlatList
                        data={deactivatedMembers}
                        renderItem={renderMember}
                        style={{ width: "90%" }}
                    />
                </>
            }
            {
                <>
                    <Text style={{ color: "grey", marginVertical: "5%" }}>Activated Members</Text>
                    <FlatList
                        data={activatedMembers}
                        renderItem={renderMember}
                        style={{ width: "90%" }}
                    />
                </>
            }
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