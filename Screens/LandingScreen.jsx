import { StyleSheet } from "react-native";
import ReportListScreen from "./ComplainantScreens/ReportListScreen";
import ReportFormScreen from "./ComplainantScreens/ReportFormScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { roles, user } from "../utils/user";
import ComplainantMainScreen from "./ComplainantScreens/MainScreen";
import AdminMainScreen from "./AdminScreens/MainScreen";


const Stack = createNativeStackNavigator();
export default function LandingScreen() {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user.role == roles.complainant &&
        <>
          <Stack.Screen name="dashBoard" component={ComplainantMainScreen} />
          <Stack.Screen name="reportList" component={ReportListScreen} />
          <Stack.Screen name="reportForm" component={ReportFormScreen} />
        </>
      }
      {user.role == roles.admin &&
        <>
          <Stack.Screen name="dashBoard" component={AdminMainScreen} />
          <Stack.Screen name="reportList" component={ReportListScreen} />
          <Stack.Screen name="reportForm" component={ReportFormScreen} />
        </>
      }

    </Stack.Navigator >
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
