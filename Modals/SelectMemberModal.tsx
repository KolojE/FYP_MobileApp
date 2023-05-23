import React from "react"
import IUser from "../api/Models/User"
import Member from "../Components/Member";
import { FlatList,  TouchableOpacity, View } from "react-native";
import IconTextInput from "../Components/IconTextInput";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { getMembers } from "../api/admin";
import fetchProfilePicture from "../utils/fetchprofilePicture";
import IComplainant from "../api/Models/Complainant";




type SelectMemberModalProps = {
    setSelectMemberModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedUser: React.Dispatch<React.SetStateAction<IComplainant>>;
}


export default function SelectMemberModal({ setSelectMemberModal,setSelectedUser}: SelectMemberModalProps) {
    const [members, setMembers] = React.useState<IComplainant[]>([]);


    function selectMember(selectedUser: IComplainant) {
        setSelectedUser(selectedUser)
    }

    function renderMembers({item}){
        return <Member key={item._id} user={item} onPressedCallBack={selectMember} />
    }

    function onDownButtonPressed() {
        setSelectMemberModal(false);
    }

    React.useEffect(() => {

        const getMembersAsync = async () => {
            const result = await getMembers();
            setMembers(result);
        }

        getMembersAsync();


    }, [])

    React.useEffect(() => {
        const setMemberProfilePicturesAsync = async () => {
            fetchProfilePicture({setMembers,members})
        }
        setMemberProfilePicturesAsync();
    })


    return (
        <View>
            <TouchableOpacity onPress={onDownButtonPressed} style={{ marginHorizontal: 20, marginTop: 20 }}><AntDesign name="down" size={24} /></TouchableOpacity>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <IconTextInput icon={<Entypo name="magnifying-glass" style={{ marginRight: 10 }} />} placeholder="Search" style={styles.searchBox} editable={true} />
            </View>

            <FlatList
            style={{width:"85%", alignSelf:"center"}}
            data={members}
            renderItem={renderMembers}
            />

        </View>
    )
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