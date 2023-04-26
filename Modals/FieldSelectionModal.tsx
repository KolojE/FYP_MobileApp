import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Text, StyleSheet, TextInput, View, TouchableOpacity, Dimensions } from "react-native";
import { IField, inputType } from "../api/Models/Form";

export function FieldSelectionModal({ setModal, updateField }) {
    const [newField, setNewField] = React.useState<IField>({ label: "", inputType: inputType.Text,required:true });

    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalWindow}>
                <Text style={styles.title}>New Field</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Label"
                    onChangeText={(newLabel) =>
                        setNewField((prev) => ({ ...prev, label: newLabel }))
                    }
                />
                <Picker
                    style={styles.picker}
                    selectedValue={newField.inputType}
                    onValueChange={(value: inputType) =>

                        setNewField((prev) => ({ ...prev, inputType: value }))
                    }
                >
                    <Picker.Item label="Text" value={inputType.Text} />
                    <Picker.Item label="Date" value={inputType.Date} />
                </Picker>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={[styles.btn, styles.btnCancel]}
                        onPress={() => setModal(false)}
                    >
                        <Text style={styles.btnText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, styles.btnAdd]}
                        onPress={() => updateField(newField)}
                    >
                        <Text style={styles.btnText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalWindow: {
        width: "80%",
        height: 300,
        borderRadius: 10,
        backgroundColor: "white",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        width: "100%",
        height: 40,
        padding: 10,
        marginBottom: 20,
    },
    picker: {
        width: "100%",
        height: 40,
        marginBottom: 20,
    },
    btnContainer: {
        flexDirection: "row",
    },
    btn: {
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
    },
    btnCancel: {
        backgroundColor: "gray",
        marginRight: 10,
    },
    btnAdd: {
        backgroundColor: "green",
    },
    btnText: {
        color: "white",
    },
});