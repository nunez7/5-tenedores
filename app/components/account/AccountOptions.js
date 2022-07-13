import React, {useState} from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { map } from "lodash";
import Modal from "./Modal";

export default function AccountOptions(props) {
  const { userInfo, toasRef } = props;
  const [showModal, setShowModal] = useState(true);

  const selectedComponent = (key) => {
    console.log("CLIC ");
    console.log(key);
  };

  const menuOptions = generateOptions(selectedComponent);

  return (
    <View>
      {map(menuOptions, (menu, i) => (
        <ListItem
          key={i}
          containerStyle={styles.menuItem}
          onPress={menu.onPress}
          >
          <Icon type={menu.iconType} name={menu.iconNameLeft} color={menu.iconColorLeft} />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <Icon type={menu.iconType} name={menu.iconNameRight} color={menu.iconColorRight} />
        </ListItem>
      ))}
      <Modal isVisible={showModal} setIsVisible={setShowModal} >
        <Text>Hola mundo</Text>
      </Modal>
    </View>
  );
}

function generateOptions(selectedComponent) {
  return [
    {
      title: "Cambiar nombre y apellidos",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#CCC",
      onPress: () => selectedComponent("displayName"),
    },
    {
      title: "Cambiar e-mail",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#CCC",
      onPress: () => selectedComponent("email"),
    },
    {
      title: "Cambiar contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#CCC",
      onPress: () => selectedComponent("password"),
    },
  ];
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
});
