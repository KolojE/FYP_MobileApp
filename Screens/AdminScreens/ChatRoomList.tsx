import React from "react";
import { FlatList, Modal, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "../../Components/Title";
import ChatScreen from "../ChatScreen";
import { AntDesign } from "@expo/vector-icons";
import SelectMemberModal from "../../Modals/SelectMemberModal";
import IUser from "../../types/Models/User";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ChatRoom from "../../Components/ChatRoom";
import { IReport } from "../../types/Models/Report";

export default function ChatRoomList({route,navigation}) {
    const [chatRoomModal, setChatRoomModal] = React.useState<boolean>(false);
    const [selectMemberModal, setSelectMemberModal] = React.useState<boolean>(false);
    const [selectedUser, setSelectedUser] = React.useState<IUser>(null);

    const complainants = useSelector((state:RootState)=>state).complainant.complainants;
    const chat = useSelector((state:RootState)=>state).chat.chat;
    const chatRoom = complainants.filter((complainant)=>Object.keys(chat).includes(complainant._id))
    const complainantID  = route?.params?.complainantID;
    const report:IReport = route?.params?.report;

React.useEffect(()=>{
    ;
    if(complainantID && report)
    {
        setSelectedUser(complainants.find((user)=>user._id == complainantID));
        setChatRoomModal(true);
        setSelectMemberModal(false);
    }
    },[complainantID,report])

    React.useEffect(() => {

        if (selectedUser) {
            setChatRoomModal(true);
            setSelectMemberModal(false);
        }
    }
        , [selectedUser])

    const selectMember = (user:IUser) => {
        setSelectedUser(user);
    }

    const unSelectUser= () => {
        setSelectedUser(null);
    }

    const onChatRoomClose = () => {
        setChatRoomModal(false);
        setSelectedUser(null);
        delete route?.params?.complainantID;
        delete route?.params?.report;
    }
    const renderItem = ({ item }) => {
        return (
            <ChatRoom
                user={item}
                key={item._id}
                onPressed={() => {
                    selectMember(item);
                } } 
                lastMessage={
                    chat[item._id] ? chat[item._id].chatLog[chat[item._id].chatLog.length-1].msg: ""
                } 
                lastMessageReceived={
                    chat[item._id] ? chat[item._id].chatLog[chat[item._id].chatLog.length-1].receive
                    : false}
                time={new Date()} 
                           />
        )
    }
    return (
        <SafeAreaView style={{ minHeight: "100%" }}>
                <Title title={"Chat Rooms"} />
                <View style={{ marginTop: "3%",width:"90%",alignSelf:"center" }}>
                    <FlatList
                        renderItem={ renderItem }
                        data={chatRoom}
                    />
                </View>
            <Modal animationType="slide" visible={chatRoomModal} >
                <ChatScreen selectedUser={selectedUser} onChatRoomClose={onChatRoomClose} unSelectedUser={unSelectUser} route={route}/>
            </Modal>

            <Modal animationType="slide" visible={selectMemberModal}>
                <SelectMemberModal setSelectedUser={setSelectedUser} setSelectMemberModal={setSelectMemberModal} />
            </Modal>

            <View style={{ position: "absolute", bottom: "3%", right: "6%", zIndex: 1 }}>
                <TouchableOpacity onPress={() => { setSelectMemberModal(true) }}>
                    <AntDesign name="pluscircle" size={50} style={{ color: "#4d49f5" }} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}