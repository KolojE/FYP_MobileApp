import { View,Text,StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IReport } from "../types/Models/Report";

type ForwardReportProps = {
    report:IReport
    onForwardMessagePress: (report:IReport) => void,
}

export default function ForwardRerpot({report,onForwardMessagePress}:ForwardReportProps)
{
    return (
      <TouchableOpacity 
        onPress={() => {
          onForwardMessagePress(report)
        }}
      >
          <View 
          style={
            style.forwardStyle
          }
          >
            <Ionicons name="document" size={20} color="black" />
            <View>
            <Text style={{
              fontSize: 12,
              fontWeight: "bold",
            }}>Report</Text>
            <Text style={
              style.detailsFont
            }>{report._id}</Text>
            <Text
            style={
              style.detailsFont
            }
            >{report.form.name}</Text>
            </View>
          </View>
            </TouchableOpacity>
    )

}


const style = StyleSheet.create({

  forwardStyle: {
    borderRadius: 5,
    padding:10,
    margin:5,
    marginBottom:15,
    minWidth: 250,
    flexDirection:"row",
    alignItems:"center",
    backgroundColor: "#f0f0f0",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  detailsFont:{
    fontSize: 8,
  }
});