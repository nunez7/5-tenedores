import React, {useState} from "react";
import {StyleSheet, ScrollView, View, Text} from "react-native";
import {Icon, Avatar, Image, Input, Button} from "react-native-elements";

export default function AddRestaurantForm(props){
    const {toastRef, setIsLoading, navigation} = props;

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");

    const addRestaurant = () =>{
        console.log("Ok");
    }

    return (
        <ScrollView style={styles.scrollView}>
            <FormAdd 
                setName={setName} 
                setAddress={setAddress}
                setDescription={setDescription}
            />
            <Button 
                title="Crear restaurante"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            />
        </ScrollView>
    );
}

function FormAdd(props){
    const {setName, setAddress, setDescription} = props;
    
    return (
        <View style={styles.viewForm}>
            <Input 
                placeholder="Nombre del restaurante"
                containerStyle= {styles.input}
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
                onChange={(e)=> setDescription(e.nativeEvent.text)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView:{
        height: "100%",
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10,
    },
    input:{
        marginBottom: 10,
    },
    textarea:{
        height: 100,
        width: "100%",
        padding: 0,
        margin: 0
    },
    btnAddRestaurant:{
        backgroundColor: "#00a680",
        margin: 20,
    }
});