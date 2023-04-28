import RNDateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Text, TextInput, TouchableOpacity, StyleSheet, View, Modal, ScrollView } from "react-native";
import { IField,inputType } from "../api/Models/Form";
import LocationPickerModal from "../Modals/LocationPickerModal";
import * as ImagePicker from "expo-image-picker";
import EvidencePhoto from "../Components/EvidencePhoto";
import { AntDesign } from "@expo/vector-icons";

export function FieldRenderer(field: IField) {
    const [datePicker, setDatePicker] = React.useState<boolean>(false);
    const [locationPicker,setLocationPicker] = React.useState<boolean>(false);
    const [date, setDate] = React.useState<Date>(new Date());

    const onDateChange = (event: Event, date: Date) => {
        setDate(date);
        setDatePicker(false);
    };

    switch (field.inputType) {
        case inputType.Text:
            return (
                <View style={styles.container}>
                    <Text style={styles.label}>{field.label}</Text>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} />
                    </View>
                </View>
            );
        case inputType.Date:
            return (
                <View style={styles.container}>
                    <Text style={styles.label}>{field.label}</Text>
                    <TouchableOpacity onPress={() => setDatePicker(true)}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                editable={false}
                                value={date.toDateString()}
                            />
                        </View>
                    </TouchableOpacity>
                    {datePicker && (
                        <RNDateTimePicker
                            testID="Time Of Occurence"
                            value={date}
                            mode={"date"}
                            positiveButtonLabel={"Confirm"}
                            negativeButtonLabel={"Cancel"}
                            onChange={(event, date) => {
                                setDate(() => { return date });
                                setDatePicker(false);
                            }}
                        />
                    )}
                </View>
            );
        case inputType.Time:
            return (
                <View style={styles.container}>
                    <Text style={styles.label}>{field.label}</Text>
                    <TouchableOpacity onPress={() => setDatePicker(true)}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                editable={false}
                                value={date.toTimeString()}
                            />
                        </View>
                    </TouchableOpacity>
                    {datePicker && (
                        <RNDateTimePicker
                            testID="Time Of Occurence"
                            value={date}
                            mode={"time"}
                            positiveButtonLabel={"Confirm"}
                            negativeButtonLabel={"Cancel"}
                            onChange={() => {
                                setDate(() => {
                                    const newDate = new Date();
                                    newDate.setTime(date.getTime());
                                    setDatePicker(false);
                                    return newDate;
                                });
                            }
                            }
                        />
                    )}
                </View>
            );
            case inputType.Map:
            return(
                <View style={styles.container}>
                    <Text style={styles.label}>{field.label}</Text>
                    <TouchableOpacity onPress={() => setLocationPicker(true)}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                editable={false}
                                value={""}
                            />
                        </View>
                    </TouchableOpacity>
                    {locationPicker&& (
                        <Modal animationType="slide">
                        <LocationPickerModal setOpenLocationPicker={setLocationPicker} />
                        </Modal>
                    )}
                </View>
            )
            case inputType.Photo:
                return (
     <View style={{ marginBottom: "5%" }}>
                        <Text style={{ width: "100%", fontSize: 10, color: "grey" }}>Photos 4/10</Text>
                        <ScrollView horizontal={true} style={{ marginTop: "3%" }} contentContainerStyle={{ alignItems: "center" }}>
                            <TouchableOpacity onPress={async () => {
                                const result = await ImagePicker.launchCameraAsync({
                                })
                            }}
                            >
                                <AntDesign name="plussquareo" size={50} color="black" style={{ height: 100, width: 100, textAlign: "center", textAlignVertical: "center" }} />
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                )

    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    label: {
        color: "grey",
        fontSize: 12,
        marginBottom: 5,
    },
    inputContainer: {
        borderBottomWidth: 0.5,
    },
    input: {
        color: "black",
        fontSize: 14,
        padding: 0,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        marginLeft: -10,
        marginRight: 10,
    },
});
