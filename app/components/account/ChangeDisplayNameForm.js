import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { getAuth, updateProfile } from "firebase/auth";

export default function ChangeDisplayNameForm(props) {
  const { displayName, setShowModal, toasRef , setReloadUserInfo} = props;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setError(null);

    if (!newDisplayName) {
      setError("El nombre no puede ser vacío.");
    } else if (displayName === newDisplayName) {
      setError("El nombre no puede ser igual al actual.");
    } else {
        //Loading 
    setIsLoading(true);
      //peticion
      const auth = getAuth();
      updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      })
        .then(() => {
            setIsLoading(false);
            setReloadUserInfo(true);
            setShowModal(false);
            //console.log("Ok");
            //toasRef.current.show("Datos actualizados");
        })
        .catch((error) => {
            setError("Error al guardar los datos");
            setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre y apellidos"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        defaultValue={displayName || ""}
        onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
        errorMessage={error}
      />
      <Button
        title="Cambiar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#00a680",
  },
});
