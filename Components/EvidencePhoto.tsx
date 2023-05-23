import React from "react";
import { View, TouchableOpacity, Image } from "react-native";

type EvidencePhotoProps = {
    onPressedCallBack?: Function
    base64: string
}

export default function EvidencePhoto({ onPressedCallBack, base64 }: EvidencePhotoProps) {
    return (
        <TouchableOpacity>
            <Image style={{ marginRight: 20, width: 100, height: 100 }} source={{uri:`data:image/png;base64,${base64}`}} />
        </TouchableOpacity>
    );
}