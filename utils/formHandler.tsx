import RNDateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Text, TextInput, TouchableOpacity, StyleSheet, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";

export enum type {
    Text = "Text",
    Date = "Date",
    Time = "Time",
    Checkbox = "Checkbox",

}


export type field = {
    label: String,
    Type: type,
}


export function FieldRenderer(field: field) {
    const [datePicker, setDatePicker] = React.useState<boolean>(false);
    const [date, setDate] = React.useState<Date>(new Date());

    const onDateChange = (event: Event, date: Date) => {
        setDate(date);
        setDatePicker(false);
    };

    switch (field.Type) {
        case type.Text:
            return (
                <View style={styles.container}>
                    <Text style={styles.label}>{field.label}</Text>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} />
                    </View>
                </View>
            );
        case type.Date:
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
        case type.Time:
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
        case type.Checkbox:
            return (
                <View style={[styles.container, styles.checkboxContainer]}>
                    <View style={styles.checkbox}>
                        <CheckBox />
                    </View>
                    <Text style={styles.label}>{field.label}</Text>
                </View>
            );

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
