import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo} from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import AddReportScreen from "./AddReportScreen";
import ChatScreen from "../ChatScreen";
import { TouchableOpacity } from "react-native";
import LoginScreen from "../LoginScreen";
import IUser, { roles } from "../../types/Models/User";
import { useAuthAction } from "../../actions/authAndRegAction";

const Tab = createBottomTabNavigator();


export default function MainScreen() {

    const authAction = useAuthAction();
    const onLogoutButtonPressed = () => {
        authAction.logoutAction();
    }

    const adminUser:IUser = {
        _id: "646cccd978d49b3f29706659",
        ID: "",
        name: "",
        email: "",
        organization: undefined,
        contact: {
            phoneNo: "",
            address: ""
        },
        role: roles.admin,
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
                options={{
                    tabBarIcon: ({ }) => {
                        return <Entypo name="chat" size={22} />;
                    },
                }}
            >
                {()=><ChatScreen selectedUser={adminUser} setChatRoomModal={null}/>}
            </Tab.Screen>
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