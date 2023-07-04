import React from "react";
import { IReport } from "../../types/Models/Report";
import CustomMarker from "../../Components/CustomMarker";
import { LatLng } from "react-native-maps";



const useReportMekerLocation = (report: IReport[],focusedIndex:number) => {


    const [markers, setMarkers] = React.useState<JSX.Element[]>([]);
    const [LatLng, setLatLng] = React.useState<LatLng[]>([]);
    React.useEffect(() => {
    let newMarkers = [];
    let newLatLng = [];
        report.forEach((report,index) => {
            // console.log(report, "report - log from useReportMekerLocation -- ");
            newMarkers.push(<CustomMarker key={report._id} report={report} index={index} latitude={report.location.latitude} longitude={report.location.longitude} onMarkerPress={()=>{}} animated={index==focusedIndex?true:false} focusedLocation={index==focusedIndex?true:false} />);
            newLatLng.push({latitude: report.location.latitude, longitude: report.location.longitude});
            // console.log(newMarkers, "markers - log from useReportMekerLocation -- ",newMarkers.length);
        })
        setMarkers(newMarkers);
        setLatLng(newLatLng);
    }, [report,focusedIndex])

        return {
       markers,
       LatLng
    };

}

export default useReportMekerLocation;