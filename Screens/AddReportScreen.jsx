import { ScrollView, View, Text, StyleSheet } from "react-native";
import ReportType from "../Components/ReportType";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function AddReportScreen() {
  return (
    <ScrollView contentContainerStyle={styles.window} >
      <View style={styles.titleContainer}>
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 24, position: "absolute", bottom: "20%", marginLeft: "18%" }}>Report Incident</Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          marginTop: "5%",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <ReportType
          image={<FontAwesome name="fire" size={50} color="black" />}
          label={"Wild Fire"}
          color={"red"}
        />
        <ReportType
          image={<FontAwesome name="road" size={50} color="black" />}
          label={"Road Crack"}
          color={"orange"}
        />
        <ReportType
          image={
            <MaterialCommunityIcons name="waterfall" size={50} color="black" />
          }
          label={"Water Floor"}
          color={"blue"}
        />
        <ReportType
          image={<FontAwesome name="fire" size={50} color="black" />}
          label={"Wild Fire"}
          color={"red"}
        />
        <ReportType
          image={<FontAwesome name="road" size={50} color="black" />}
          label={"Road Crack"}
          color={"orange"}
        />
        <ReportType
          image={
            <MaterialCommunityIcons name="waterfall" size={50} color="black" />
          }
          label={"Water Floor"}
          color={"blue"}
        />
        <ReportType
          image={<FontAwesome name="fire" size={50} color="black" />}
          label={"Wild Fire"}
          color={"red"}
        />
        <ReportType
          image={<FontAwesome name="road" size={50} color="black" />}
          label={"Road Crack"}
          color={"orange"}
        />
        <ReportType
          image={
            <MaterialCommunityIcons name="waterfall" size={50} color="black" />
          }
          label={"Water Floor"}
          color={"blue"}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  window: {
    minHeight: "100%",
    alignItems: "center",
  },
  titleContainer: {
    backgroundColor: "#050e2d",
    width: "100%",
    height: "9%",
    borderBottomEndRadius: 100,
    marginRight: "15%"
  },

});
