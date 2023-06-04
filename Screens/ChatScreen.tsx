import React, { useContext } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View, Text, FlatList
} from "react-native";
import ChatBuble from "../Components/ChatBuble";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import IUser, { roles } from "../types/Models/User";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useChatAction } from "../actions/chatAction";



type ChatScreenProps = {
  setChatRoomModal: React.Dispatch<React.SetStateAction<boolean>>,
  selectedUser: IUser,
}

export default function ChatScreen({ setChatRoomModal, selectedUser }: ChatScreenProps) {

  const [message, setMessage] = React.useState<string>("");
  const loggedInUser = useSelector((state: RootState) => state.authentication.loggedInUser)
  const chat = useSelector((state: RootState) => state.chat.chat)
  const chatAction = useChatAction()

  function onSendButtonPressed() {
    chatAction.sendMessageAction({ message: message, receiverID: selectedUser._id })
    setMessage("")
  }


  function onMessageChange(text) {
    console.log(text)
    setMessage(text);

  }

  function renderChatBubble({ item }) {
    return <ChatBuble msg={item.msg} receive={item.receive} />
  }
  if (chat[selectedUser._id]?.unRead) {
    chatAction.readMessageAction({ receiverID: selectedUser._id })
  }

  return (
    <SafeAreaView style={{ height: "100%" }}>
      {loggedInUser.role == roles.admin &&
        <>
          <View style={{ flexDirection: "row", alignItems: "center", width: "100%", paddingTop: "2%", paddingBottom: "2%", borderBottomWidth: 0.5 }}>
            <TouchableOpacity
              onPress={() => { setChatRoomModal(false) }}           >
              <Ionicons style={{ marginLeft: "5%" }} name="arrow-back" size={30} />
            </TouchableOpacity>
            <Text style={{ marginLeft: "5%", fontSize: 16, fontWeight: "bold" }}>{selectedUser.name}</Text>
          </View>
        </>}
        <FlatList
          data={chat[selectedUser._id]?.chatLog}
          renderItem={renderChatBubble} />
      <View
        style={{
          ...style.inputContainer,
          position: "absolute",
          marginTop: "auto",
          flexDirection: "row",
          width: "100%",
          height:60,
          backgroundColor: "white",
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <TextInput
          style={{
            width: "70%",
            height: "60%",
            borderRadius: 20,
            borderWidth: 0.2,
            fontSize: 12,
            padding: 10,
            backgroundColor: "#f0f0f0",
          }}
          onChangeText={onMessageChange}
          placeholder="Type Something..."
          value={message}
        />
        <TouchableOpacity style={{ width: "10%", marginLeft: "10%" }} onPress={onSendButtonPressed}>
          <Ionicons name="send" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  window: {},
  inputContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});
