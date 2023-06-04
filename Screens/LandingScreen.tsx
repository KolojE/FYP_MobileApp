import ReportListScreen from "./ComplainantScreens/ReportListScreen";
import ReportFormScreen from "./ComplainantScreens/ReportFormScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ComplainantMainScreen from "./ComplainantScreens/MainScreen";
import AdminMainScreen from "./AdminScreens/MainScreen";
import { FormBuilderScreen } from "./AdminScreens/FormBuilderScreen";
import { roles } from "../types/Models/User";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useSocketAction } from "../actions/socketAction.";
import { AppState } from "react-native";

const Stack = createNativeStackNavigator();
export default function LandingScreen({ route, navigation }) {

  const loggedInUser = useSelector((state: RootState) => state.authentication.loggedInUser);
  const socketAction = useSocketAction();

  //disconnect socket when app is closed
  useEffect(() => {

    socketAction.establishConnection();
    const handleRefresh = () => {
      // Perform your desired action here
      socketAction.disconnect()
      console.log('Expo refreshed!');

    };
    AppState.addEventListener('change', handleRefresh);
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {
        loggedInUser.role == roles.complainant &&
        <>
          <Stack.Screen name="dashBoard" component={ComplainantMainScreen} />
          <Stack.Screen name="reportList" component={ReportListScreen} />
          <Stack.Screen name="reportForm" component={ReportFormScreen} />
        </>
      }
      {
        loggedInUser.role == roles.admin &&
        <>
          <Stack.Screen name="dashBoard" component={AdminMainScreen} />
          <Stack.Screen name="reportList" component={ReportListScreen} />
          <Stack.Screen name="reportForm" component={ReportFormScreen} />
          <Stack.Screen name="formBuilder" component={FormBuilderScreen} />
        </>
      }

    </Stack.Navigator >
  );
}

