import React, {useState, useEffect} from "react";
import {StyleSheet, View, Text} from "react-native";
import { Icon } from "react-native-elements";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import {firebaseApp} from "../../utils/firebase";


export default function Restaurants(props){
    const {navigation } = props;

    const [user, setUser] = useState(null);
    //verificamos el estado del user
    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        onAuthStateChanged(auth, (user) => {
          //console.log(user);
          !user ? setUser(false) : setUser(true);
        });
      }, []);
    

    return (
        <View style={styles.viewBody}>
            <Text>Restaurants...</Text>
            {user && (
            <Icon
                reverse
                type="material-community"
                name="plus"
                color="#00a680"
                containerStyle={styles.btnContainer}
                onPress={() => navigation.navigate("addrestaurant")}
            />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody:{
        flex: 1,
        backgroundColor: "#FFF",
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset:{width: 2, height: 2},
        shadowOpacity: 0.5,
    }
});