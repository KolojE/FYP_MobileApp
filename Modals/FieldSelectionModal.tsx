import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Text, StyleSheet, TextInput, View, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { IField, inputType } from "../types/Models/Form";
import CheckBox from "expo-checkbox";

export function FieldSelectionModal({ setModal, updateField }) {
    const [newField, setNewField] = React.useState<IField>({ label: "", inputType: inputType.Text, required: false, options: [] });
    const [selectedInputType, setSelectedInputType] = React.useState<inputType>(inputType.Text);
    const [option, setOption] = React.useState<string>("")

    const modalWindowStyle = { ...styles.modalWindow, height: selectedInputType === inputType.DropDown ? 500 : 300 }
    const onAddFieldButtonPressed = () => {
            if(newField.inputType === inputType.DropDown && newField.options.length === 0)
            {
                alert("Please add at least one option")
                return
            }

            if(newField.label === "")
            {
                alert("Please enter a label")
                return
            }
             setModal(false)
             updateField(newField)
        }
   
    return (
        <View style={styles.modalContainer}>
            <View style={modalWindowStyle}>
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
                    onValueChange={(value: inputType) => {
                        setOption("")
                        setSelectedInputType(value)
                        setNewField((prev) => ({ ...prev, inputType: value }))
                    }
                    }
                >
                    <Picker.Item label="Text" value={inputType.Text} />
                    <Picker.Item label="Time" value={inputType.Time} />
                    <Picker.Item label="Date" value={inputType.Date} />
                    <Picker.Item label="Photo" value={inputType.Photo} />
                    <Picker.Item label="Location" value={inputType.Map} />
                    <Picker.Item label="Drop Down" value={inputType.DropDown} />
                </Picker>
                {
                    selectedInputType === inputType.DropDown ?
                        <View style={{
                            width: "100%",
                            padding: 5,
                        }}>
                            <FlatList
                                data={newField.options}
                                style={{ width: "90%" }}
                                renderItem={({ item }) => <Text
                                    style={{
                                        textAlign: "center",
                                    }}>{item}</Text>}
                                keyExtractor={(item) => item}
                            />
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(text) => setOption(text)}
                            />

                            <TouchableOpacity
                                style={[styles.btn, styles.btnCancel]}
                                onPress={() => {
                                    if(option === "" || newField.options.includes(option) || option.length > 20||option===null)
                                    {
                                        alert("Please enter a valid and unique option")
                                        return
                                    }
                                    setNewField((prev) => ({ ...prev, options: [...prev.options, option] }));
                                    setOption("")
                                }}
                            >
                                <Text style={styles.btnText}>Add Option</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginLeft: "auto",
                            marginBottom: 20,
                        }}>
                            <CheckBox
                                style={{ margin: 5 }}
                                value={newField.required}
                                onValueChange={(value) => setNewField((prev) => ({ ...prev, required: value }))} />
                            <Text>Required ?</Text>
                        </View>
                }
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={[styles.btn, styles.btnCancel]}
                        onPress={() => setModal(false)}
                    >
                        <Text style={styles.btnText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, styles.btnAdd]}
                        onPress={onAddFieldButtonPressed}      
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