import { AntDesign } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import TagSelector from "../Components/TagSelector";
import { ReprotElement, getReportElement } from "../api/admin";
import { filterOptions } from "../types/General";
import { useReportAction } from "../actions/reportAction";



type FilterModalProps = {
    setFilterModal: React.Dispatch<React.SetStateAction<boolean>>,
}


export default function FilterModal({ setFilterModal }: FilterModalProps) {

    const [fromDatePicker, setFromDatePicker] = React.useState(false);
    const [toDatePicker, setToDatePicker] = React.useState(false);

    const [filterOptions, setFilterOptions] = React.useState<filterOptions>({ toDate: new Date(), typeIDs: [], statusIDs: [], sortBy: "subDate" })

    const [filterElement, setFilterElement] = React.useState<ReprotElement>({ status: [], type: [] })
    const [typeTag, setTypeTag] = React.useState<JSX.Element[]>([]);
    const [statusTag, setStatusTag] = React.useState<JSX.Element[]>([]);

    const adminAction = useReportAction();
    React.useEffect(() => {

        const getReportElementAsync = async () => {
            const res = await getReportElement({ includeStatus: true, includeType: true });
            setFilterElement((prev) => { return { status: res.status, type: res.type } })
        }

        getReportElementAsync();
    }, [])



    React.useEffect(() => {
        setTypeTag(
            filterElement.type.map((type, index) => {
                return <TagSelector key={index} onSelect={onTypeTagSelect} tagName={type.name} tagValue={type._id} />
            })
        )
        setStatusTag(
            filterElement.status.map((status, index) => {
                return <TagSelector key={index} onSelect={onStatusTagSelect} tagName={status.desc} tagValue={status._id} />
            })
        )
        console.log(filterElement.type)
    }, [filterElement])


    const onFilterButtonPressed = () => {
        setFilterModal(false);
        adminAction.fetchReportGroupedByTypeCustom(filterOptions)
    }

    const onSortPickerChange = (itemValue: "subDate" | "upDate", itemIndex: number) => {
        setFilterOptions((prev) => { return { ...prev, sortBy: itemValue } })
    }

    const onFromDateChange = (event: any, selectedDate: Date | undefined) => {
        setFromDatePicker(false);
        setFilterOptions((prev) => { return { ...prev, fromDate: selectedDate } })
    }
    const onToDateChange = (event: any, selectedDate: Date | undefined) => {
        setToDatePicker(false);
        setFilterOptions((prev) => { return { ...prev, toDate: selectedDate } })
    }

    const onTypeTagSelect = (typeID: string, selected) => {

        if (selected) {
            setFilterOptions((prev) => { return { ...prev, typeIDs: [...prev.typeIDs, typeID] } })
            return
        }

        setFilterOptions((prev) => { return { ...prev, typeIDs: prev.typeIDs.filter((id) => { return id !== typeID }) } })
    }
    const onStatusTagSelect = (statusID: string, selected) => {
        if (selected) {
            setFilterOptions((prev) => { return { ...prev, statusIDs: [...prev.statusIDs, statusID] } })
            return
        }

        setFilterOptions((prev) => { return { ...prev, statusIDs: prev.statusIDs.filter((id) => { return id !== statusID }) } })
    }
        console.log(filterOptions)

    return (

        <ScrollView style={{}}>
            <TouchableOpacity onPress={() => { setFilterModal(false) }} style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign name="down" size={30} style={{ padding: 20 }} />
                <Text style={{ fontSize: 26 }}>Filter</Text>
            </TouchableOpacity>
            <View style={{ alignSelf: "center" }}>
                <Text style={{ marginTop: "5%", fontSize: 16, color: "black", fontWeight: "500" }}>Select A Date Range</Text>
                <View style={{ marginTop: "5%", flexDirection: "row", alignItems: "center", borderRadius: 20, padding: 10, borderWidth: 1, width: "80%" }}>
                    <TouchableOpacity onPress={() => { setFromDatePicker(true) }} style={{ flex: 1, alignItems: "center", borderRightWidth: 1 }}>
                        <Text style={{ fontSize: 10 }}>From</Text>
                        <View >
                            <TextInput style={{ color: "black", textAlign: "center" }} placeholder="From Date" value={filterOptions.fromDate === undefined ? "" : filterOptions.fromDate.getFullYear() + " - " + Number(filterOptions.fromDate.getMonth() + 1) + " - " + filterOptions.fromDate.getDate()} editable={false} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setToDatePicker(true) }} style={{ flex: 1, alignItems: "center" }}>
                        <Text style={{ fontSize: 10 }}>To</Text>
                        <View >
                            <TextInput style={{ color: "black", textAlign: "center" }} placeholder="To Date" value={filterOptions.toDate === undefined ? "" : filterOptions.toDate.getFullYear() + " - " + Number(filterOptions.toDate.getMonth() + 1) + " - " + filterOptions.toDate.getDate()} editable={false} />
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={{ marginTop: "5%", fontSize: 16, color: "black", fontWeight: "500" }}>Select Tags</Text>
                <View style={{ marginTop: "10%", maxWidth: "80%" }}>
                    <Text style={{ fontSize: 10, color: "grey" }}>Report Types</Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: "5%" }}>
                        {typeTag}
                    </View>
                </View>
                <View style={{ marginTop: "10%", maxWidth: "80%" }}>
                    <Text style={{ fontSize: 10, color: "grey" }}>Report Status</Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: "5%" }}>
                        {statusTag}
                    </View>
                </View>
                <Text style={{ marginTop: "5%", fontSize: 16, color: "black", fontWeight: "500" }}>Sort By</Text>
                <Picker onValueChange={onSortPickerChange} >
                    <Picker.Item label="Submission Date (Descending)" value={"subDate"} />
                    <Picker.Item label="Submission Date (Ascending)" value={"subDate"} />
                    <Picker.Item label="UP Date (Descending)" value={"upDate"} />
                    <Picker.Item label="UP Date (Ascending)" value={"upDate"} />
                </Picker>

            </View>
            <View style={{ alignSelf: "center", marginTop: "20%" }}>
                <TouchableOpacity onPress={onFilterButtonPressed} style={{ backgroundColor: "#89CFF0", padding: 5, paddingHorizontal: 20, borderRadius: 20 }}>
                    <Text style={{ fontSize: 20 }}>Filter</Text>
                </TouchableOpacity>
            </View>
            {
                fromDatePicker &&
                <RNDateTimePicker value={new Date()}
                    maximumDate={filterOptions.toDate}
                    onChange={onFromDateChange}
                />


            }
            {
                toDatePicker &&
                <RNDateTimePicker value={new Date()}
                    minimumDate={filterOptions.fromDate}
                    maximumDate={new Date()}
                    onChange={onToDateChange}
                />
            }
        </ScrollView>);
}