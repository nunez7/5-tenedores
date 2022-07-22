import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  PermissionsAndroid,
} from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

export default function AddRestaurantForm(props) {
  const { toastRef, setIsLoading, navigation } = props;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageSelected, setImageSelected] = useState([]);


  const addRestaurant = () => {
    console.log("Ok");
    console.log(imageSelected);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <FormAdd
        setName={setName}
        setAddress={setAddress}
        setDescription={setDescription}
      />
      <UploadImage toastRef={toastRef} imageSelected={imageSelected} setImageSelected={setImageSelected}/>
      <Button
        title="Crear restaurante"
        onPress={addRestaurant}
        buttonStyle={styles.btnAddRestaurant}
      />
    </ScrollView>
  );
}

function FormAdd(props) {
  const { setName, setAddress, setDescription } = props;

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del restaurante"
        containerStyle={styles.input}
        onChange={(e) => setName(e.nativeEvent.text)}
      />
      <Input
        placeholder="Dirección"
        containerStyle={styles.input}
        onChange={(e) => setAddress(e.nativeEvent.text)}
      />
      <Input
        placeholder="Descripción"
        multiline={true}
        inputContainerStyle={styles.textarea}
        onChange={(e) => setDescription(e.nativeEvent.text)}
      />
    </View>
  );
}

function UploadImage(props) {
   const {toastRef, setImageSelected, imageSelected} = props;
    
  const imageSelect = async () => {
    const resultPermissions = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );

    if(!resultPermissions) {
       toastRef.current.show("Es necesario aceptar los permisos de la galeria, si los has rechazado tienes que ir a ajustes.", 3000);
    }else{
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if(result.cancelled){
            toastRef.current.show("Has cerrado la selección de imagenes", 2000);
        }else{
            setImageSelected([...imageSelected, result.uri])
        }
    }
  };

  return (
    <View style={styles.viewImage}>
      <Icon
        type="material-community"
        name="camera"
        color="#7a7a7a"
        containerStyle={styles.containerIcon}
        onPress={imageSelect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
  },
  textarea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  btnAddRestaurant: {
    backgroundColor: "#00a680",
    margin: 20,
  },
  viewImage: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
});
