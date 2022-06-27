import React from "react";
import Navigation from "./app/navigations/Navigation";
import {firebaseApp} from "./app/utils/firebase";
import { getAuth } from "firebase/auth";

export default function App() {
  //console.log(auth);
  return <Navigation />;
}
