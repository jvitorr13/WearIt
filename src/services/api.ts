import Constants from "expo-constants";

const debuggerHost = Constants.expoConfig?.hostUri || Constants.expoGoConfig?.debuggerHost;
const LOCAL_IP = debuggerHost?.split(":").shift();

export const API_URL = `http://${LOCAL_IP}:3000`;
