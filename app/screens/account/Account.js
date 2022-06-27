import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { firebaseApp } from "../../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";

export default function Account() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
      //console.log(user);
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  if(login ===null) return <Text>Cargando...</Text>;

  return login ? <UserLogged /> : <UserGuest />
}
