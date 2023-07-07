import React, { useContext } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View, Text, FlatList, ToastAndroid, Modal
} from "react-native";
import ChatBuble from "../Components/ChatBuble";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import IUser, { roles } from "../types/Models/User";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useChatAction } from "../actions/chatAction";
import { IReport } from "../types/Models/Report";
import ForwardRerpot from "../Components/ForwardReport";
import ReportModal from "../Modals/ReportModal";
import UpdateReportModal from "../Modals/UpdateReportModal";



type ChatScreenProps = {
  route?: any,
  onChatRoomClose:()=>void,
  unSelectedUser?: () => void,
  selectedUser: IUser,
}

export default function ChatScreen({ onChatRoomClose, unSelectedUser, selectedUser, route }: ChatScreenProps) {

  const params = route?.params
  const [message, setMessage] = React.useState<string>("");
  const [report, setReport] = React.useState<IReport>(params?.report)
  const [selectedReport, setSelectedReport] = React.useState<IReport>(null)

  const loggedInUser = useSelector((state: RootState) => state.authentication.loggedInUser)
  const chatState = useSelector((state: RootState) => state.chat)
  const chat = chatState.chat
  const chatAction = useChatAction()
  const flatListRef = React.useRef<FlatList>(null)



  React.useEffect(() => {
    setReport(params?.report)
  }, [params])

  async function onSendButtonPressed() {
    if (message.length == 0) {
      ToastAndroid.show("Message cannot be empty", ToastAndroid.SHORT)
      return
    }
    await chatAction.sendMessageAction({
      message: message, receiverID: selectedUser._id, forwardedReport: report ? {
        _id: report?._id,
        form: report?.form,
      } : null
    })
    setMessage("")
    delete params?.report
    setReport(null)
  }

  

  function onMessageChange(text) {
        setMessage(text);

  }

  function onForwardedReportPressed(report: IReport) {
    setSelectedReport(report)
  }

  function renderChatBubble({ item }) {
        return <ChatBuble
      msg={item.msg}
      receive={item.receive}
      reportForward={item.forwardedReport}
      onForwardMessagePress={onForwardedReportPressed}
    />
  }

  React.useEffect(() => {
    if (chat[selectedUser._id]?.unRead) {
      chatAction.readMessageAction({ receiverID: selectedUser._id })
    }
    
    if(chatState.error)
    {
      console.error("Error Occured" +chatState.error)
    }
  }, [chat])


  return (
    <SafeAreaView style={{ height: "100%" }}>
      {
        loggedInUser.role == roles.admin &&
        <>
          <View style={{ flexDirection: "row", alignItems: "center", width: "100%", paddingTop: "2%", paddingBottom: "2%", borderBottomWidth: 0.5 }}>
            <TouchableOpacity
              onPress={() => { onChatRoomClose(); unSelectedUser();}}           >
              <Ionicons style={{ marginLeft: "5%" }} name="arrow-back" size={30} />
            </TouchableOpacity>
            <Text style={{ marginLeft: "5%", fontSize: 16, fontWeight: "bold" }}>{selectedUser.name}</Text>
          </View>
        </>
      }
      <FlatList
        inverted
        ref={flatListRef}
        style={{ width: "100%", backgroundColor: "#f0f0f0" }}
        data={chat[selectedUser._id]?.chatLog.slice().reverse()}
        renderItem={renderChatBubble}
      />
      <View style={{
        ...style.inputContainer,
        width: "100%",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}>

        {
          report && 
          
        <View 
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ForwardRerpot
          report={report}
          onForwardMessagePress={onForwardedReportPressed}
          />
          <Entypo name="cross" size={30} color="black" 
            onPress={() => {
              delete params?.report
              setReport(null)
            }}
          />
            </View>
        }
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            style={{
              width: "70%",
              borderRadius: 20,
              borderWidth: 0.2,
              fontSize: 12,
              padding: 5,
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
      </View>
      <Modal visible={!!selectedReport}>
        {
          loggedInUser.role == roles.admin?
          <UpdateReportModal
          reportID={selectedReport?._id}
          closeModal={() => { setSelectedReport(null) }}
          forwardButton={false}
          />
          :
          <ReportModal
          reportID={selectedReport?._id}
          closeModal={() => { setSelectedReport(null) }}
          />
        }
      </Modal>
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
  forwardStyle: {
    width: "60%",
    height: 200,
    borderRadius: 20,
    margin: 10,
    backgroundColor: "#f0f0f0",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  }
});
