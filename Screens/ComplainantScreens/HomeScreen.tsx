import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from "react";
import Title from "../../Components/Title"
import ProfileModal from "../../Modals/ProfileModal";
import { SafeAreaView } from "react-native-safe-area-context";
import RecentReportList from "../../Components/RecenReportList";
import { IReport } from "../../types/Models/Report";
import { Image } from "react-native";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useReports } from "../../utils/hooks/useReports";
import { filterOptions } from "../../types/General";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const [profileModal, setProfileModal] = React.useState(false);

  const userinfo = useSelector((state: RootState) => state.userinfo);
  const { user, organization, totalReportCount, totalResolvedCount } = { ...userinfo.userinfo }
  const [filter, setFilter] = React.useState<filterOptions>({
    toDate: new Date(),
    sortBy: "subDate",
  })

  const {
    reports:recentReport,
    loading,
  }= useReports({
    filter: filter,
  })


  


  const onCloseModalPressed = () => {
    setProfileModal(false);
  }

  const onForwardReportPressed = (report: IReport) => {
    navigation.navigate("Chat", { report: report });
  };

  return organization && user ? (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.window} >
        <Title title={"Dashboard"} />
        <View style={{ width: "90%", marginTop: "5%" }} >
          <Text style={{ fontSize: 10, color: "#8F8F8F" }}>Profile</Text>
          <View style={{ backgroundColor: "#b0cbde", flexDirection: "row", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center" }}>
            <View style={{ marginLeft: "5%" }}>
              {
                user.base64ProfilePicture == null ?
                <Image style={{ height: 50, width: 50, borderRadius: 100 }} source={{ uri: `data:image/jpg;base64,${user.base64ProfilePicture}` }} />:
                <MaterialCommunityIcons name="face-man-profile" size={50} color="black" />
              }
            </View>

            <View style={{ flex: 2, marginLeft: "5%" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 12 }}>{user ? user.name : ""}</Text>
                <TouchableOpacity onPress={() => {
                  setProfileModal(true);
                }}>
                  <MaterialIcons name="edit" size={12} color="black" />
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 10 }}>ID: {user ? user.ID : ""}</Text>
              <Text style={{ fontSize: 10 }}>Organization: {organization.name}</Text>
            </View>
            <View style={{ flex: 2, paddingRight: "3%" }}>
              <Text style={{ fontSize: 10 }}>Total Reports : {totalReportCount}</Text>
              <Text style={{ fontSize: 10 }}>Report Resolved: {totalResolvedCount}</Text>
            </View>
          </View>
        </View>
{
        loading ? 
        <View
        style={{
          width: "90%",
          height: "50%",
          justifyContent:"center",
          alignItems:"center"
        }}
        >
          <ActivityIndicator size="large" color="#0000ff"/> 
          </View>:
          <>
        {
          recentReport.length>0 ?
          <>
          <LatestUpdatedComponent
          latestUpdatedReport={recentReport[0]}
          />
          <RecentReportList navigation={navigation} reports={recentReport} onForwardPressed={onForwardReportPressed} />
          </>:
          <View
          style={{
            width: "90%",
            height: "50%",
            justifyContent:"center",
            alignItems:"center"
          }}
          >
            <Image 
            style={{
              width:100,
              height:100
            }}
            source={require("../../assets/no-results.png")}

            />
<Text
style={{
  fontSize:20,
  fontWeight:"700",
  color:"#8F8F8F"
}}
>
  You have no made any report yet
</Text>
          </View>
        }
        </>
      }
        <Modal statusBarTranslucent={true} visible={profileModal} animationType={"slide"}>
          <ProfileModal userInfo={userinfo.userinfo} closeModal={onCloseModalPressed} />
        </Modal>
      </ScrollView >
    </SafeAreaView>
  ) : <></>
}

export function LatestUpdatedComponent({ navigation, latestUpdatedReport }: { navigation?: any, latestUpdatedReport: IReport }) {



  return (
    <TouchableOpacity
      style={{ position: "relative", width: "90%", marginTop: "10%" }}
    >
      <View style={styles.latestUpdateContainer}>
        {latestUpdatedReport &&
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
                  {latestUpdatedReport.updateDate.toDateString()}
                </Text>
              </View>
              <View style={{ position: "absolute", right: 20 }}>
                <Text
                  style={{ fontSize: 16, color: "#F8F8F8", fontWeight: "700" }}
                >
                  {latestUpdatedReport._id}
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
                {latestUpdatedReport.form.name}
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
                {latestUpdatedReport.comment.comment}
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
              {latestUpdatedReport.status.desc}
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
