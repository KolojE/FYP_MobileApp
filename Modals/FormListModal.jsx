import React from "react";
import { View, Text, StyleSheet, ScrollView, Modal } from "react-native";
import {
    AntDesign, Entypo, FontAwesome, MaterialCommunityIcons
} from "@expo/vector-icons";
import IconTextInput from "../Components/IconTextInput";
import Form from "../Components/Form";
export default function FormListModal(props) {

    return (
        <View style={styles.searchContainer}>
            <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
                <AntDesign onPress={() => { props.setFormListModal(false) }} name="down" size={24} style={{ marginRight: "auto", marginLeft: "5%", marginTop: "5%" }} />
                <AntDesign name="plus" size={24} style={{ marginLeft: "auto", marginRight: "5%", marginTop: "5%" }} />
            </View>
            <View style={{ flexDirection: "row" }}>
                <IconTextInput icon={<Entypo name="magnifying-glass" style={{ marginRight: 10 }} />} placeholder="Search" style={styles.searchBox} />
            </View>
            <ScrollView style={{ width: "100%" }} contentContainerStyle={{ width: "100%", alignItems: 'center' }}>
                <Form formIcon={<FontAwesome name="fire" size={30} />} formName={"wild fire"} formStatus={"active"} formCreatedOn={"2023-01-03"} />
                <Form formIcon={<FontAwesome name="road" size={30} />} formName={"road crack"} formStatus={"active"} formCreatedOn={"2023-01-03"} />
                <Form formIcon={<MaterialCommunityIcons name="waterfall" size={30} />} formName={"flood"} formStatus={"active"} formCreatedOn={"2023-01-03"} />
            </ScrollView>
            <Modal visible={false}>
            </Modal>
        </View>)


}
const styles = StyleSheet.create({
    searchContainer: {
        width: "100%",
        alignItems: "center"
    },
    searchBox: {
        borderWidth: 1,
        width: "90%",
        marginTop: "5%",
        borderRadius: 100,
        paddingLeft: 10,
        paddingTop: 2,
        paddingBottom: 2,
    }
});