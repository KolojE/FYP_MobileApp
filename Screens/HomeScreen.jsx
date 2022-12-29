import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import RecentReport from "../Components/RecentReport";



const LatestUpdated = { report_id: "R011024", report_title: "WildFire", report_serverity: "Critical", report_Status: "Resolved", report_update_details: "The status changed to resolved " }

export default function HomeScreen() {
    return (
        <ScrollView contentContainerStyle={styles.window}r>

            <View style={styles.titleContainer}>
                <Text style={{ fontWeight: "bold", fontSize: 24 }}>Dashboard</Text>
            </View>
            <TouchableOpacity style={{ position: "relative", width: "90%", marginTop:"10%"}}>
                <View style={styles.latestUpdateContainer} >
                    <View style={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
                        <View style={{ paddingLeft: 14 }}>
                            <Text style={{ color: "white", fontWeight: "700", fontSize: 10, paddingTop: 12, paddingBottom: 3 }}>Latest Update</Text>
                            <Text style={{ fontSize: 8, color: "#f8f8f8" }}>20 jan 2022 08:31</Text>
                        </View>
                        <View style={{ position: "absolute", right: 20 }}>
                            <Text style={{ fontSizea: 16, color: "#F8F8F8", fontWeight: "700" }}>#R0112204</Text>
                        </View>
                    </View>
                    <View style={{ paddingLeft: 14, paddingTop: 10, paddingBottom: 40 }}>
                        <Text style={{ color: "#F8F8F8", fontWeight: "700", fontSize: 16, paddingBottom: 10 }}>WirldFire</Text>
                        <Text style={{ color: "#F8F8F8", fontWeight: "500", fontSize: 11, paddingRight: 10, minHeight: 80 }}>The issue has been resolved and consider as save</Text>
                    </View>
                    <Text style={{ position: "absolute", bottom: 12, right: 20, color: "#45FF4C" }}>Resolved</Text>
                </View>

            </TouchableOpacity>

            <View style={{width:"85%",marginTop:50,marginBottom:5,flexDirection:"row"}}>
                <Text style={{fontSize:10,color:"#8F8F8F"}}>Recent Reports</Text>
                <TouchableOpacity style={{marginLeft:"auto"}}>
                <Text style={{fontSize:10,color:"blue"}}>See All</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.recentReportsContainer}>
                <RecentReport/>
                <RecentReport/>
                <RecentReport/>
                <RecentReport/>
                <RecentReport/>
            </View>

        </ScrollView>

    )
}

const styles = StyleSheet.create(
    {

        window: {
            overflow: "scroll",
            minHeight: "100%",
            alignItems: "center",
        }
        ,
        titleContainer: {
            width: "90%",
            marginTop: "15%",


        },
        latestUpdateContainer:
        {
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
            backgroundColor: "#497CFF",

        },
        latestDetailsText:
        {
            width: "40%",
            fontSize: 10,
        },
        latestDeailsInfoText:
        {
            fontWeight: "bold",
            flexWrap: "wrap",
            maxWidth: "60%",
            fontSize: 10,
        },
        recentReportsContainer:
        {
            marginTop: 5,
            marginBottom: 10,
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
        informationRow:
        {
            flexDirection: "row",
            paddingTop: 10,
            paddingBottom: 10,
            borderBottomColor: "grey",
            borderStyle: "dotted",
            borderBottomWidth: 0.2
        }
    }
)

