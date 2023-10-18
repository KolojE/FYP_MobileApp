import { MaterialCommunityIcons } from "@expo/vector-icons";


type FormIconProps = {
    icon: string;
    size?: number;
}

export default function FormIcon({icon,size=50}:FormIconProps)
{
    console.log(icon);
    return (
        <MaterialCommunityIcons 
            name={icon as any}
            size={size}
        />
    )
    
}