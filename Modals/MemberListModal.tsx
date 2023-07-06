import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import IconTextInput from "../Components/IconTextInput";
import Member from "../Components/Member";
import IComplainant from "../types/Models/Complainant";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useComplainantAction } from "../actions/complainantAction";
import MemberProfileModal from "./MemberProfileModal";



type MemeberListModalProps = {
    setMemberListModal: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function MemeberListModal({ setMemberListModal }: MemeberListModalProps) {

    const [profileModal, setProfileModal] = React.useState<boolean>(false);
    const [selectedMember, setSelectedMember] = React.useState<IComplainant>();
    const [filteredMembers, setFilteredMembers] = React.useState<IComplainant[]>([])

    const complaiantAction = useComplainantAction();
    const complainant = useSelector((state: RootState) => state.complainant)
    const members = complainant.complainants;
    const [deactivatedMembers,setDeactivatedMembers] = React.useState<IComplainant[]>([])
    const [activatedMembers,setActivatedMembers] = React.useState<IComplainant[]>([])
    
    React.useEffect(() => {
        if (members.length === 0)
            complaiantAction.getComplainants()
    }, [])

    React.useEffect(() => {
        setDeactivatedMembers(members.filter((member) => !member.activation))
        setActivatedMembers(members.filter((member) => member.activation))
    }, [members])

    React.useEffect(() => {
        if(filteredMembers.length!==0)
        {
            setDeactivatedMembers(filteredMembers.filter((member) => !member.activation))
            setActivatedMembers(filteredMembers.filter((member) => member.activation))
            return
        }
        setDeactivatedMembers(members.filter((member) => !member.activation))
        setActivatedMembers(members.filter((member) => member.activation))
    } ,[filteredMembers])

    const onMemberPressed = (member: IComplainant) => {
        setSelectedMember(member)
        setProfileModal(true)
    }

    const renderMember = ({ item }) => {
        return <Member user={item} onPressed={onMemberPressed} key={item.id} />
    }

    const onSearchTextChanged = (text: string) => {
        if (text.length === 0) {
            setFilteredMembers([])
            return
        }



        const filteredMembers = members.filter((member) => {
            
            if(member.name.toLowerCase().includes(text.toLowerCase()) || member.ID.toString().includes(text) || member.email.toLowerCase().includes(text.toLowerCase()))
            return true

        })
                setFilteredMembers(filteredMembers)

        
    }



    return (
        <View style={styles.container}>
            <AntDesign onPress={() => { setMemberListModal(false) }} name="down" size={24} style={{ marginRight: "auto", marginLeft: "5%", marginTop: "5%" }} />
                <IconTextInput icon={<Entypo name="magnifying-glass" style={{ marginRight: 10}} />} placeholder="Enter any keyword, ID, name etc.." viewContainerStyle={styles.searchBox} editable={true} onTextChange={onSearchTextChanged}/>
            <View style={{alignItems:'center',width:"100%"}} >

                <FlatList
                    data={[]}
                    style={{ position: "absolute", width: "100%", zIndex: 2, height: "100%" }} // Use 0 width to hide the empty FlatList
                    renderItem={() => null}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => {
                                complaiantAction.getComplainants()
                            }} />
                    }
                />
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
            </View>
            <Modal visible={profileModal} transparent={true} animationType="slide">
                <Modal transparent={true} visible={profileModal} animationType="fade">
                    <TouchableOpacity
                        onPress={() => {  }}
                        style={{
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            opacity: 0.5,
                            zIndex: 1,
                            backgroundColor: "black"
                        }}
                    />
                </Modal>
                {
                    selectedMember &&
                    <MemberProfileModal closeModal={()=>{setProfileModal(false)}} member={selectedMember} key={selectedMember._id} />
                }
            </Modal>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
    },
    searchBox: {
        borderWidth: 1,
        width: "90%",
        marginTop: "5%",
        flexDirection: "row",
        alignItems:"center",
        borderRadius: 100,
        paddingLeft: 10,
        paddingTop: 2,
        paddingBottom: 2,
    }
});