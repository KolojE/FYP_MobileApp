import { AntDesign } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import TagSelector from "../Components/TagSelector";

export default function FilterModal(props) {

    const [fromDatePicker, setFromDatePicker] = React.useState(false);
    const [toDatePicker, setToDatePicker] = React.useState(false);

    const [fromDate, setFromDate] = React.useState<Date>();
    const [toDate, setToDate] = React.useState(new Date());
    return (

        <View style={{}}>
            <TouchableOpacity onPress={() => { props.setFilterModal(false) }} style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign name="down" size={30} style={{ padding: 20 }} />
                <Text style={{ fontSize: 26 }}>Filter</Text>
            </TouchableOpacity>
            <View style={{ alignSelf: "center" }}>
                <Text style={{ marginTop: "5%", fontSize: 16, color: "black", fontWeight: "500" }}>Select A Date Range</Text>
                <View style={{ marginTop: "5%", flexDirection: "row", alignItems: "center", borderRadius: 20, padding: 10, borderWidth: 1, width: "80%" }}>
                    <TouchableOpacity onPress={() => { setFromDatePicker(true) }} style={{ flex: 1, alignItems: "center", borderRightWidth: 1 }}>
                        <Text style={{ fontSize: 10 }}>From</Text>
                        <View >
                            <TextInput style={{ color: "black", textAlign: "center" }} placeholder="From Date" value={fromDate === undefined ? "" : fromDate.getFullYear() + " - " + fromDate.getMonth() + 1 + " - " + fromDate.getDate()} editable={false} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setToDatePicker(true) }} style={{ flex: 1, alignItems: "center" }}>
                        <Text style={{ fontSize: 10 }}>To</Text>
                        <View >
                            <TextInput style={{ color: "black", textAlign: "center" }} placeholder="To Date" value={toDate === undefined ? "" : toDate.getFullYear() + " - " + toDate.getMonth() + 1 + " - " + toDate.getDate()} editable={false} />
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={{ marginTop: "5%", fontSize: 16, color: "black", fontWeight: "500" }}>Select Tags</Text>
                <View style={{ marginTop: "10%", maxWidth: "80%" }}>
                    <Text style={{ fontSize: 10, color: "grey" }}>Report Types</Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: "5%" }}>
                        <TagSelector tagName={"Wild Fire"} style={{ borderWidth: 1, padding: 10, borderRadius: 100, }} tagValue={undefined} selected={undefined} selectedStyle={undefined} />
                    </View>
                </View>
                <View style={{ marginTop: "10%", maxWidth: "80%" }}>
                    <Text style={{ fontSize: 10, color: "grey" }}>Report Status</Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: "5%" }}>
                    </View>
                </View>
                <View style={{ marginTop: "10%", maxWidth: "80%" }}>
                    <Text style={{ fontSize: 10, color: "grey" }}>Report Serverity</Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: "5%" }}>
                    </View>
                </View>
                <Text style={{ marginTop: "5%", fontSize: 16, color: "black", fontWeight: "500" }}>Sort By</Text>
                <Picker >
                    <Picker.Item label="Serverity" />
                    <Picker.Item label="Types" />
                    <Picker.Item label="Status" />
                    <Picker.Item label="Date (Descending)" />
                    <Picker.Item label="Date (Ascending)" />
                </Picker>

            </View>
            {
                fromDatePicker &&
                <RNDateTimePicker value={new Date()}
                    onChange={(event, newDate) => {
                        setFromDatePicker(false);
                        setFromDate(() => newDate)
                    }}
                    maximumDate={toDate}

                />


            }
            {
                toDatePicker &&
                <RNDateTimePicker value={new Date()}
                    onChange={(event, newDate) => {
                        setToDatePicker(false);
                        setToDate(() => { return newDate })
                    }}

                    minimumDate={fromDate}
                    maximumDate={new Date()}
                />
            }
        </View>);
}