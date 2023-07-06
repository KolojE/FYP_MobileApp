import { Entypo, FontAwesome } from "@expo/vector-icons";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { TouchableOpacity, View, Text, Modal,StyleSheet } from "react-native";
import MapView from "react-native-maps";
import FadeInView from "./FadeInView";
import { IReport } from "../types/Models/Report";
import useReportMekerLocation from "../utils/hooks/useReportMarkerLocation";

type MapViewWithReportMarkerHandle = {
    fitToCoordinates:()=>void
    resetCamera:()=>void
}

type MapViewWithReportMarkerProps = {
    onReportCardPress: (report: IReport) => void
    reports: IReport[]
}

const MapViewWithReportMarker :React.ForwardRefRenderFunction<MapViewWithReportMarkerHandle, MapViewWithReportMarkerProps> =  
function MapViewWithReportMarker({ onReportCardPress,reports}: MapViewWithReportMarkerProps,ref) {

    const [focusedLocationIndex, setFocusedLocationIndex] = useState<number>(-1)
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const {markers,LatLng} = useReportMekerLocation(reports, focusedLocationIndex )
    const mapRef = useRef<MapView>(null)


    const onNextPressed = () => {
                if (focusedLocationIndex >= reports.length - 1) {
            return
        }
        setFocusedLocationIndex(prev => prev + 1)
        setIsFocused(true)
    }
    const onPreviousPressed = () => {
        if (focusedLocationIndex <= 0) {
            return
        }
        setFocusedLocationIndex(prev => prev - 1)
        setIsFocused(true)
    }

    const fitToCoordinates = () => {

        mapRef.current?.fitToCoordinates(LatLng, {
            edgePadding: {
                top: 50,
                right: 50,
                bottom: 50,
                left: 50
            },
            animated: true
        })

    }

    const resetCamera = () => {
        setIsFocused(false)
        setFocusedLocationIndex(-1)
        fitToCoordinates()
    }

    useImperativeHandle(ref, () => ({
        fitToCoordinates,
        resetCamera
    }))


    useEffect(() => {

        if (focusedLocationIndex < LatLng.length && focusedLocationIndex >= 0 && LatLng.length && isFocused) {
            mapRef.current?.animateToRegion({
                latitude: LatLng[focusedLocationIndex].latitude + 0.0015,
                longitude: LatLng[focusedLocationIndex].longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            })
            return
        }

                if (LatLng.length <= 1 && LatLng.length > 0) {
            mapRef.current?.animateToRegion({
                latitude: LatLng[0].latitude,
                longitude: LatLng[0].longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            })
            return

        }
        fitToCoordinates()

    }, [markers, LatLng, focusedLocationIndex, isFocused])


    return (<>
        <View
            style={{
                flexDirection: "row",
                alignSelf: "center",
                alignItems: "center",
            }}
        >
            <Entypo name="chevron-left" size={30} color="black" onPress={onPreviousPressed} />
            <Text>
                {isFocused ? `${focusedLocationIndex + 1}/${markers.length}` : `Total Reports: ${markers.length}`}
            </Text>
            <Entypo name="chevron-right" size={30} color="black" onPress={onNextPressed} />
        </View>
        <View
            style={{
                width: "90%",
                height: 400,
                alignItems: "center",
                alignSelf: "center",
            }}
        >
            <MapView
                style={{
                    width: "100%",
                    height: "100%",

                }}
                zoomEnabled={false}
                scrollEnabled={false}
                rotateEnabled={false}
                pitchEnabled={false}
                onLayout={fitToCoordinates}
                ref={mapRef}
                liteMode={false}
            >
                {markers}
            </MapView>
            <View
                style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    paddingTop: 20,
                    position: "absolute",
                }}
            >
            

                <FadeInView
                    style={{
                        width: "80%",
                        backgroundColor: "white",
                        borderRadius: 10,
                        elavation: 5,

                    }}
                    isVisible={isFocused}
                >
                    <TouchableOpacity
                        onPress={() => {
                            onReportCardPress(reports[focusedLocationIndex])
                        }}
                        style={{
                            width: "100%",
                            borderWidth: 1,
                            padding: 10,

                        }}
                    >
                        <Text style={styles.reportName}>
                            <Text>
                                {reports[focusedLocationIndex]?.form?.name}
                            </Text>
                        </Text>
                        <View style={styles.reportDetail}>
                            <Text style={styles.reportDetailLabel}>Report ID: </Text>
                            <Text>
                                {reports[focusedLocationIndex]?._id}
                            </Text>
                        </View>
                        <View style={styles.reportDetail}>
                            <Text style={styles.reportDetailLabel}>Report Date: </Text>
                            <Text>
                                {new Date(reports[focusedLocationIndex]?.submissionDate).toUTCString()}
                            </Text>
                        </View>
                        <View style={styles.reportDetail}>
                            <Text style={styles.reportDetailLabel}>Submitted BY: </Text>
                            <Text>
                                {reports[focusedLocationIndex]?.complainant.name}
                            </Text>
                        </View>
                        <View style={styles.reportDetail}>
                            <Text style={styles.reportDetailLabel}>Report Status: </Text>
                            <Text>
                                {reports[focusedLocationIndex]?.status.desc}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </FadeInView> 
                    <FadeInView
                            duration={500} style={styles.refreshButton}     isVisible={isFocused}                >

                    <TouchableOpacity>
                    <FontAwesome name="refresh" size={24} color="black" onPress={resetCamera} />
                </TouchableOpacity>
                        </FadeInView>
            </View>
   
        </View>
    </>
    )

}


export default forwardRef<MapViewWithReportMarkerHandle, MapViewWithReportMarkerProps>(MapViewWithReportMarker);

const styles = StyleSheet.create({
    reportText: {
        textAlign: "center",
        fontWeight: "700"
    },
    reportInfoContainer: {
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 2,
        elevation: 2
    },
    reportName: {
        fontWeight: "700",
        fontSize: 18,
        color: "#333"
    },
    reportDetail: {
        flexDirection: "row",
        marginBottom: 5
    },
    reportDetailLabel: {
        fontWeight: "700",
        flex: 1
    },
    reportDetailValue: {
        flex: 1
    },
    refreshButton: {
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor:"white",
        padding: 10,
        borderRadius: 50,
        elevation: 5

    }
})

