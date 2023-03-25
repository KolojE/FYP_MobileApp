import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Text, StyleSheet, TextInput, View, TouchableOpacity, Dimensions } from "react-native";
import { field, type } from "../utils/formBuilder";
const { height } = Dimensions.get('window');

export function FieldSelectionModal({ setModal, updateField }) {
    const [newField, setNewField] = React.useState<field>({ label: "", Type: type.Text });
    return (
        <View style={{ ...style.modalWindow, height }}>
            <View style={style.window}>
                <TextInput placeholder="Label" style={style.formLabel} />
                <Picker placeholder="Type" style={style.picker} selectedValue={newField.Type} onValueChange={(value: type) => { setNewField((prev) => { return { ...prev, Type: value } }) }}>
                    <Picker.Item label="Text" value={type.Text} />
                    <Picker.Item label="Date" value={type.Date} />
                    <Picker.Item label="Check Box" value={type.Checkbox} />
                </Picker>
                <View style={style.btnView}>
                    <TouchableOpacity onPress={() => { setModal(false) }} style={{ ...style.btn, backgroundColor: "#eb8157" }}>
                        <Text>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { updateField(newField) }} style={{ ...style.btn, backgroundColor: "#57eb72" }}>
                        <Text>
                            Add
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )

}
const style = StyleSheet.create({
    modalWindow: {
        width: "100%",
        alignItems: "center", justifyContent: "center",
        backgroundColor: "backgroundColor: 'rgba(38, 38, 38, 0.5)'"
    },
    window: {
        width: "90%",
        height: "40%",
        padding: "5%",
        paddingTop: "15%",
        backgroundColor: "white",
        alignItems: "center",
        transform: [{ translateY: - 100 }]
    },

    formLabel: {
        borderWidth: 0.5,
        height: 40,
        padding: 10,
        width: "80%"
    },
    picker: {
        marginTop: 20,
        width: "80%",
    },
    btnView: {
        marginTop: "auto",
        width: "80%",
        alignItems: "center",
        flexDirection: "row"
    },
    btn: {
        borderWidth: 0.5,
        width: "40%",
        alignItems: "center",
        margin: 10,
        padding: 10,
    }

})