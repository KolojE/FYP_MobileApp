import { Entypo } from "@expo/vector-icons";
import React from "react";
import { View, Text, Modal } from "react-native";
import { getForms } from "../api/user";
import IForm from "../types/Models/Form";

type FormProps = {
    form:IForm,
    closeModal:()=>void,
    onDeletePress:(formID:string)=>void,
    navigation:any,

}

export default function Form({form,closeModal,onDeletePress,navigation}:FormProps) {

    

    const onEditPress = ()=>{
        closeModal();
        navigation.navigate("formBuilder",{
            formID:form._id
        })

    }

    const oDeleteButtonPressed= async ()=>{ 
        onDeletePress(form._id);
    }


    return (<View style={{ flexDirection: "row", width: "80%", marginTop: "5%" }}>
        <View style={{ width: "20%" }}>
            {null}
        </View>
        <View >
            <View style={{ alignItems: "center", flexDirection: "row" }}>
                <Text style={{ fontWeight: "600", fontSize: 16, minWidth: "30%" }}>{form.name}</Text>
            </View>
            <Text style={{ fontSize: 10 }}>Created On: {new Date(form.creationDate).toDateString()}</Text>
        </View>
        <View style={{ flexDirection: "row", alignSelf: "center", marginLeft: "auto" }}>
            <Entypo name="edit" size={20} style={{ padding: 5 }} onPress={onEditPress} />
            <Entypo name="trash" size={20} style={{ padding: 5 }} onPress={oDeleteButtonPressed} />
        </View>
    </View>)
}