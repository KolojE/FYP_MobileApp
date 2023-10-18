import React from "react";
import { View, Text, TouchableOpacity } from "react-native";


export default function ReportType({navigation,label,color,image,formID}) {
  console.log(formID)
  return (
    <View style={{ width: 150 }}>
      <TouchableOpacity style={{ width: 120 }} onPress={() => { navigation.navigate("reportForm",{formID}) }}>
        <View
          style={{
            margin: 10,
            width: "100%",
            height: 150,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: color,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: 120,
            }}
          >
            {image}
          </View>
          <Text style={{ fontWeight: "700", marginTop: 10 }}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
