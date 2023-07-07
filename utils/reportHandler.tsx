import React from "react";
import { View, Text, StyleSheet, Image, FlatList, Modal, TouchableOpacity, Dimensions } from "react-native";
import { inputType } from "../types/Models/Form";
import { IDetail } from "../types/Models/Report";
import MapView, { Marker } from "react-native-maps";
import { getAddressByCoordinates } from "../api/user";
import { api_url } from "../env";

import Photo from "../Components/EvidencePhoto";
import VideoPlayerModal from "../Modals/VideoPlayerModal";
import * as VideoThumbnails from "expo-video-thumbnails";

export function detailRenderer(detail: IDetail, key) {

    switch (detail.inputType) {
        case inputType.Date:
            return (
                <DateValue label={detail.label} value={detail.value} key={key} />
            );
        case inputType.Text:
            return (
                <TextValue label={detail.label} value={detail.value} key={key} />
            );
        case inputType.Map:
            return (
                <MapValue label={detail.label} fieldID={key} value={detail.value} key={key} />
            );
        case inputType.Time:
            return (
                <TimeValue label={detail.label} value={detail.value} key={key} />
            );
        case inputType.Photo:
            return (
                <PhotoValue label={detail.label} value={detail.value} key={key} />
            );
        case inputType.DropDown:
            return (<DropDownValue label={detail.label} value={detail.value} />); // Handle the DropDown input type
        case inputType.Video:
            return <VideoValue label={detail.label} value={detail.value} key={key} />;
    }
}

type DataProps = {
    label: string;
    value: Date | string | { La: number; Lo: number } | string[];
    fieldID?: string;
};

export function DateValue(data: DataProps) {
    const label = data.label;
    const value = new Date(data.value as string);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value.toDateString()}</Text>
        </View>
    );
}

export function TextValue(data: DataProps) {
    const label = data.label;
    const value = data.value as string;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

export function MapValue(data: DataProps) {
    const label = data.label;
    const value = data.value as { La: number; Lo: number };
    const [address, setAddress] = React.useState<string>("");



    React.useEffect(() => {
        const getAddressAsync = async () => {
            const address = (await getAddressByCoordinates(value.La, value.Lo)).display_name;
            setAddress(address);
        }
        getAddressAsync();
    }, [])

    return (
        <View style={{ ...styles.container }}>
            <Text style={styles.label}>{label}</Text>
            <MapView
                initialRegion={{
                    latitude: value.La,
                    longitude: value.Lo,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.010,
                }}
                scrollEnabled={false}
                style={styles.map}
            >
                <Marker coordinate={{ latitude: value.La, longitude: value.Lo }} />
            </MapView>
            <Text style={{ fontWeight: "bold" }}>
                {address}
            </Text>
        </View>
    );
}

export function TimeValue(data: DataProps) {
    const label = data.label;
    const value = new Date(data.value as string);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value.toLocaleTimeString()}</Text>
        </View>
    );
}

export function PhotoValue(data: DataProps) {
    const label = data.label;
    const value = data.value as string[];

    const [photoModalUri, setPhotoModalUri] = React.useState<string>(null)

    const onPressed = (uri: string) => {
        setPhotoModalUri(uri)
    }

    // Calculate the aspect ratio of the image
    const imageAspectRatio = Dimensions.get('window').width / Dimensions.get('window').height;


    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <FlatList
                data={value}
                renderItem={({ item }) => {
                    return <Photo onPressedCallBack={onPressed} uri={`${api_url}${item}`} />
                }}
                horizontal={true}
            />
            <Modal visible={!!photoModalUri}>
                <TouchableOpacity onPress={() => { setPhotoModalUri(null) }}>
                    <Image source={{ uri: `${photoModalUri}` }}
                        resizeMode="contain"
                        style={{
                            aspectRatio: imageAspectRatio
                        }} />
                </TouchableOpacity>
            </Modal>
        </View>
    );
}
export function VideoValue(data: DataProps) {
    type Video = {
        video_uri: string,
        thumbnail_uri: string
    }
    const label = data.label;
    const value = data.value as string[];

    const [videoModalUri, setVideoModalUri] = React.useState<string>(null)
    const [videos, setVideos] = React.useState<Video[]>([])

    React.useEffect(() => {
        try {
            const setVideoAsync = async () => {
                const thumbnails_video_uri = value.map(async (video_uri) => {
                    const uri = await VideoThumbnails.getThumbnailAsync(
                        `${api_url}/${video_uri}`,
                        {
                            time: 15000,
                        }
                    )
                    return {
                        video_uri: video_uri,
                        thumbnail_uri: uri.uri
                    }
                }
                )
                const result = await Promise.all(thumbnails_video_uri)
                setVideos(
                    result
                )
            }
            setVideoAsync();
        } catch (e) {
            console.error(e)
        }
    }, [value])

    const onPressed = (uri: string) => {
        setVideoModalUri(uri)
    }

    const renderItem = ({ item }) => {
        return <Photo onPressedCallBack={()=>{
            onPressed(`${api_url}/${item.video_uri}`)
        }} uri={item.thumbnail_uri} />
    }
    // Calculate the aspect ratio of the image
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <FlatList
                data={videos}
                renderItem={renderItem}
                horizontal={true}
            />
            <Modal
             visible={!!videoModalUri}
             onRequestClose={
                    ()=>{
                        setVideoModalUri(null)
                    }  
             }
             animationType="slide"
            >
                <VideoPlayerModal
                    uri={videoModalUri}
                    key={videoModalUri}
                />
            </Modal>
        </View>
    );
}


export function DropDownValue(data: DataProps) {
    const label = data.label;
    const value = data.value as string;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        padding: "1%"
    },
    label: {
        fontSize: 12,
        color: "#828282",
        fontWeight: "500",
    },
    value: {
        fontSize: 16,
        fontWeight: "bold",
    },
    map: {
        height: 200,
        width: "100%",
        alignSelf: "center",
        marginTop: 8,
    },
    photo: {
        width: 200,
        height: 200,
        resizeMode: "cover",
        borderRadius: 8,
        marginTop: 8,
    },
    image: {
        flex: 1,
        maxWidth: '100%',
        maxHeight: '100%',
    }
});