import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import { Camera, CameraType } from "expo-camera";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";

export default function InfoUser(props) {
    //console.log(props);
  const {
    userInfo: { uid, photoURL, displayName, email },
    toasRef,
    setLoading,
    setLoadingText,
  } = props;

  const storage = getStorage();

  const changeAvatar = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
       
    if (cameraPermission.status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (result.cancelled) {
        toasRef.current.show("Has cerrado la selección de imagenes", 2000);
      } else {
        uploadImage(result.uri);
      }
    } else {
      toasRef.current.show(
        "Es necesario aceptar los permisos de la galeria.",
        3000
      );
    }
  };
  //Subir imagen al storage
  const uploadImage = async (uri) => {
    setLoadingText("Actualizando avatar");
    setLoading(true);

    //console.log(uri);
    const response = await fetch(uri);
    //console.log(JSON.stringify(response));
    const blob = await response.blob();
    //console.log(JSON.stringify(blob));

    const storageRef = ref(storage, `avatar/${uid}`);
    uploadBytes(storageRef, blob).then((snapshot) => {
      toasRef.current.show("Imagen guardada");
      updatePhotoUrl();
    });
  };
  //Descargar photo en perfil
  const updatePhotoUrl = () => {
    const starsRef = ref(storage, `avatar/${uid}`);
    // Get the download URL
    getDownloadURL(starsRef)
      .then(async (response) => {
        //console.log(response);
        const auth = getAuth();
        //Actualizar imagen
        //console.log(response);
        updateProfile(auth.currentUser, {
            photoURL: response
        })
          .then(() => {
            setLoading(false);
          })
          .catch((error) => {console.log("Error");});
      })
      .catch((error) => {
        toasRef.current.show("Error al actualizar el avatar");
      });
  };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        onPress={() => {
          changeAvatar();
        }}
        rounded
        size="large"
        title="FN"
        containerStyle={styles.userInfoAvatar}
        source={
          photoURL
            ? { uri: photoURL }
            : require("../../../assets/img/avatar-default.jpg")
        }
      >
        <Avatar.Accessory size={24} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anónimo"}
        </Text>
        <Text>{email ? email : "Social login"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#cbcbcb",
    paddingTop: 30,
    paddingBottom: 30,
  },
  userInfoAvatar: {
    marginRight: 20,
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 8,
  },
});
