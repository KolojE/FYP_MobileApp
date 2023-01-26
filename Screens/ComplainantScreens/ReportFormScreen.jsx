import React from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Modal, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from "react-native-safe-area-context";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import LocationPickerModal from "../../Modals/LocationPickerModal";
import EvidencePhoto from "../../Components/EvidencePhoto";
import * as ImagePicker from "expo-image-picker";

export default function ReportFormScreen(props) {
    const [date, setDate] = React.useState(new Date())
    const [location, setLocation] = React.useState("");
    const [openDatePicker, setOpenDatePicker] = React.useState(false)
    const [openTimePicker, setOpenTimePicker] = React.useState(false)
    const [openLocationPicker, setOpenLocationPicker] = React.useState(false);
    let submitted = false;
    React.useEffect(
        () =>
            props.navigation.addListener('beforeRemove', (e) => {
                // Prevent default behavior of leaving the screen
                e.preventDefault();
                if (submitted) { props.navigation.dispatch(e.data.action); return }
                // Prompt the user before leaving the screen
                Alert.alert(
                    'Discard changes?',
                    'You have unsaved changes. Are you sure to discard them and leave the screen?',
                    [
                        { text: "Don't leave", style: 'cancel', onPress: () => { } },
                        {
                            text: 'Save as draft',
                            style: 'destructive',
                            // If the user confirmed, then we dispatch the action we blocked earlier
                            // This will continue the action that had triggered the removal of the screen
                            onPress: () => props.navigation.dispatch(e.data.action),
                        },
                    ]
                );
            }),
        [props.navigation]
    );
    return (
        <SafeAreaView>

            <ScrollView contentContainerStyle={{ alignItems: "center", width: "100%" }}>
                <View style={{ backgroundColor: "#162147", width: "100%", alignItems: "center", paddingTop: "5%", borderBottomStartRadius: 20, borderBottomEndRadius: 20 }}><Text style={{ fontWeight: "bold", color: "white", marginBottom: "5%" }}>Report Wild Fire</Text></View>
                <View style={{ marginTop: "5%", marginBottom: "10%" }}><FontAwesome name="fire" size={50} color="black" /></View>
                <View style={{ width: "90%", marginBottom: "3%" }}>
                    <View style={{ borderBottomWidth: 2, marginBottom: "10%", borderStyle: "dashed" }}>
                        <Text style={{ fontSize: 12, textAlign: "center", fontWeight: "bold" }}>Incident Location and Date & Time</Text>
                    </View>
                    <View style={{ marginBottom: "5%" }}>
                        <Text style={{ width: "100%", fontSize: 10, color: "grey" }}>Date Of Occurence</Text>
                        <TouchableOpacity onPress={() => {
                            setOpenDatePicker(true)
                        }}>
                            <TextInput editable={false} style={{ borderBottomWidth: 0.5, fontSize: 12, color: "black" }} value={date.toDateString()} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: "5%" }}>

                        <Text style={{ width: "100%", fontSize: 10, color: "grey" }}>Time Of Occurence</Text>
                        <TouchableOpacity onPress={() => {
                            setOpenTimePicker(true)
                        }}>
                            <TextInput editable={false} style={{ borderBottomWidth: 0.5, fontSize: 12, color: "black" }} value={date.toTimeString()} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: "5%" }}>

                        <Text style={{ width: "100%", fontSize: 10, color: "grey" }}>Location</Text>
                        <TouchableOpacity onPress={() => {
                            setOpenLocationPicker(true)
                        }}>
                            <TextInput editable={false} style={{ borderBottomWidth: 0.5, fontSize: 12, color: "black" }} value={"Part of Block 3503, Jalan Teknokrat 5 ,Cyberjaya 63000"} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ width: "90%", marginBottom: "3%" }}>
                    <View style={{ borderBottomWidth: 2, marginBottom: "10%", borderStyle: "dashed" }}>
                        <Text style={{ fontSize: 12, textAlign: "center", fontWeight: "bold" }}>Details</Text>
                    </View>
                    <View style={{ marginBottom: "5%" }}>
                        <Text style={{ width: "100%", fontSize: 10, color: "grey" }}>Description</Text>
                        <TextInput style={{ borderBottomWidth: 0.5, fontSize: 12, color: "black" }} />
                    </View>
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
                            <EvidencePhoto />
                            <EvidencePhoto />
                            <EvidencePhoto />
                            <EvidencePhoto />
                        </ScrollView>
                    </View>
                </View>
                <View style={{ width: "90%", marginBottom: "3%" }}>
                    <View style={{ borderBottomWidth: 2, marginBottom: "10%", borderStyle: "dashed" }}>
                        <Text style={{ fontSize: 12, textAlign: "center", fontWeight: "bold" }}>Other Details</Text>
                    </View>
                    <View style={{ marginBottom: "5%" }}>
                        <Text style={{ width: "100%", fontSize: 10, color: "grey" }}>Suspected Violator</Text>
                        <TextInput style={{ borderBottomWidth: 0.5, fontSize: 12, color: "black" }} />
                    </View>
                    <View style={{ marginBottom: "5%" }}>
                        <Text style={{ width: "100%", fontSize: 10, color: "grey" }}>Is the event still ongoing?</Text>
                        <Picker
                            selectedValue={"Yes"}
                            onValueChange={() => { }}>
                            <Picker.Item style={{ fontSize: 12 }} label="Yes" value="Yes" />
                            <Picker.Item style={{ fontSize: 12 }} label="No" value="No" />
                        </Picker>
                    </View>
                    <View style={{ marginBottom: "5%" }}>
                        <Text style={{ width: "100%", fontSize: 10, color: "grey" }}>Critical Level</Text>
                        <Picker
                            selectedValue={"High"}
                            onValueChange={() => { }}>
                            <Picker.Item style={{ fontSize: 12 }} label="High" value="High" />
                            <Picker.Item style={{ fontSize: 12 }} label="Medium" value="Medium" />
                            <Picker.Item style={{ fontSize: 12 }} label="Low" value="Low" />
                        </Picker>
                    </View>
                    <View style={{ width: "100%", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => {
                            submitted = true;
                            props.navigation.navigate("dashBoard")
                        }} style={{ flexDirection: "row", backgroundColor: "#050e2d", justifyContent: "center", padding: 10, borderRadius: 100 }}>
                            <Text style={{ color: "white", fontWeight: "600", fontSize: 14 }}>Submit </Text>
                            <AntDesign name="check" color={"white"} size={20} style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    openDatePicker &&
                    <RNDateTimePicker
                        testID="Date Of Occurence"
                        value={date}
                        onChange={(event, date) => {
                            setDate(() => {
                                const newDate = new Date();
                                newDate.setDate(date.getDate());
                                return newDate;
                            });
                            setOpenDatePicker(false)
                        }}
                        positiveButtonLabel="Confirm"
                        maximumDate={new Date()}
                    />
                }
                {
                    openTimePicker &&
                    <RNDateTimePicker
                        testID="Date Of Occurence"
                        value={date}
                        mode={"time"}
                        onChange={(event, date) => {
                            setDate(() => {
                                const newDate = new Date();
                                newDate.setTime(date.getTime());
                                return newDate;
                            });
                            setOpenTimePicker(false)
                        }}



                    />

                }
                {
                    <Modal visible={openLocationPicker} statusBarTranslucent={true} animationType={"slide"} >
                        <LocationPickerModal
                            setOpenLocationPicker={setOpenLocationPicker} />
                    </Modal>
                }

            </ScrollView >
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

});