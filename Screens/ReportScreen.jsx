import {View,Text, StyleSheet } from "react-native"

export default function ReportScreen()
{
return(
    <View style={styles.window} >
        <Text>Report</Text>
    </View>
)
}


const styles =  StyleSheet.create(
{
    window:{
        overflow:"scroll",
        minHeight:"100%",
    }
})