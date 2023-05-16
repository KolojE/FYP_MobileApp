import React from "react";
import { Modal, ScrollView,TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "../../Components/Title";
import ChatScreen from "../ChatScreen";
import { AntDesign } from "@expo/vector-icons";
import SelectMemberModal from "../../Modals/SelectMemberModal";
import IUser from "../../api/Models/User";

export default function ChatRoomList() {
    const [chatRoomModal, setChatRoomModal] = React.useState<boolean>(false);
    const [selectMemberModal,setSelectMemberModal] = React.useState<boolean>(false);
    const [selectedUser,setSelectedUser] = React.useState<IUser>(null);
     

    React.useEffect(()=>{
    if(selectedUser)
    {
        setChatRoomModal(true);
        setSelectMemberModal(false);
    }
}
    ,[selectedUser])
    return (
        <SafeAreaView style={{minHeight:"100%"}}>
            <ScrollView>
                <Title title={"Chat Rooms"} />
                <View style={{ marginTop: "3%" }}>
                </View>
            </ScrollView>
            <Modal animationType="slide" visible={chatRoomModal} >
                <ChatScreen selectedUser={selectedUser} setChatRoomModal={setChatRoomModal} />
            </Modal>

            <Modal animationType="slide" visible={selectMemberModal}>
            <SelectMemberModal setSelectedUser={setSelectedUser} setSelectMemberModal={setSelectMemberModal}/>
            </Modal>

            <View style={{position:"absolute", bottom:"3%",right:"6%",zIndex:1}}>
                <TouchableOpacity onPress={()=>{setSelectMemberModal(true)}}>
                <AntDesign name="pluscircle" size={50} style={{color:"#4d49f5"}}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}