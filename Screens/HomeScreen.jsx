import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import RecentReport from "../Components/RecentReport";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from "react";
import ProfileModal from "../Modal/ProfileModal";
const LatestUpdated = {
  report_id: "R011024",
  report_title: "WildFire",
  report_serverity: "Critical",
  report_Status: "Resolved",
  report_update_details: "The status changed to resolved ",
};

export default function HomeScreen(props) {

  const [profileModal, setProfileModal] = React.useState(false);
  return (
    <ScrollView contentContainerStyle={styles.window} >
      <View style={styles.titleContainer}>
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 24, position: "absolute", bottom: "20%", marginLeft: "18%" }}>Dashboard</Text>
      </View>
      <View style={{ width: "90%", marginTop: "5%" }} >
        <Text style={{ fontSize: 10, color: "#8F8F8F" }}>Profile</Text>
        <View style={{ backgroundColor: "#b0cbde", flexDirection: "row", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center" }}>
          <View style={{ marginLeft: "5%" }}>
            <MaterialCommunityIcons name="face-man-profile" size={34} color="black" />
          </View>

          <View style={{ flex: 2, marginLeft: "5%" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 12 }}>Ng Wen Sing</Text>
              <TouchableOpacity onPress={() => {
                setProfileModal(true);
              }

              }>
                <MaterialIcons name="edit" size={12} color="black" />
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 10 }}>ID: U11252</Text>
            <Text style={{ fontSize: 10 }}>Organization: MOE</Text>
          </View>
          <View style={{ flex: 2, paddingRight: "3%" }}>
            <Text style={{ fontSize: 10 }}>Total Reports : 21</Text>
            <Text style={{ fontSize: 10 }}>Report Resolved: 10</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={{ position: "relative", width: "90%", marginTop: "10%" }}
      >
        <View style={styles.latestUpdateContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <View style={{ paddingLeft: 14 }}>
              <Text
                style={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: 10,
                  paddingTop: 12,
                  paddingBottom: 3,
                }}
              >
                Latest Update
              </Text>
              <Text style={{ fontSize: 8, color: "#f8f8f8" }}>
                20 jan 2022 08:31
              </Text>
            </View>
            <View style={{ position: "absolute", right: 20 }}>
              <Text
                style={{ fontSizea: 16, color: "#F8F8F8", fontWeight: "700" }}
              >
                #R0112204
              </Text>
            </View>
          </View>
          <View style={{ paddingLeft: 14, paddingTop: 10, paddingBottom: 40 }}>
            <Text
              style={{
                color: "#F8F8F8",
                fontWeight: "700",
                fontSize: 16,
                paddingBottom: 10,
              }}
            >
              WirldFire
            </Text>
            <Text
              style={{
                color: "#F8F8F8",
                fontWeight: "500",
                fontSize: 11,
                paddingRight: 10,
                minHeight: 80,
              }}
            >
              The issue has been resolved
            </Text>
          </View>
          <Text
            style={{
              position: "absolute",
              bottom: 12,
              right: 20,
              color: "#C8E6C9",
            }}
          >
            Resolved
          </Text>
        </View>
      </TouchableOpacity>

      <View
        style={{
          width: "85%",
          marginTop: "15%",
          marginBottom: 5,
          flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 10, color: "#8F8F8F" }}>Recent Reports</Text>
        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={() => {
            props.navigation.navigate("reportList");
          }}
        >
          <Text style={{ fontSize: 10, color: "blue" }}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.recentReportsContainer}>
        <RecentReport />
        <RecentReport />
        <RecentReport />
        <RecentReport />
        <RecentReport />
      </View>
      <Modal statusBarTranslucent={true} visible={profileModal} animationType={"slide"}>
        <ProfileModal setProfileModal={setProfileModal} />
      </Modal>
    </ScrollView >
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
    height: "10%",
    borderBottomEndRadius: 100,
    marginRight: "15%"
  },
  latestUpdateContainer: {
    width: "100%",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 1,
    elevation: 5,
    backgroundColor: "#239ed9",
  },
  latestDetailsText: {
    width: "40%",
    fontSize: 10,
  },
  latestDeailsInfoText: {
    fontWeight: "bold",
    flexWrap: "wrap",
    maxWidth: "60%",
    fontSize: 10,
  },
  recentReportsContainer: {
    marginTop: 5,
    marginBottom: "30%",
    width: "90%",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 1,
    elevation: 5,
    backgroundColor: "#FEFCFF",
    padding: 12,
  },
  informationRow: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: "grey",
    borderStyle: "dotted",
    borderBottomWidth: 0.2,
  },
});
