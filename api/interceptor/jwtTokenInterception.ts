import { InternalAxiosRequestConfig } from "axios";
import { getItemAsync } from "expo-secure-store";


export async function jwtTokenInterception(config:InternalAxiosRequestConfig){ 
    const token = await getItemAsync('jwt');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  }