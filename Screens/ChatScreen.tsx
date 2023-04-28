import React, { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View, Text
} from "react-native";
import ChatBuble from "../Components/ChatBuble";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { roles } from "../api/Models/User";
import AuthContext from "../Contexts/LoggedInUserContext";
export default function ChatScreen({setChatRoomModal}) {

const loggedInUser = useContext(AuthContext).loggedInUser;

  return (
    <SafeAreaView style={{ height: "100%" }}>
      {loggedInUser.role == roles.admin &&
        <>
          <View style={{ flexDirection: "row", alignItems: "center", width: "100%", paddingTop: "2%", paddingBottom: "2%", borderBottomWidth: 0.5 }}>
            <TouchableOpacity
              onPress={() => { setChatRoomModal(false) }}           >
              <Ionicons style={{ marginLeft: "5%" }} name="arrow-back" size={30} />
            </TouchableOpacity>
            <Text style={{ marginLeft: "5%", fontSize: 16, fontWeight: "bold" }}>Ali</Text>
          </View>
        </>}
      <View style={{ width: "100%" }}>
        <ScrollView style={{ marginTop: 20 }} contentContainerStyle={{}}>
          <ChatBuble
            reply={true}
            msg={"Hi ,report received, thank for your report"}
          />
          <ChatBuble reply={false} msg={"may i know the progress?"} />
          <ChatBuble
            reply={true}
            msg={"The progress will be updated in few days Thank you"}
          />
        </ScrollView>

      </View>
      <View
        style={{
          ...style.inputContainer,
          marginTop: "auto",
          flexDirection: "row",
          width: "100%",
          height: 60,
          backgroundColor: "white",
          bottom: 0,
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
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
          placeholder="Type Something..."
        />
        <TouchableOpacity style={{ width: "10%", marginLeft: "10%" }}>
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
