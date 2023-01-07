import { Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import HomeScreen from "./HomeScreen";
import AddReportScreen from "./AddReportScreen";
import ChatScreen from "./ChatScreen";
import ReportListScreen from "./ReportListScreen";
import ReportScreen from "./ReportScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function LandingScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashBoard" component={TabNavigationScreen} />
      <Stack.Screen name="reportList" component={ReportListScreen} />
      <Stack.Screen name="report" component={ReportScreen}/>
    </Stack.Navigator>
  );
}

function TabNavigationScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#e91e63",
        headerTitle: "App Logo",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({}) => {
            return <Entypo name="home" size={22} />;
          },
        }}
      />
      <Tab.Screen
        name="Report"
        component={AddReportScreen}
        options={{
          tabBarIcon: ({}) => {
            return <Entypo name="circle-with-plus" size={22} />;
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({}) => {
            return <Entypo name="chat" size={22} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#89CFF0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.4,
    shadowRadius: 100,

    elevation: 20,
  },
});
