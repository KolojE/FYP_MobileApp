import react from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import AddReportScreen from "./AddReportScreen";
import ChatScreen from "../ChatScreen";
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
                name="Report"
                component={AddReportScreen}
                options={{
                    tabBarIcon: ({ }) => {
                        return <Entypo name="circle-with-plus" size={22} />;
                    },
                }}
            />
            <Tab.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    tabBarIcon: ({ }) => {
                        return <Entypo name="chat" size={22} />;
                    },
                }}
            />
        </Tab.Navigator>
    );
}