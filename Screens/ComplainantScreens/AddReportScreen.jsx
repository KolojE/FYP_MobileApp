import { ScrollView, View, Text, StyleSheet } from "react-native";
import ReportType from "../../Components/ReportType";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "../../Components/Title";
export default function AddReportScreen(props) {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.window} >
        <Title title={"Report"} />
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <ReportType
            image={<FontAwesome name="fire" size={50} color="black" />}
            label={"Wild Fire"}
            color={"red"}
            navigation={props.navigation}
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
            label={"Flood"}
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
            label={"Floord"}
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
              <MaterialIcons name="drafts" size={50} color="black" />
            }
            label={"Drafts"}
            color={"blue"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  window: {
    minHeight: "100%",
    alignItems: "center",
  },

});
