import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo} from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import AddReportScreen from "./AddReportScreen";
import ChatScreen from "../ChatScreen";
import { TouchableOpacity } from "react-native";
import AuthContext from "../../Contexts/LoggedInUserContext";
import { deleteItemAsync } from "expo-secure-store";
import LoginScreen from "../LoginScreen";

const Tab = createBottomTabNavigator();


export default function MainScreen() {

    const setLoggedInUser = useContext(AuthContext).setLoggedInUser
    const onLogoutButtonPressed = () => {
        deleteItemAsync("jwt");
        setLoggedInUser(false)
    }
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
            <Tab.Screen
                name="Logout"
                component={LoginScreen}
                options={{
                    tabBarButton:()=> {return <TouchableOpacity style={{flex:1,alignItems:"center",justifyContent:"center", height:"100%"}} onPress={()=>onLogoutButtonPressed()}><Entypo name="log-out" size={22}/></TouchableOpacity>},
                }}
            />
        </Tab.Navigator>
    );
}