import React, {useRef, useState, useEffect} from "react";
import {StyleSheet, View, Text } from "react-native";
import {Button} from "react-native-elements";
import Toast from "react-native-easy-toast";

import { getAuth, signOut } from "firebase/auth";

import InfoUser from "../../components/account/InfoUser";

import Loading from "../../components/Loading";

export default function UserLogged() {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const toasRef = useRef();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    //Obteniendo el user
    (async() =>{
      const auth = getAuth();
      const user = await auth.currentUser;
      //console.log(user);
      setUserInfo(user);
    }) ();
  }, [])
  

  return (
    <View style={styles.viewUserInfo}>
      {userInfo && <InfoUser userInfo={userInfo} />}
      <Text>AccountOptions</Text>

      <Button title="Cerrar sesión" 
      buttonStyle={styles.btnCloseSesion}
      titleStyle= {styles.btnCloseSesionText}
      onPress={() => cerrarSesion()} />

      <Toast ref={toasRef} position="center" opacity={0.9} />
      <Loading text={loadingText} isVisible={loading} />
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

const styles = StyleSheet.create({
  viewUserInfo:{
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
  },
  btnCloseSesion:{
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop:10,
    paddingBottom: 10,
  },
  btnCloseSesionText:{
    color: "#00a680",
  }
});