import React from "react";
import {LogBox} from "react-native";
import Navigation from "./app/navigations/Navigation";
import {firebaseApp} from "./app/utils/firebase";
import { getAuth } from "firebase/auth";

LogBox.ignoreAllLogs(["Setting a timer", 
"AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/ async-storage instead of react-native. See https://github.com/react-native-async-storage/async-storage",
"ViewPropTypes will be removed from React Native",
"AsyncStorage has been extracted from react-native core and will be removed in a future release",
"PermissionsAndroid module works only for Android platform.",
"AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

export default function App() {
  //console.log(auth);
  return <Navigation />;
}
