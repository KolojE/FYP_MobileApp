import { Entypo } from "@expo/vector-icons";
import React from "react";
import { View, Text, Modal } from "react-native";
import { deleteForm } from "../api/admin";
import { getForms } from "../api/user";



export default function Form({formID,formName, formStatus, formIcon, formCreatedOn,navigation,setModal,setForms}) {

    

    const onEditPress = ()=>{
        setModal(false);
        navigation.navigate("formBuilder",{
            formID
        })

    }

    const onDeletePress = ()=>{

    }

    const onDeleteConfirmPress= async ()=>{ 
        deleteForm(formID)
        const res = await getForms();
            setForms(res);
    }


    return (<View style={{ flexDirection: "row", width: "80%", marginTop: "5%" }}>
        <View style={{ width: "20%" }}>
            {formIcon}
        </View>
        <View >
            <View style={{ alignItems: "center", flexDirection: "row" }}>
                <Text style={{ fontWeight: "600", fontSize: 16, minWidth: "30%" }}>{formName}</Text>
                <Text style={{ fontSize: 10, paddingLeft: 10, color: "green" }}>{formStatus}</Text>
            </View>
            <Text style={{ fontSize: 10 }}>Created On: {formCreatedOn}</Text>
        </View>
        <View style={{ flexDirection: "row", alignSelf: "center", marginLeft: "auto" }}>
            <Entypo name="edit" size={20} style={{ padding: 5 }} onPress={onEditPress} />
            <Entypo name="trash" size={20} style={{ padding: 5 }} onPress={onDeleteConfirmPress} />
        </View>
    </View>)
}