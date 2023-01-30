import react from "react";
import ChatScreen from "../ChatScreen";
import ChatRoomList from "./ChatRoomList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Ionicons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import SettingScreen from "./SettingScreen";
import ReportsScreen from "./ReportsScreen";
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
                name="Reports"
                component={ReportsScreen}
                options={{
                    tabBarIcon: ({ }) => {
                        return <Ionicons name="documents" size={22} />;
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

            <Tab.Screen
                name="Setting"
                component={SettingScreen}
                options={{
                    tabBarIcon: ({ }) => {
                        return <Ionicons name="settings" size={22} />;
                    },
                }}
            />
        </Tab.Navigator>
    )
}