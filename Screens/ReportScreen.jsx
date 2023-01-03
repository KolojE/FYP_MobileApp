import { ScrollView, View, Text, StyleSheet } from "react-native";
import ReportType from "../Components/ReportType";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function ReportScreen() {
  return (
    <ScrollView contentContainerStyle={styles.window}>
      <View style={styles.titleContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>
          Report Incident
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          marginTop: "10%",
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
    overflow: "scroll",
    minHeight: "100%",
    width: "100%",
    alignItems: "center",
  },
  titleContainer: {
    width: "90%",
    marginTop: "15%",
  },
});
