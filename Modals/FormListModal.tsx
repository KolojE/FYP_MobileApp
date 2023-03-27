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
            <View style={styles.rowContainer}>
                <AntDesign onPress={() => { props.setFormListModal(false) }} name="down" size={24} style={styles.iconStyle} />
                <AntDesign onPress={() => { props.setFormListModal(false); props.navigation.navigate("formBuilder") }} name="plus" size={24} style={[styles.iconStyle, styles.iconMarginLeft]} />
            </View>
            <View style={styles.rowContainer}>
                <IconTextInput icon={<Entypo name="magnifying-glass" style={styles.iconStyle} />} placeholder="Search" style={styles.searchBox} editable={undefined} />
            </View>
            <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.scrollViewContentContainer}>
                <Form formIcon={<FontAwesome name="fire" size={30} />} formName={"wild fire"} formStatus={"active"} formCreatedOn={"2023-01-03"} />
                <Form formIcon={<FontAwesome name="road" size={30} />} formName={"road crack"} formStatus={"active"} formCreatedOn={"2023-01-03"} />
                <Form formIcon={<MaterialCommunityIcons name="waterfall" size={30} />} formName={"flood"} formStatus={"active"} formCreatedOn={"2023-01-03"} />
            </ScrollView>
            <Modal visible={false}>
            </Modal>
        </View>

    )


}
const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    rowContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: "3%",
        justifyContent: "center",
    },
    iconStyle: {

        marginRight: '3%',
    },
    iconMarginLeft: {
        marginLeft: 'auto',
    },
    searchBox: {
        flexDirection: 'row',
    },
    scrollViewContainer: {
        width: '100%',
    },
    scrollViewContentContainer: {
        width: '100%',
        alignItems: 'center',
    },
});
