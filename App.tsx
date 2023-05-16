import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { authenticate, tokenAuthentication } from "./api/authentication";
import { AuthProvider } from "./Contexts/LoggedInUserContext";
import { getItemAsync } from "expo-secure-store";
import React, { useState } from "react";

import errorHandler from "./api/errorHandler/axiosError";
import IUser from "./api/Models/User";

import LoginScreen from "./Screens/LoginScreen";
import LandingScreen from "./Screens/LandingScreen";
import RegisterScreen from "./Screens/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function App() {


  const [loggedInUser, setLoggedInUser] = useState<IUser | null>(null);

  React.useEffect(() => {

    const loginWithToken = async () => {

      const token = await getItemAsync("jwt")
      if (!token)
        return

      setLoggedInUser(await tokenAuthentication(token))
    }

    loginWithToken();

  }, [])


  async function loginHandler(login) {

    const loggedInUser = await authenticate(login);

    if (loggedInUser) {
      setLoggedInUser(loggedInUser);
      return
    }
      alert("Password / Email incorrect ! Please try again!");
    


  }


  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
          !loggedInUser ?
            <>
              <Stack.Screen name="Login">
                {(props) => <LoginScreen onLogin={loginHandler} {...props} />}
              </Stack.Screen>
              <Stack.Screen name="Register">
                {(props) => (
                  <AuthProvider value={{ loggedInUser: loggedInUser, setLoggedInUser: setLoggedInUser }}>
                    <RegisterScreen/>
                  </AuthProvider>
                )}
              </Stack.Screen>
            </> : <>
              <Stack.Screen name="Landing">
                {(props) => (
                  <AuthProvider value={{ loggedInUser: loggedInUser, setLoggedInUser: setLoggedInUser }}>
                    <LandingScreen {...props} />
                  </AuthProvider>
                )}
              </Stack.Screen>
            </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
