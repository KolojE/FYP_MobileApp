import React, { useMemo } from "react";
import { IReport } from "../../types/Models/Report";
import CustomMarker from "../../Components/CustomMarker";



const useReportMekerLocation = (report: IReport[], focusedIndex: number) => {


    const { markers, LatLng } = useMemo(() => {
        let newMarkers = [];
        let newLatLng = [];
        report.forEach((report, index) => {
            console.log(report.form.color, "color");
            newMarkers.push(<CustomMarker key={report._id} report={report} index={index} latitude={report.location.latitude} longitude={report.location.longitude} onMarkerPress={() => { }} animated={index == focusedIndex ? true : false} color={report.form.color} focusedLocation={0} />);
            newLatLng.push({ latitude: report.location.latitude, longitude: report.location.longitude });
        })
        return { markers: newMarkers, LatLng: newLatLng }
    }, [report, focusedIndex])

    return {
        markers,
        LatLng
    };

}

export default useReportMekerLocation;