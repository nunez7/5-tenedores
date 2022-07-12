import React from "react";
import { StyleSheet, View, Text, PermissionsAndroid, ToastAndroid } from "react-native";
import { Avatar } from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default function InfoUser(props) {
  const {
    userInfo: {uid, photoURL, displayName, email },
    toasRef,
  } = props;

  const storage = getStorage();

  const changeAvatar = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (granted) {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect:[4,3]
        });
        if(result.cancelled){
            toasRef.current.show("Has cerrado la selección de imagenes");
        }else{
            uploadImage(result.uri);
        }
    } else {
      toasRef.current.show("Es necesario aceptar los permisos de la galeria");
    }
  };

  const uploadImage = async (uri) =>{
    //console.log(uri);
    const response = await fetch(uri);
    //console.log(JSON.stringify(response));
    const blob = await response.blob();
    //console.log(JSON.stringify(blob));
    
    const storageRef = ref(storage, `avatar/${uid}`);
    uploadBytes(storageRef, blob).then((snapshot) => {
        toasRef.current.show("Imagen subida");
    });
  }

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
