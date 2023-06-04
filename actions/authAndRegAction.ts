import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure, logout, loginError } from "../redux/authentication";
import * as secureStore from "expo-secure-store"
import { login, tokenLogin } from "../api/authentication";
import { registration } from "../api/registration";
import { registrationStart } from "../redux/registration";
import { LoginCredentials, RegistrationCredentials } from "../types/General";
import { AxiosError } from "axios";
import { useSocketAction } from "./socketAction.";



export const useAuthAction = () => {
  const dispatch = useDispatch();
  const socketActions = useSocketAction()

  const loginAction = async (credentials: LoginCredentials) => {
    try {
      dispatch(loginStart());
      const user = await login(credentials);
      dispatch(loginSuccess(user));
      socketActions.establishConnection()
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(loginFailure("Password or username is incorrect"));
        return
      }
      dispatch(loginError(error.message));
    }
  };

  const logoutAction = async () => {
    try {
      secureStore.deleteItemAsync("jwt");
      socketActions.disconnect()
      dispatch(logout());
    } catch (err) {
      console.log(err)
    }
  }

  const tokenLoginAction = async () => {
    const token = await secureStore.getItemAsync("jwt");
      dispatch(loginStart())
    if (!token) {
      dispatch(logout())
      return;

    }
    const user = await tokenLogin(token)
    dispatch(loginSuccess(user))
    socketActions.establishConnection();
  }

  return {
    loginAction,
    logoutAction,
    tokenLoginAction,
  };
}


export const useRegistrationAction = () => {
  const dispatch = useDispatch();

  const registrationAction = async (credentials: RegistrationCredentials) => {
    try {
      dispatch(registrationStart());
      const user = await registration(credentials);
      dispatch(loginSuccess(user));
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  }

  return {
    registrationAction,
  }
}
