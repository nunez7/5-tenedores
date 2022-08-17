import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Camera, CameraType } from "expo-camera";
import { map, size, filter } from "lodash";
import MapView from "react-native-maps";
import uuidv4 from "random-uuid-v4";
import Modal from "../account/Modal";

import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "../../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

const db = getFirestore(firebaseApp);

const widthScreen = Dimensions.get("window").width;

export default function AddRestaurantForm(props) {
  const { toastRef, setIsLoading, navigation } = props;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageSelected, setImageSelected] = useState([]);
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationRestaurant, setLocationRestaurant] = useState(null);

  //Enviar los datos al firebase
  const addRestaurant = () => {
    if (!name || !address || !description) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (size(imageSelected) == 0) {
      toastRef.current.show("El restaurante debe tener al menos una foto");
    } else if (!locationRestaurant) {
      toastRef.current.show("Tienes que localizar el restaurante en el mapa");
    } else {
      //console.log("OK");
      setIsLoading(true);
      uploadImageStorage().then((response) => {
        //console.log(response);
        //User
        const auth = getAuth();
        const user = auth.currentUser;
        // Add a new document with a generated id.
        try {
          addDoc(collection(db, "restaurants"), {
            name: name,
            address: address,
            description: description,
            images: response,
            location: locationRestaurant,
            rating: 0,
            ratingTotal: 0,
            quantityVoting: 0,
            createAt: new Date(),
            createBy: user.uid,
          });
          setIsLoading(false);
          console.log("Ok");
        } catch (e) {
          setIsLoading(false);
          toastRef.current.show("Error al subir el restaurante");
        }
      });
    }
  };

  //Subir imagenes al storage
  const uploadImageStorage = async () => {
    //console.log(imageSelected);
    const imageBlob = [];

    await Promise.all(
      map(imageSelected, async (image) => {
        const response = await fetch(image);
        //console.log(JSON.stringify(response));
        const blob = await response.blob();
        const name = uuidv4();
        const storageRef = ref(getStorage(), `restaurants/${name}`);
        await uploadBytes(storageRef, blob).then(async (result) => {
          //toastRef.current.show("Imagen guardada");
          //console.log(result);
          await getDownloadURL(storageRef)
            .then((photoUrl) => {
              imageBlob.push(photoUrl);
            })
            .catch((error) => {});
        });
      })
    );

    return imageBlob;
  };

  //Vistas
  return (
    <ScrollView style={styles.scrollView}>
      <ImageRestaurant imagenRestaurant={imageSelected[0]} />
      <FormAdd
        setName={setName}
        setAddress={setAddress}
        setDescription={setDescription}
        setIsVisibleMap={setIsVisibleMap}
        locationRestaurant={locationRestaurant}
      />
      <UploadImage
        toastRef={toastRef}
        imageSelected={imageSelected}
        setImageSelected={setImageSelected}
      />
      <Button
        title="Crear restaurante"
        onPress={addRestaurant}
        buttonStyle={styles.btnAddRestaurant}
      />
      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationRestaurant={setLocationRestaurant}
        toastRef={toastRef}
      />
    </ScrollView>
  );
}

function ImageRestaurant(props) {
  const { imagenRestaurant } = props;

  return (
    <View style={styles.viewPhoto}>
      <Image
        source={
          imagenRestaurant
            ? { uri: imagenRestaurant }
            : require("../../../assets/img/no-image.png")
        }
        style={{ width: widthScreen, height: 200 }}
      />
    </View>
  );
}

function FormAdd(props) {
  const {
    setName,
    setAddress,
    setDescription,
    setIsVisibleMap,
    locationRestaurant,
  } = props;

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
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: locationRestaurant ? "#00a680" : "#c2c2c2",
          onPress: () => {
            setIsVisibleMap(true);
          },
        }}
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

//Creando el mapa
function Map(props) {
  const { isVisibleMap, setIsVisibleMap, setLocationRestaurant, toastRef } =
    props;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    //Espera que devuelva el mapa para continuar
    (async () => {
      const resultPermissions =
        await Location.requestForegroundPermissionsAsync();

      if (resultPermissions.status !== "granted") {
        toastRef.current.show(
          "Tienes que aceptar los permisos de localización para crear un restaurante",
          3000
        );
      } else {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
      }
    })();
  }, []);

  const confirmLocation = () => {
    setLocationRestaurant(location);
    toastRef.current.show("Localización guardada");
    setIsVisibleMap(false);
  };

  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View>
        {location && (
          <MapView
            style={styles.mapStyle}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={(region) => setLocation(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              draggable
            />
          </MapView>
        )}
      </View>
      <View style={styles.viewMapBtn}>
        <Button
          title="Guardar ubicación"
          containerStyle={styles.viewMapBtnContainerSave}
          buttonStyle={styles.viewMapBtnSave}
          onPress={confirmLocation}
        />
        <Button
          title="Cancelar ubicación"
          containerStyle={styles.viewMapBtnContainerCancel}
          buttonStyle={styles.viewMapBtnCancel}
          onPress={() => setIsVisibleMap(false)}
        />
      </View>
    </Modal>
  );
}

function UploadImage(props) {
  const { toastRef, setImageSelected, imageSelected } = props;

  const imageSelect = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();

    if (cameraPermission.status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (result.cancelled) {
        toastRef.current.show("Has cerrado la selección de imagenes", 2000);
      } else {
        setImageSelected([...imageSelected, result.uri]);
      }
    } else {
      toastRef.current.show(
        "Es necesario aceptar los permisos de la galeria, si los has rechazado tienes que ir a ajustes.",
        3000
      );
    }
  };

  //Eliminar la imagen del array
  const removeImage = (image) => {
    Alert.alert(
      "Eliminar imagen",
      "¿Estás seguro que quieres eliminar la imagen?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            setImageSelected(
              filter(imageSelected, (imageUrl) => imageUrl !== image)
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.viewImage}>
      {size(imageSelected) < 5 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}
      {map(imageSelected, (imageRestaurant, index) => (
        <Avatar
          key={index}
          style={styles.miniatureStyles}
          source={{
            uri: imageRestaurant,
          }}
          onPress={() => removeImage(imageRestaurant)}
        />
      ))}
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
    marginBottom: 5,
  },
  textarea: {
    height: 80,
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
  miniatureStyles: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
  },
  mapStyle: {
    width: "100%",
    height: 550,
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5,
  },
  viewMapBtnCancel: {
    backgroundColor: "#a60d0d",
  },
  viewMapBtnContainerSave: {
    paddingRight: 5,
  },
  viewMapBtnSave: {
    backgroundColor: "#00a680",
  },
});
