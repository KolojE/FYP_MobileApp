import { MaterialCommunityIcons } from "@expo/vector-icons";


type FormIconProps = {
    icon: string;
    size?: number;
    onPress?: () => void;
}

export default function FormIcon({icon,size=50,onPress}:FormIconProps)
{
    return (
        <MaterialCommunityIcons 
            name={icon as any}
            size={size}
            onPress={onPress}
        />
    )
    
}