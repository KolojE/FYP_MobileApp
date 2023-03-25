import RNDateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Text, TextInput, TouchableOpacity, StyleSheet, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";

export enum type {
    Text,
    Date,
    Time,
    Checkbox
}


export type field = {
    label: String,
    Type: type,
}



export function FieldRenderer(field: field) {
    const [datePikcer, setDatePicker] = React.useState<boolean>(false);
    const [date, setDate] = React.useState<Date>(new Date());
    switch (field.Type) {
        case type.Text:
            return (
                <View>
                    <Text>{field.label}</Text>
                    <TextInput>
                    </TextInput>
                </View>
            );
        case type.Date:
            return (
                <>

                    <View style={{ marginBottom: "5%" }}>
                        <Text style={{ width: "100%", fontSize: 10, color: "grey" }}>{field.label}</Text>
                        <TouchableOpacity onPress={() => {
                            setDatePicker(true);
                        }}>
                            <TextInput editable={false} style={{ borderBottomWidth: 0.5, fontSize: 12, color: "black" }} value={date.toDateString()} />
                        </TouchableOpacity>
                    </View>
                    {
                        datePikcer &&
                        <RNDateTimePicker
                            value={date}
                            display={"calendar"}
                            mode={"date"}
                            onChange={(event, date) => {
                                setDate(() => { return date });
                            }}
                        />

                    }

                </>
            )
        case type.Time:
            return (
                <>


                    <View style={{ marginBottom: "5%" }}>
                        <Text style={{ width: "100%", fontSize: 10, color: "grey" }}>{field.label}</Text>
                        <TouchableOpacity onPress={() => {
                            setDatePicker(true);
                        }}>
                            <TextInput editable={false} style={{ borderBottomWidth: 0.5, fontSize: 12, color: "black" }} value={date.toDateString()} />
                        </TouchableOpacity>
                    </View>
                    {
                        datePikcer &&
                        <RNDateTimePicker
                            testID="Time Of Occurence"
                            value={date}
                            mode={"time"}
                            onChange={(event, date) => {
                                setDate(() => {
                                    const newDate = new Date();
                                    newDate.setTime(date.getTime());
                                    return newDate;
                                });
                            }}

                        />

                    }

                </>
            )
        case type.Checkbox:
            return (
                <>
                    <Text style={{ width: "100%", fontSize: 10, color: "grey" }}>{field.label}</Text>
                    <View >
                        <View>
                            <CheckBox
                            />
                        </View>
                    </View>
                </>
            )
    }

}

const styles = StyleSheet.create({
    CheckBox: {

    }
})

