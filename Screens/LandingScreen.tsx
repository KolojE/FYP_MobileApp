import ReportListScreen from "./ComplainantScreens/ReportListScreen";
import ReportFormScreen from "./ComplainantScreens/ReportFormScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ComplainantMainScreen from "./ComplainantScreens/MainScreen";
import AdminMainScreen from "./AdminScreens/MainScreen";
import { FormBuilderScreen } from "./AdminScreens/FormBuilderScreen";
import { roles } from "../api/Models/User";
import React, { useContext } from "react";
import AuthContext from "../Contexts/LoggedInUserContext";
import { SocketConnection } from "../Contexts/SocketConnection";
import { Chat } from "../Contexts/ChatContext";

const Stack = createNativeStackNavigator();
export default function LandingScreen({ route, navigation }) {

  const auth = useContext(AuthContext)

  return (
    <SocketConnection>
      <Chat>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {
            auth.loggedInUser.role == roles.complainant &&
            <>
              <Stack.Screen name="dashBoard" component={ComplainantMainScreen} />
              <Stack.Screen name="reportList" component={ReportListScreen} />
              <Stack.Screen name="reportForm" component={ReportFormScreen} />
            </>
          }
          {
            auth.loggedInUser.role == roles.admin &&
            <>
              <Stack.Screen name="dashBoard" component={AdminMainScreen} />
              <Stack.Screen name="reportList" component={ReportListScreen} />
              <Stack.Screen name="reportForm" component={ReportFormScreen} />
              <Stack.Screen name="formBuilder" component={FormBuilderScreen} />
            </>
          }

        </Stack.Navigator >
      </Chat>
    </SocketConnection>
  );
}

