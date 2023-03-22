import React from "react";
import { View, TouchableOpacity, Image } from "react-native";


export default function EvidencePhoto() {
    return (
        <TouchableOpacity>
            <Image style={{ marginRight: 20, width: 100, height: 100 }} source={require("../DemoIamge/demo1.jpg")} />
        </TouchableOpacity>
    );
}