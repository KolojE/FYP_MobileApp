import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import HomeScreen from "./HomeScreen";
import ReportScreen from "./ReportScreen";

const Tab = createBottomTabNavigator();

export default function LandingScreen()
{

return(
    <Tab.Navigator  screenOptions={{
        headerStyle:styles.header
        ,headerTitle:"App Logo",
    }
    }>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Report" component={ReportScreen}/>
        <Tab.Screen name="Chat" component={HomeScreen}/>
    </Tab.Navigator>
);




}

const styles = StyleSheet.create({
header:{
backgroundColor:"#89CFF0",
shadowColor: "#000",
shadowOffset: {
	width: 0,
	height:7,
},
shadowOpacity: 0.40,
shadowRadius: 100,

elevation: 20,
}
})