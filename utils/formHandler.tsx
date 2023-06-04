import RNDateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Text, TextInput, TouchableOpacity, StyleSheet, View, Modal, ScrollView, FlatList } from "react-native";
import { IField, inputType } from "../types/Models/Form";
import LocationPickerModal from "../Modals/LocationPickerModal";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { reportSubmissionSchema } from "../types/General";
import { getAddressByCoordinates } from "../api/user";
import EvidencePhoto from "../Components/EvidencePhoto";
import { uploadReportPhoto } from "../api/complainant";


type FieldRendererProps = IField & {
    setReport?: React.Dispatch<React.SetStateAction<reportSubmissionSchema>>;
}

export function FieldRenderer(field: FieldRendererProps) {

    switch (field.inputType) {
        case inputType.Text:
            return TextInputField(field);
        case inputType.Date:
            return DateInputField(field);
        case inputType.Time:
            return TimeInputField(field);
        case inputType.Map:
            return MapInputField(field);
        case inputType.Photo:
    }       return PhotoInputField(field);
}

function TextInputField({ setReport, _id, label }: FieldRendererProps) {

    const [value, setValue] = React.useState<string>("");

    React.useEffect(() => {
        setReport && setReport(prev => ({ ...prev, [_id]: value }));
    },[value])

    const onTextChange = (text: string) => {
        setValue(text);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={value} onChangeText={onTextChange} />
            </View>
        </View>
    );
}


function DateInputField({ setReport, _id, label }: FieldRendererProps) {

    const [date, setDate] = React.useState<Date>(new Date());
    const [datePicker, setDatePicker] = React.useState<boolean>(false);

    React.useEffect(() => {
        setReport && setReport(prev => ({ ...prev, [_id]: date}));
    },[date])

    const onDateChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setDate(currentDate);
        setDatePicker(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity onPress={() => setDatePicker(true)}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        editable={false}
                        value={date ? date.toDateString() : " "}
                    />
                </View>
            </TouchableOpacity>
            {datePicker && (
                <RNDateTimePicker
                    testID="Time Of Occurence"
                    value={date ? date : new Date()}
                    mode={"date"}
                    positiveButtonLabel={"Confirm"}
                    negativeButtonLabel={"Cancel"}
                    onChange={onDateChange} />
            )}
        </View>
    );
}

function TimeInputField({ setReport, _id, label }: FieldRendererProps) {

    const [time, setTime] = React.useState<Date>(new Date());
    const [datePicker, setDatePicker] = React.useState<boolean>(false);

    React.useEffect(() => {
        setReport && setReport(prev => ({ ...prev, [_id]: time}));
    },[time])

    const onTimeChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || time;
        setTime(currentDate);
        setDatePicker(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity onPress={() => setDatePicker(true)}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        editable={false}
                        value={time ? time.toTimeString() : " "}
                    />
                </View>
            </TouchableOpacity>
            {datePicker && (
                <RNDateTimePicker
                    testID="Time Of Occurence"
                    value={time ? time : new Date()}
                    mode={"time"}
                    positiveButtonLabel={"Confirm"}
                    negativeButtonLabel={"Cancel"}
                    onChange={onTimeChange}
                />
            )}
        </View>
    );
}

function MapInputField({ setReport, _id, label }: FieldRendererProps) {

    const [locationPicker, setLocationPicker] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<{ Lo: number, La: number }>();
    const [address, setAddress] = React.useState<string>("");

    React.useEffect(() => {
        setReport && setReport(prev => ({ ...prev, [_id]: value}));
    },[value])

    const onLocationChange = async ({ Lo, La }: { Lo: number, La: number }) => {
        console.log(Lo, La)
        setValue({ Lo, La });

        setAddress(await getAddressByCoordinates(La, Lo))

    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity onPress={() => { setLocationPicker(true); setValue({ Lo: 30, La: 10 }) }}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        editable={false}
                        value={address}
                    />
                </View>
            </TouchableOpacity>
            {locationPicker && (
                <Modal animationType="slide">
                    <LocationPickerModal onLocationChange={onLocationChange} setOpenLocationPicker={setLocationPicker} />
                </Modal>
            )}
        </View>
    )
}

function PhotoInputField({ setReport, _id, label }: FieldRendererProps) {

    const [selectedPhoto, setSelectedPhotos] = React.useState<ImagePicker.ImagePickerResult[]>([]);
    const [value, setValue] = React.useState<string[]>([]); // path to photo in server storage

    React.useEffect(() => {
        setReport && setReport(prev => ({ ...prev, [_id]: value}));
    },[value])

    const onAddPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            base64: true,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setSelectedPhotos((prev) => { return [...prev, result] });
            const uri = result.assets[0].uri;
            const path =await uploadReportPhoto({uri});
            setValue((prev) => { return [...prev, path] });
        }
    };

    const renderPhoto = ({ item,index }: { item: ImagePicker.ImagePickerResult,index:number }) => {
        return <EvidencePhoto base64={item.assets[0].base64} key={index} onPressedCallBack={null} />;
    }

    const numberOfPhotos = selectedPhoto?.length || 0;
    return (
        <View style={{ marginBottom: "5%" }}>
            <Text style={{ width: "100%", fontSize: 10, color: "grey" }}>{label + "," + numberOfPhotos + "/" + 10}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={onAddPhoto} style={{ height: 100, width: 100, alignItems: "center", justifyContent: "center" }} >
                    <AntDesign name="pluscircle" size={50} color="grey" style={{}} />
                </TouchableOpacity>
                <FlatList
                    data={selectedPhoto}
                    renderItem={renderPhoto}
                    style={{ width: "80%", height: 100 }}
                    horizontal
                />
            </View>
        </View>
    )

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
