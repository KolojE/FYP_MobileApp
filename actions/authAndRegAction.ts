import { useDispatch } from "react-redux";
import * as secureStore from "expo-secure-store";
import { AxiosError } from "axios";
import { loginStart, loginSuccess, loginFailure, logout, loginError } from "../redux/authentication";
import { login, tokenLogin } from "../api/authentication";
import { registration } from "../api/registration";
import { registrationFailure, registrationStart, registrationSuccess } from "../redux/registration";
import { LoginCredentials, RegistrationCredentials } from "../types/General";
import { useSocketAction } from "./socketAction";
import { useChatAction } from "./chatAction";
import { useComplainantAction } from "./complainantAction";

export const useAuthAction = () => {
  const dispatch = useDispatch();
  const socketActions = useSocketAction();
  const chatActions = useChatAction();
  const complainantActions = useComplainantAction();

  const loginAction = async (credentials: LoginCredentials) => {
    try {
      dispatch(loginStart());
      const user = await login(credentials);
      dispatch(loginSuccess(user));
      await socketActions.establishConnection();
      if (user.role === "admin") {
        complainantActions.getComplainants();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          dispatch(loginFailure(error.response?.data.message));
        } else {
          dispatch(loginFailure(error.message));
        }
        return;
      }
      dispatch(loginError(error));
    }
  };

  const logoutAction = async () => {
    try {
      secureStore.deleteItemAsync("jwt");
      socketActions.disconnect();
      dispatch(logout());
    } catch (err) {
      console.log(err);
    }
  };

  const tokenLoginAction = async () => {
    const token = await secureStore.getItemAsync("jwt");
    dispatch(loginStart());

    if (!token) {
      dispatch(logout());
      return;
    }

    const user = await tokenLogin(token);
    dispatch(loginSuccess(user));
    socketActions.establishConnection();
    chatActions.retrieveAllChatAction();

    if (user.role === "admin") {
      complainantActions.getComplainants();
    }
  };

  return {
    loginAction,
    logoutAction,
    tokenLoginAction,
  };
};

export const useRegistrationAction = () => {
  const dispatch = useDispatch();

  const registrationAction = async (credentials: RegistrationCredentials) => {
    try {
      dispatch(registrationStart());
      await registration(credentials);
      dispatch(registrationSuccess(null));
    } catch (err) {
      dispatch(registrationFailure(err.message));
    }
  };

  return {
    registrationAction,
  };
};
