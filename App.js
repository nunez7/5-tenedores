import React from "react";
import {LogBox} from "react-native";
import Navigation from "./app/navigations/Navigation";
import {firebaseApp} from "./app/utils/firebase";
import { getAuth } from "firebase/auth";

LogBox.ignoreAllLogs(["Setting a timer", 
"ViewPropTypes will be removed from React Native",
"AsyncStorage has been extracted from react-native core and will be removed in a future release"]);

export default function App() {
  //console.log(auth);
  return <Navigation />;
}
