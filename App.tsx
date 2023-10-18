import React from "react";
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "./redux/store";


import LoginScreen from "./Screens/LoginScreen";
import LandingScreen from "./Screens/LandingScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import { LogBox } from "react-native";
const Stack = createNativeStackNavigator();


LogBox.ignoreAllLogs()
export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

;
export function AppContent() {
  const loggedInUser = useSelector((state: RootState) => state.authentication.loggedInUser);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {
            !loggedInUser ?
              //not logged in user
              <>
                <Stack.Screen name="Login">
                  {(props) => <LoginScreen {...props} />}
                </Stack.Screen>
                <Stack.Screen name="Register">
                  {(props) => (
                    <RegisterScreen
                      {...props}
                    />
                  )}
                </Stack.Screen>
              </>
              :
              //logged in user
              <>
                <Stack.Screen name="Landing">
                  {(props) => (
                    <LandingScreen {...props} />
                  )}
                </Stack.Screen>
              </>
          }
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}