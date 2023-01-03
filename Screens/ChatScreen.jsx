import React from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ChatBuble from "../Components/ChatBuble";
import { Ionicons } from "@expo/vector-icons";
export default function ChatScreen() {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <ScrollView style={{ marginTop: 50 }}>
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

      <View
        style={{
          ...style.inputContainer,
          flexDirection: "row",
          width: "100%",
          height: "10%",
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
    </View>
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
