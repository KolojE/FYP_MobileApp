import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Screens/LoginScreen";
import LandingScreen from "./Screens/LandingScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import React, { useContext, useState } from "react";
import { authenticate, tokenAuthentication } from "./api/authentication";
import IUser from "./api/Models/User";
import { AuthProvider } from "./Contexts/LoggedInUserContext";
import { deleteItemAsync, getItemAsync } from "expo-secure-store";
import errorHandler from "./api/errorHandler/axiosError";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState<IUser | null>(null);
  React.useEffect(() => {
    getItemAsync("jwt").then(
      (token) => {
        if (!token)
          return

        tokenAuthentication(token).then(loggedInUser => {
          setLoggedInUser(loggedInUser)
        }
          , err => {
            errorHandler(err)
          });

      });

  }, [])


  const loginHandler = async (login) => {
    const loggedInUser = await authenticate(login);

    if (loggedInUser) {
      setLoggedInUser(loggedInUser);
      return true
    }

    return false

  }

 
  return (

    <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
      {
        !loggedInUser?
        <>
            <Stack.Screen name="Login">
              {(props) => <LoginScreen onLogin={loginHandler} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen} />
        </>:<>
            <Stack.Screen name="Landing">
              {(props) => (
                <AuthProvider value={{loggedInUser:loggedInUser,setLoggedInUser:setLoggedInUser}}>
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
