import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IReport } from "../types/Models/Report";
import ForwardRerpot from "./ForwardReport";


type ChatBubleProps = {
    receive: boolean,
    reportForward?: IReport,
    onForwardMessagePress: (report:IReport) => void,
    msg: string,
}

export default function ChatBuble({ receive, msg,reportForward,onForwardMessagePress}: ChatBubleProps) {
    ;
    const isReceive = receive ? 10 : "auto"
    const color = receive ? "white" : "#80ff88"
    return (
        <View style={{ alignItems: "baseline", marginBottom: 5 }}>
            <View style={{ backgroundColor: color, padding: 10, margin: 10, marginBottom: 0, marginLeft: isReceive, borderRadius: 10 }}>
                {
                    reportForward &&
                    <ForwardRerpot 
                    report={reportForward}
                    onForwardMessagePress={onForwardMessagePress}
                    />
                }
                <Text style={{ fontSize: 12 }}>
                    {msg}
                </Text>
            </View>
            <Text style={{ fontSize: 8, marginBottom: 5, marginLeft: isReceive, marginRight: 10 }}>
                12:00
            </Text>
        </View>
    )
}