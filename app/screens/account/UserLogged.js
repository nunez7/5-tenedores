import React from "react";
import { View, Text, Button } from "react-native";
import { getAuth, signOut } from "firebase/auth";

export default function UserLogged() {
  return (
    <View>
      <Text>User Logged...</Text>
      <Button title="Cerrar sesión" onPress={() => cerrarSesion()} />
    </View>
  );
}

function cerrarSesion() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}
