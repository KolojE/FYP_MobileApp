import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import MapView, { Marker} from "react-native-maps";
import * as Location from 'expo-location';

import IconTextInput from "../Components/IconTextInput";
import { Openstreetmap, searchAddress } from "../api/user";
import AddressSuggestion from "../Components/AddressSuggestion";

type LocationPickerModalProps = {
    onLocationChange: ({ la, lo }: { la: number, lo: number }) => void,
    setOpenLocationPicker: (open: boolean) => void,
}

export default function LocationPickerModal({ onLocationChange, setOpenLocationPicker }: LocationPickerModalProps) {
    const [location, setLocation] = useState<{ lo: number, la: number }>();
    const [searchText, setSearchText] = useState<string>("");
    const [textInputFocus, setTextInputFocus] = useState<boolean>(false);
    const [suggestions, setSuggestions] = useState<Openstreetmap[]>([]);
    const map = useRef<MapView>(null);

    useEffect(() => {
        const requestLocationPermission = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                let location = await Location.getCurrentPositionAsync({});
                setLocation({ la: location.coords.latitude, lo: location.coords.longitude });
            }
        };

        requestLocationPermission();
    }, []);

    useEffect(() => {
        const fetchSuggestionsAsync = async () => {
            let suggestions = await searchAddress(searchText);
            setSuggestions(suggestions);
        };

        fetchSuggestionsAsync();
    }, [searchText]);

    const onTextInputFocus = () => {
        setTextInputFocus(true);
    };

    const onSearchtextChange = ({ inputkey, text }) => {
        setSearchText(text);
    };

    const renderSuggestions = ({ item, index }) => {
        return <AddressSuggestion item={item} onPressed={onSuggestionPressed} key={index} />;
    };

    const onSuggestionPressed = (item: Openstreetmap) => {
        console.log(typeof item.lat, typeof item.lon)
        setLocation({ la: item.lat, lo: item.lon });
        setTextInputFocus(false);
        map.current.animateToRegion({
            latitude: item.lat, longitude: item.lon,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03
        }, 1000);

    }

    const confirmLocation = () => {
        setOpenLocationPicker(false);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: "center" }}>
                {location && (
                    <MapView
                        ref={map}
                        style={{ flex: 1, width: "100%" }}
                        initialRegion={{
                            latitude: location.la,
                            longitude: location.lo,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                        }}
                    >
                        <Marker
                            draggable={true}
                            coordinate={{
                                latitude: location?.la,
                                longitude: location?.lo,
                            }}
                        />
                    </MapView>
                )}
                <TouchableOpacity
                    onPress={confirmLocation}
                    style={{
                        backgroundColor: "#050e2d",
                        width: "30%",
                        height: "5%",
                        zIndex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 100,
                        marginTop: "auto",
                        marginBottom: "5%",
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
                }}
            >
                <IconTextInput
                    icon={<AntDesign name="search1" size={24} color="black" />}
                    viewContainerStyle={{
                        zIndex: 2,
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
                    textInputStyle={{ marginLeft: 20 }}
                    placeholder="Search"
                    editable={true}
                />
            </TouchableOpacity>
            <Modal visible={textInputFocus} animationType="fade">
                <View style={{ alignItems: "center" }}>
                    <IconTextInput
                        onChange={onSearchtextChange}
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
        </View>
    );
}
