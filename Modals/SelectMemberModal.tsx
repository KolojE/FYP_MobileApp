import React from "react"
import Member from "../Components/Member";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import IconTextInput from "../Components/IconTextInput";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import IComplainant from "../types/Models/Complainant";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useComplainantAction } from "../actions/complainantAction";




type SelectMemberModalProps = {
    setSelectMemberModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedUser: React.Dispatch<React.SetStateAction<IComplainant>>;
}


export default function SelectMemberModal({ setSelectMemberModal, setSelectedUser }: SelectMemberModalProps) {

    const complainants = useSelector((state: RootState) => state.complainant);
    const complainantAction = useComplainantAction();

    const members = complainants.complainants.filter((member) => member.activation);
    const [filteredMembers, setFilteredMembers] = React.useState<IComplainant[]>([])
    React.useEffect(() => {
        if (members.length === 0) {
            complainantAction.getComplainants()
        }
    }, [])

    const onMemberSelect = (selectedUser: IComplainant) => {
        setSelectedUser(selectedUser)
    }

    const onSearchtextChange = (text: string) => {
        if (text === "") {
            setFilteredMembers([])
            return
        }
        setFilteredMembers(members.filter((member) => member.name.toLowerCase().includes(text.toLowerCase())))
    }

    const onDownButtonPressed = () => {
        setSelectMemberModal(false);
    }

    function renderMembers({ item }) {
        return <Member key={item._id} user={item} onPressed={onMemberSelect} />
    }

    return (
        <View>
            <TouchableOpacity onPress={onDownButtonPressed} style={{ marginHorizontal: 20, marginTop: 20 }}><AntDesign name="down" size={24} /></TouchableOpacity>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <IconTextInput onTextChange={onSearchtextChange} icon={<Entypo name="magnifying-glass" style={{ marginRight: 10 }} />} placeholder="Search" viewContainerStyle={styles.searchBox} editable={true} />
            </View>

            <FlatList
                style={{ width: "85%", alignSelf: "center" }}
                data={filteredMembers.length>0? filteredMembers:members}
                renderItem={renderMembers}
                refreshControl={
                    <RefreshControl refreshing={complainants.loading} onRefresh={() => { complainantAction.getComplainants() }} />
                }

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
        flexDirection: "row",
        alignItems: "center",
        marginTop: "5%",
        borderRadius: 100,
        paddingLeft: 10,
        paddingTop: 2,
        paddingBottom: 2,
    }
});