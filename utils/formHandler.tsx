import RNDateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Text, TextInput, TouchableOpacity, StyleSheet, View, Modal, ScrollView, FlatList } from "react-native";
import { IField, inputType } from "../api/Models/Form";
import LocationPickerModal from "../Modals/LocationPickerModal";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import EvidencePhoto from "../Components/EvidencePhoto";
import { uploadReportPhoto } from "../api/complainant";

type FieldRendererProps = IField & {
    setReport?: any;
}

export function FieldRenderer(field: FieldRendererProps) {
    const [datePicker, setDatePicker] = React.useState<boolean>(false);
    const [locationPicker, setLocationPicker] = React.useState<boolean>(false);
    const [selectedPhoto, setSelectedPhotos] = React.useState<any>(null);
    const [value, setValue] = React.useState<any>(null);


    if (field?.setReport)
        React.useEffect(() => {
            field?.setReport((prev) => { return { ...prev, [field._id]: value } })
        }, [value])

    const onDateChange = (event, date: Date) => {

        setValue(date);
        setDatePicker(false);
    };

    const onTimeChange = (event, time: Date) => {
        setValue(() => {
            const newDate = new Date();
            newDate.setTime(time.getTime());
            return newDate;
        });

        setDatePicker(false);

    }

    const onTextChange = (text) => {
        setValue(text);
    }
    const onLocationChange = ({ La, Lo }) => {
        setValue({ La: 123, Lo: 123 })
    }

    const onAddPhoto = async () => {

        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            base64: true,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (image.canceled) {
            return;
        }
        const filePath = await uploadReportPhoto({uri:image.assets[0].uri})
        console.log(filePath)
        if (!value && !selectedPhoto) {
            setSelectedPhotos([image.assets[0]])
            setValue([filePath])
            return;
        }


        setValue((prev) => [...prev, filePath])
        setSelectedPhotos((prev) => [...prev,image.assets[0]])
    }


    function renderPhoto({item,index}) {
        return <EvidencePhoto base64={item.base64} key={index} onPressedCallBack={null} />
        
    }

    switch (field.inputType) {
        case inputType.Text:
            const text = value as string
            return (
                <View style={styles.container}>
                    <Text style={styles.label}>{field.label}</Text>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} value={text} onChangeText={onTextChange} />
                    </View>
                </View>
            );
        case inputType.Date:
            const date = value as Date
            return (
                <View style={styles.container}>
                    <Text style={styles.label}>{field.label}</Text>
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
        case inputType.Time:
            const time = value as Date
            return (
                <View style={styles.container}>
                    <Text style={styles.label}>{field.label}</Text>
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
                            value={date ? date : new Date()}
                            mode={"time"}
                            positiveButtonLabel={"Confirm"}
                            negativeButtonLabel={"Cancel"}
                            onChange={onTimeChange}
                        />
                    )}
                </View>
            );
        case inputType.Map:
            return (
                <View style={styles.container}>
                    <Text style={styles.label}>{field.label}</Text>
                    <TouchableOpacity onPress={() => { setLocationPicker(true); setValue({ Lo: 30, La: 10 }) }}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                editable={false}
                                value={value ? value : " "}
                            />
                        </View>
                    </TouchableOpacity>
                    {locationPicker && (
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
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <TouchableOpacity onPress={onAddPhoto} style={{height:100,width:100,alignItems:"center",justifyContent:"center"}} >
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
