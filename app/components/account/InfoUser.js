import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from "react-native-elements";

export default function InfoUser(props){
    const {userInfo} = props;
    //console.log(userInfo);
    return (
        <View style={styles.viewUserInfo}>
            <Avatar  
            rounded
            size="large"
            showEditButton
            title="FN"
            containerStyle={styles.userInfoAvatar}
            />
            <View>
                <Text style={styles.displayName}>
                    Felix Javier Nuñez
                </Text>
                <Text>
                    felixjavier0@gmail.com
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo:{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#cbcbcb",
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar:{
        marginRight: 20
    },
    displayName:{
        fontWeight: "bold",
        paddingBottom: 8
    }
});