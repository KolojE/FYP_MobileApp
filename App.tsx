import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Screens/LoginScreen";
import LandingScreen from "./Screens/LandingScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import React, { useState } from "react";
import { authenticate } from "./api/authentication";
import IUser from "./api/Models/User";
import { LoggedInUserProvider } from "./Contexts/LoggedInUserContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState<IUser | null>(null);

  const loginHandler = async (login) => {
    const loggedInUser = await authenticate(login);
    setLoggedInUser(loggedInUser);

  }
  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {loggedInUser ? (
          <Stack.Screen name="Landing">
            {(props) => (
              <LoggedInUserProvider value={loggedInUser}>
                <LandingScreen {...props} LoggedInUser={loggedInUser} />
              </LoggedInUserProvider>
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} onLogin={loginHandler} />}
          </Stack.Screen>
        )}
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
