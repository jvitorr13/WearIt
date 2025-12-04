import Constants from "expo-constants";

const debuggerHost = Constants.expoConfig?.hostUri || Constants.expoGoConfig?.debuggerHost;
const LOCAL_IP = debuggerHost ? debuggerHost.split(':')[0] : "localhost";

console.log("Detectado LOCAL_IP:", LOCAL_IP);

export const API_URL = `http://${LOCAL_IP || "localhost"}:3000`;

console.log("API_URL configurado como:", API_URL);