import React from "react";
import { StyleSheet, View, Text, PermissionsAndroid } from "react-native";
import { Avatar } from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';

export default function InfoUser(props) {
  const {
    userInfo: { photoURL, displayName, email },
    toasRef,
  } = props;

  const changeAvatar = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (granted) {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect:[4,3]
        });
        console.log(result);
    } else {
      toasRef.current.show("Es necesario aceptar los permisos de la galeria");
    }
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
