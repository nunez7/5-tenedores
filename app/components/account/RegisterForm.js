import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Input, Icon, Button} from "react-native-elements"

export default function RegisterForm(){
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [formData, setFormData] = useState(defaulFormValue());

    const onSubmit = () =>{
        console.log(formData);
    }

    const onChange = (e, type) =>{
        //console.log(type);
        //console.log(e);
        //setFormData({[type]: e.nativeEvent.text})
        setFormData({...formData, [type]: e.nativeEvent.text});
    }
     
    return (
        <View style={styles.formContainer}>
            <Input placeholder="Correo electrónico" 
            containerStyle={styles.inputForm}
            onChange={(e) => onChange(e, "email")} 
            rightIcon={
                <Icon type="material-community"
                name="at" 
                iconStyle={styles.iconRight} />
            }
            />
            <Input placeholder="Contraseña" 
            containerStyle={styles.inputForm} 
            password={true}
            secureTextEntry={showPassword ? false: true}
            onChange={(e) => onChange(e, "password")}
            rightIcon={
                <Icon type="material-community"
                name={showPassword ? "eye-off-outline": "eye-outline"} 
                iconStyle={styles.iconRight} 
                onPress={()=> setShowPassword(!showPassword)}
                />
            }
             />
            <Input placeholder="Repetir contraseña"
            password={true}
            secureTextEntry={showRepeatPassword ? false: true}
            containerStyle={styles.inputForm} 
            onChange={(e) => onChange(e, "repeatPassword")}
            rightIcon={
                <Icon type="material-community"
                name={showRepeatPassword ? "eye-off-outline": "eye-outline"}
                iconStyle={styles.iconRight}
                onPress={()=> setShowRepeatPassword(!showRepeatPassword)}
                 />
            }
            />
            <Button title="Unirse"
            containerStyle={styles.btnUnirse} 
            buttonStyle={styles.btnRegister} 
            onPress={onSubmit}
            />
        </View> 
    );
}

function defaulFormValue(){
    return {
        email: "",
        password: "",
        repeatPassword: "",
    }
}

const styles = StyleSheet.create({
    formContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    inputForm:{
        width: "100%",
        marginTop: 20,
    },
    btnUnirse:{
        marginTop: 20,
        width: "95%"
    },
    btnRegister:{
        backgroundColor: "#00a680",
    },
    iconRight:{
        color: "#c1c1c1"
    },
});