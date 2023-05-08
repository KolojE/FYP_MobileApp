import { AntDesign } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import TagSelector from "../Components/TagSelector";
import { ReportGroupedByType, ReprotElement, getReportElement, getReportGroupedByType } from "../api/admin";

type WeeklyReport = {
    offset: number;
    reports: ReportGroupedByType[];
}

type Info = {
    dateRange: string;
    totalReport: number;

}

type FilterModalProps = {
    setFilterModal:React.Dispatch<React.SetStateAction<boolean>>,
    setReport:React.Dispatch<React.SetStateAction<WeeklyReport>>,
    setInfo:React.Dispatch<React.SetStateAction<Info>>
}


export default function FilterModal({setFilterModal,setReport,setInfo}:FilterModalProps) {

    const [fromDatePicker, setFromDatePicker] = React.useState(false);
    const [toDatePicker, setToDatePicker] = React.useState(false);

    const [fromDate, setFromDate] = React.useState<Date>();
    const [toDate, setToDate] = React.useState(new Date());
    const [typeTagIDs,setTypeTagIDs] = React.useState([])
    const [statusTagIDs,setStatusTagIDs] = React.useState([])

    const [filterElement,setFilterElement] = React.useState<ReprotElement>({status:[],type:[]})

    const [typeTag,setTypeTag] = React.useState<JSX.Element[]>([]);
    const [statusTag,setStatusTag] = React.useState<JSX.Element[]>([]);

    React.useEffect(()=>{
        getReportElement({includeStatus:true,includeType:true})
        .then((res)=>{
            setFilterElement((prev)=>{return {status:res.status,type:res.type}})
        },
        ()=>{})
    },[])



    React.useEffect(()=>{
        setTypeTag(
            filterElement.type.map((type,index)=>{
                return <TagSelector key={index} setValue={setTypeTagIDs} tagName={type.name} tagValue={type._id}  />
        })
        )
        setStatusTag(
            filterElement.status.map((status,index)=>{
                return <TagSelector key={index} setValue={setStatusTagIDs} tagName={status.desc} tagValue={status._id}   />
        })
        )
        console.log(filterElement.type)
    },[filterElement])


    const onFilterButtonPressed=()=>{

        getReportGroupedByType({sortBy:"subDate",dateRange:{fromDate:fromDate,toDate:toDate},status:statusTagIDs,type:typeTagIDs}
        ).then((res)=>{
            setReport({
                reports:res,
                offset:0
            })
            setFilterModal(false);
            setInfo({
                dateRange:`${fromDate.toDateString()} -${toDate.toDateString()}`,
                totalReport:res.length,
            })
        })
    }   


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
                            <TextInput style={{ color: "black", textAlign: "center" }} placeholder="From Date" value={fromDate === undefined ? "" : fromDate.getFullYear() + " - " + Number(fromDate.getMonth()+1)+ " - " + fromDate.getDate()} editable={false} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setToDatePicker(true) }} style={{ flex: 1, alignItems: "center" }}>
                        <Text style={{ fontSize: 10 }}>To</Text>
                        <View >
                            <TextInput style={{ color: "black", textAlign: "center" }} placeholder="To Date" value={toDate === undefined ? "" : toDate.getFullYear() + " - " + Number(toDate.getMonth()+1) + " - " + toDate.getDate()} editable={false} />
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
                <Picker >
                    <Picker.Item label="Serverity" />
                    <Picker.Item label="Types" />
                    <Picker.Item label="Status" />
                    <Picker.Item label="Date (Descending)" />
                    <Picker.Item label="Date (Ascending)" />
                </Picker>

            </View>
            <View style={{alignSelf:"center",marginTop:"20%"}}>
                <TouchableOpacity onPress={onFilterButtonPressed} style={{backgroundColor:"#89CFF0",padding:5,paddingHorizontal:20,borderRadius:20}}>
                    <Text style={{fontSize:20}}>Filter</Text>
                </TouchableOpacity>
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
        </ScrollView>);
}