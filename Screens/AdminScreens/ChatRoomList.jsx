import React from "react";
import { Modal, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatRoom from "../../Components/ChatRoom";
import Title from "../../Components/Title";
import ChatScreen from "../ChatScreen";

export default function ChatRoomList() {
    const [chatRoomModal, setChatRoomModal] = React.useState(false);
    return (
        <SafeAreaView>
            <ScrollView>

                <Title title={"Chat Rooms"} />
                <View style={{ marginTop: "3%" }}>
                    <ChatRoom setChatRoomModal={setChatRoomModal} />
                    <ChatRoom />
                    <ChatRoom />
                    <ChatRoom />
                    <ChatRoom />
                    <ChatRoom />
                    <ChatRoom />
                    <ChatRoom />
                    <ChatRoom />
                    <ChatRoom />
                    <ChatRoom />
                </View>
            </ScrollView>
            <Modal animationType="slide" visible={chatRoomModal} >
                <ChatScreen setChatRoomModal={setChatRoomModal} />
            </Modal>
        </SafeAreaView>
    )
}