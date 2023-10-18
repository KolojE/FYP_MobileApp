import React from "react";
import {  TouchableOpacity, Image } from "react-native";

type EvidencePhotoProps = {
    onPressedCallBack?: (uri:string)=>void
    base64?: string
    uri?: string

}

export default function Photo({ onPressedCallBack, base64,uri}: EvidencePhotoProps) {

    if (!base64 && !uri)
        return null
    

    return (
        <TouchableOpacity onPress={onPressedCallBack?()=>{onPressedCallBack(uri)}:()=>{}}>
            <Image style={{ marginRight: 20, width: 100, height: 100 }} source={{uri:uri?`${uri}`:`data:image/png;base64,${base64})`}} />
        </TouchableOpacity>
    );
}