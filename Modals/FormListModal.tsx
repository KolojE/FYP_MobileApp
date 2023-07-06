import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
    AntDesign, Entypo
} from "@expo/vector-icons";
import IconTextInput from "../Components/IconTextInput";
import IForm from "../types/Models/Form";
import { getForms } from "../api/user";
import Form from "../Components/Form";

export default function FormListModal(props) {


    const [forms, setForms] = React.useState<IForm[]>([]);
    const [formListElement, setFormListelement] = React.useState<JSX.Element[]>([]);

    useEffect(() => {
        getForms().then((res) => {
                        setForms(res);
        });
    }, [])

    useEffect(() => {
        setFormListelement(forms.map((res, index) => {
            const creationDate = new Date(res.creationDate);
            return <Form key={index} formID={res._id} formName={res.name} formStatus={res.activation_Status} formIcon={null} formCreatedOn={creationDate.toLocaleDateString()} navigation={props.navigation} setModal={props.setFormListModal} setForms={setForms} />
        }))
    }, [forms])

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
            </View>

            <View style={styles.rowContainer}>
                <AntDesign onPress={() => { props.setFormListModal(false) }} name="down" size={24} style={styles.iconStyle} />
                <AntDesign onPress={() => { props.setFormListModal(false); props.navigation.navigate("formBuilder"); }} name="plus" size={24} style={[styles.iconStyle, styles.iconMarginLeft]} />
            </View>
            <View style={styles.rowContainer}>
                <IconTextInput icon={<Entypo name="magnifying-glass" style={styles.iconStyle} />} placeholder="Search" viewContainerStyle={styles.searchBox} editable={undefined} />
            </View>
            <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.scrollViewContentContainer}>
                {formListElement.length > 0 && formListElement}
            </ScrollView>
        </View>

    )


}
const styles = StyleSheet.create({
    container:{
        width:"100%",
        alignItems:"center"
    }
    ,
    searchContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'center',
        width: '90%',
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
