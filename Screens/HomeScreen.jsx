import { StyleSheet, View, Text, Touchable, TouchableOpacity } from "react-native";



const LatestUpdated = {report_id:"R011024",report_title:"WildFire",report_serverity:"Critical",report_Status:"Resolved",report_update_details:"The status changed to resolved "} 

export default function HomeScreen() {
    return (
        <View style={styles.window}>
            <View style={styles.latestUpdateContainer} >
                <View style={styles.latestUpdateContainerHeader}>
                    <Text>Latest Update</Text>
                    <Text style={{fontSize:8}}>Last Update: 2020-10-20 08:31</Text>
                </View>
                <View style={styles.latestUpdateDetailsContainer}>
                    <View style={styles.latestUpdateDetailsTextContainer}>
                    <Text style={styles.latestDetailsText}>Report ID :</Text><Text  style={styles.latestDeailsInfoText}>{LatestUpdated.report_id}</Text>
                    </View>
                    <View style={styles.latestUpdateDetailsTextContainer}>
                    <Text style={styles.latestDetailsText}>Report Title:</Text><Text style={styles.latestDeailsInfoText}>{LatestUpdated.report_title}</Text>
                    </View>
                    <View style={styles.latestUpdateDetailsTextContainer}>
                    <Text style={styles.latestDetailsText}>Report Serverity:</Text><Text style={styles.latestDeailsInfoText}>{LatestUpdated.report_serverity}</Text>
                    </View>
                    <View style={styles.latestUpdateDetailsTextContainer}>
                    <Text style={styles.latestDetailsText}>Report Status:</Text><Text style={{...styles.latestDeailsInfoText,color:"green"}}>{LatestUpdated.report_Status}</Text>
                    </View>
                    <View style={{...styles.latestUpdateDetailsTextContainer,maxHeight:100}}>
                    <Text style={styles.latestDetailsText}>Report Update log:</Text><Text style={{...styles.latestDeailsInfoText}}>{LatestUpdated.report_update_details}</Text>
                    </View>

                    <TouchableOpacity style={styles.openReportBtn}>
                    <Text style={{fontSize:12}}>Open Report</Text>
                    </TouchableOpacity>
                </View>
            </View>

        <Text style={{marginTop:20,fontWeight:"bold",fontSize:20}}>Informations</Text>
        <View style={styles.informationContainer}>
        <Text>Ng Wen Sing</Text>
        </View>
        </View>

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
        latestUpdateContainer:
        {
            marginTop: "20%",
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

        },
        latestUpdateContainerHeader:
        {
            backgroundColor: "#89CFF0",
            height: 50,
            borderTopStartRadius: 15,
            borderTopEndRadius: 15,
            alignItems: "center",
            justifyContent: "center",
        },
        latestUpdateDetailsContainer:
        {
            padding:12,
            width:"100%"
        }
        ,
        latestUpdateDetailsTextContainer:
        {
            color:"grey",
            paddingTop:4,
            paddingBottom:4,
            fontSize:11,
            width:"100%",
            flexDirection:"row"
            
        },
        latestDetailsText:
        {
            width:"40%",
            fontSize:10,
        },
        latestDeailsInfoText:
        {
            fontWeight:"bold",
            flexWrap:"wrap",
            maxWidth:"60%",
            fontSize:10,
        }
        ,openReportBtn:
        {
            padding:10,
            margin:10,
            backgroundColor:"#4d8ef7",
            alignItems:"center",
            borderRadius:10,
        },
        informationContainer:
        {
            marginTop: 15,
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
        }
    }
)

