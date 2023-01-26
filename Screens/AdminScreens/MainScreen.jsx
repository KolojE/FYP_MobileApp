import react from "react";
import ChatScreen from "../ChatScreen";
import ChatRoomList from "./ChatRoomList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
const Tab = createBottomTabNavigator();

export default function MainScreen() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#e91e63",
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ }) => {
                        return <Entypo name="home" size={22} />;
                    },
                }}
            />
            <Tab.Screen
                name="Chat Room"
                component={ChatRoomList}
                options={{
                    tabBarIcon: ({ }) => {
                        return <Entypo name="chat" size={22} />;
                    },
                }}
            />

        </Tab.Navigator>
    )
}