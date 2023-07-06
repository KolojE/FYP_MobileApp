import { FontAwesome } from "@expo/vector-icons";
import { Marker } from "react-native-maps";
import { IReport } from "../types/Models/Report";
import { Animated } from "react-native";
import { useEffect, useRef } from "react";


type CustomMarkerProps = {
    index: number,
    latitude: number,
    longitude: number,
    animated?: boolean,
    color?: string,
    onMarkerPress: (report: any) => void,
    focusedLocation: number
    report: IReport
}

export default function CustomMarker({
  index,
  latitude,
  longitude,
  onMarkerPress,
  report,
  animated =false,
  color="blue"
}:CustomMarkerProps) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let animation;

    if (animated) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 0.8,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      );

      animation.start();
    }

    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [animated, scaleValue]);

  return (
    <Marker
      key={index}
      coordinate={{ latitude, longitude }}
      onPress={() => onMarkerPress(report)}
      tracksViewChanges={animated? true : false}
      
    >
      {animated ? (
        <Animated.View
          style={{
            transform: [{ scale: scaleValue }],
            height: 35,
            width: 35,
            alignItems: 'center',
          }}
        >
          <FontAwesome name="dot-circle-o" size={30} color={color} />
        </Animated.View>
      ) : (
        <FontAwesome name="dot-circle-o" size={30} color={color} />
      )}
    </Marker>
  );
}
