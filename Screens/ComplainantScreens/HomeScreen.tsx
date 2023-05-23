import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import {  MaterialIcons } from '@expo/vector-icons';
import React, { useEffect } from "react";
import Title from "../../Components/Title"
import ProfileModal from "../../Modals/ProfileModal";
import { SafeAreaView } from "react-native-safe-area-context";
import RecentReportList from "../../Components/RecenReportList";
import IUser from "../../api/Models/User";
import { getLoggedInUserInfo, getProfilePicture } from "../../api/user";
import IOrganization from "../../api/Models/Organization";
import { IReport } from "../../api/Models/Report";
import errorHandler from "../../api/errorHandler/axiosError";
import { getReport } from "../../api/complainant";
import { Image } from "react-native";

export default function HomeScreen({ navigation }) {

  const [profileModal, setProfileModal] = React.useState(false);
  const [loggedInUser, setLoggedInUser] = React.useState<IUser>();
  const [organization, setOrganization] = React.useState<IOrganization>();
  const [reports, setReports] = React.useState<IReport[]>([]);


  useEffect(() => {

    const getLoggedInUserInfoAsync = async () => {
      try {

        const res = await getLoggedInUserInfo()
        const profilePicture = await getProfilePicture(res.loggedInUser._id);
        setLoggedInUser({ ...res.loggedInUser, base64ProfilePicture: profilePicture});
        setOrganization(res.organization);
      } catch (e) {
        console.log(e)
      }
    }
    getLoggedInUserInfoAsync();

    const setReportsAsync = async () => {
      setReports(await getReport({limit:5,sortBy:"subDate"}));
    }
    setReportsAsync();
  }, [])






  return organization && loggedInUser ? (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.window} >
        <Title title={"Dashboard"} />
        <View style={{ width: "90%", marginTop: "5%" }} >
          <Text style={{ fontSize: 10, color: "#8F8F8F" }}>Profile</Text>
          <View style={{ backgroundColor: "#b0cbde", flexDirection: "row", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center" }}>
            <View style={{ marginLeft: "5%" }}>
               <Image style={{height:50,width:50,borderRadius:100}} source={{uri:`data:image/jpg;base64,${loggedInUser.base64ProfilePicture}`}} />
            </View>

            <View style={{ flex: 2, marginLeft: "5%" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 12 }}>{loggedInUser ? loggedInUser.name : ""}</Text>
                <TouchableOpacity onPress={() => {
                  setProfileModal(true);
                }

                }>
                  <MaterialIcons name="edit" size={12} color="black" />
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 10 }}>ID: {loggedInUser ? loggedInUser.ID : ""}</Text>
              <Text style={{ fontSize: 10 }}>Organization: {organization.name}</Text>
            </View>
            <View style={{ flex: 2, paddingRight: "3%" }}>
              <Text style={{ fontSize: 10 }}>Total Reports : {reports?.length}</Text>
              <Text style={{ fontSize: 10 }}>Report Resolved: 10</Text>
            </View>
          </View>
        </View>
        <LatestUpdatedComponent />
        {
          reports &&
          <RecentReportList navigation={navigation} reports={reports} />
        }
        <Modal statusBarTranslucent={true} visible={profileModal} animationType={"slide"}>
          <ProfileModal user={loggedInUser} setUser={setLoggedInUser} setProfileModal={setProfileModal} editable={false} />
        </Modal>
      </ScrollView >
    </SafeAreaView>
  ) : <></>
}

export function LatestUpdatedComponent() {

  const [lastestUpdatedReprot, setLastestUpdatedReport] = React.useState<IReport>();
  React.useEffect(() => {
    getReport({ limit: 1, sortBy: "upDate" }).then((res) => {
      setLastestUpdatedReport(res[0]);
    }, (err) => {
      errorHandler(err);
    })
  }, [])


  return (
    <TouchableOpacity
      style={{ position: "relative", width: "90%", marginTop: "10%" }}
    >

      <View style={styles.latestUpdateContainer}>
        {lastestUpdatedReprot &&
          <>
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
                  {lastestUpdatedReprot.updateDate.toDateString()}
                </Text>
              </View>
              <View style={{ position: "absolute", right: 20 }}>
                <Text
                  style={{ fontSize: 16, color: "#F8F8F8", fontWeight: "700" }}
                >
                  {lastestUpdatedReprot._id}
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
                {lastestUpdatedReprot.name}
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
                {lastestUpdatedReprot.comment}
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
              {lastestUpdatedReprot.status}
            </Text>
          </>
        }
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  window: {
    minHeight: "100%",
    alignItems: "center",
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
  informationRow: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: "grey",
    borderStyle: "dotted",
    borderBottomWidth: 0.2,
  },
});
