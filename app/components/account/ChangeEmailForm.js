import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { getAuth, updateEmail } from "firebase/auth";

import {validateEmail} from "../../utils/validations";
import {reauthenticate} from "../../utils/api";


export default function ChangeEmailForm(props) {
  const { email, setShowModal, toasRef, setReloadUserInfo } = props;
  const [formData, setFormData] = useState(defaultValue());
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = () => {
    //console.log(formData);
    setError({});
    if(!formData.email || email===formData.email){
       setError({
        email: "El email no ha cambiado."
       });
    }else if(!validateEmail(formData.email)){
        setError({
            email: "Email incorrecto."
        });
    }else if(!formData.password){
        setError({
            password: "La contraseña no debe ser vacía."
        });
    }else{
        //Spiner en boton
        setIsLoading(true);
        //Reautenticacion
        reauthenticate(formData.password).then(response=>{
            //console.log(response);
            const auth = getAuth();
            updateEmail(auth.currentUser, formData.email).then(() => {
                //Paramos el loading
                setIsLoading(false);
                //refrescamos ls datos de la app
                setReloadUserInfo(true);
                toasRef.current.show("Email actualizado");
                //Cerramos el modal
                setShowModal(false);
            }).catch(() => {
                setError({
                    email: "Error al actualizar el email."
                });
                setIsLoading(false);
              });
        }).catch(() => {
            setError({
                password: "La contraseña no es correcta."
            });
            setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.input}
        defaultValue={email || ""}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2",
        }}
        onChange={(e) => onChange(e, "email")}
        errorMessage= {error.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPassword ? false: true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline": "eye-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, "password")}
        errorMessage={error.password}
      />
      <Button
        title="Cambiar email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoading}
      />
    </View>
  );
}

function defaultValue() {
  return {
    email: "",
    password: "",
  };
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
