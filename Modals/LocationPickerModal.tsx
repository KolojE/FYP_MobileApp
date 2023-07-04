import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal, Alert, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';

import IconTextInput from "../Components/IconTextInput";
import { Openstreetmap, getAddressByCoordinates, searchAddress } from "../api/user";
import AddressSuggestion from "../Components/AddressSuggestion";

type LocationPickerModalProps = {
    onLocationChange: ({ La, Lo }: { La: number, Lo: number }) => void,
    setOpenLocationPicker: (open: boolean) => void,
}

export default function LocationPickerModal({ onLocationChange, setOpenLocationPicker }: LocationPickerModalProps) {
    const [cameraLocation, setCameraLocation] = useState<{ lo: number, la: number }>();
    const [markerlocation, setMarkerLocation] = useState<{ lo: number, la: number }>();
    const [mapReady, setMapReady] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    const [address, setAddress] = useState<string>("");


    const [textInputFocus, setTextInputFocus] = useState<boolean>(false);
    const [suggestions, setSuggestions] = useState<Openstreetmap[]>([]);
    const map = useRef<MapView>(null);




    useEffect(() => {
        const requestLocationPermission = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                let location = await Location.getCurrentPositionAsync({});
                setCameraLocation({ la: location.coords.latitude, lo: location.coords.longitude });
                setMarkerLocation({ la: location.coords.latitude, lo: location.coords.longitude });
            }
        };

        requestLocationPermission();
    }, []);

    //for development only
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
        console.log("refresh");
        setRefresh(!refresh);
        }, 1000);
    }, [mapReady]);

    useEffect(() => {
        const fetchSuggestionsAsync = async () => {
            let suggestions = await searchAddress(searchText);
            setSuggestions(suggestions);
        };

        fetchSuggestionsAsync();
    }, [searchText]);

    const onTextInputFocus = () => {
        console.log("focus")
        setTextInputFocus(true);
    };

    const onSearchtextChange = (text) => {
        setSearchText(text);
    };

    const renderSuggestions = ({ item, index }) => {
        return <AddressSuggestion item={item} onPressed={onSuggestionPressed} key={index} />;
    };

    const onSuggestionPressed = (item: Openstreetmap) => {
        setCameraLocation({ la: item.lat, lo: item.lon });
        setTextInputFocus(false);
        map.current.animateToRegion({
            latitude: item.lat, longitude: item.lon,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03
        }, 1000);
        markerlocation.la = item.lat;
        markerlocation.lo = item.lon; 
        setAddress(item.display_name);

    }

    const onMarkerDragEnd = async (e) => {
        setMarkerLocation({ la: e.nativeEvent.coordinate.latitude, lo: e.nativeEvent.coordinate.longitude });
        setAddress((await getAddressByCoordinates(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)).display_name);
    }

    const confirmLocation = () => {
        setOpenLocationPicker(false);
        onLocationChange({ La: markerlocation.la, Lo: markerlocation.lo });
        console.log(markerlocation)
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: "center" }}>
                {cameraLocation && (
                    <MapView
                        ref={map}
                        onMapLoaded={() => {setMapReady(true)}}
                        style={{ flex: 1, width: "100%" }}
                        initialRegion={{
                            latitude: cameraLocation.la,
                            longitude: cameraLocation.lo,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                        }}
                    >
                        <Marker
                            draggable={true}
                            coordinate={{
                                latitude: cameraLocation?.la,
                                longitude: cameraLocation?.lo,
                            }}
                            onDragEnd={onMarkerDragEnd}
                        />
                    </MapView>
                )}
                <TouchableOpacity
                    onPress={confirmLocation}
                    style={{
                        position: "absolute",
                        backgroundColor: "#050e2d",
                        width: "30%",
                        height: "5%",
                        zIndex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 100,
                        bottom: "5%",
                    }}
                >
                    <Text style={{ color: "white", fontWeight: "bold" }}>Confirm</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={onTextInputFocus}
                style={{
                    position: "absolute",
                    width: "100%",
                    alignItems: "center",
                    zIndex: 5,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "white",
                        position: "absolute",
                        width: "70%",
                        padding: 7,
                        borderWidth: 1,
                        borderRadius: 80,
                        marginTop: "3%",
                    }}
                >
                    <AntDesign name="search1" size={24} color="black" />
                    <Text style={{ marginLeft: 20, width: "70%" }}>{address.length < 30 ? address : address.slice(0, 50) + "..."}</Text>
                </View>
            </TouchableOpacity>
            <Modal visible={textInputFocus} animationType="fade">
                <View style={{ alignItems: "center" }}>
                    <IconTextInput
                        onTextChange={onSearchtextChange}
                        onFocus={onTextInputFocus}
                        icon={<AntDesign name="search1" size={24} color="black" />}
                        viewContainerStyle={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "white",
                            width: "70%",
                            padding: 7,
                            borderWidth: 1,
                            borderRadius: 80,
                            marginTop: "3%",
                        }}
                        textInputStyle={{ marginLeft: 20, width: "70%" }}
                        placeholder="Search"
                        editable={true}
                    />
                    <FlatList
                        data={suggestions}
                        style={{ width: "90%" }}
                        renderItem={renderSuggestions}
                        keyExtractor={(item) => item.place_id}
                    />
                </View>
            </Modal>
            <Modal visible={!mapReady} animationType="fade">
                <View style={{height:"100%",alignItems: "center", justifyContent: "center" }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </Modal>
        </View>
    );
}
