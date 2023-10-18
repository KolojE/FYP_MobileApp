import { ResizeMode, Video } from "expo-av";
import React, { useEffect } from "react";
import { View } from "react-native";



export default function VideoPlayerModal({uri}) {
    const [status, setStatus] = React.useState({});

    const video = React.useRef(null);

        if(uri)
        video.current?.playAsync();
        else
        video.current?.pauseAsync();

    return (
        <View
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
        }}
        >
        <Video
        ref={video}
        source={{
            uri: uri,
        }}
        style={{
            flex: 1,
            width: '100%',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        </View>
        )
}