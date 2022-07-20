import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Restaurants from "../screens/restaurants/Restaurants";
import AddRestaurant from "../screens/restaurants/AddRestaurant";

const Stack = createStackNavigator();

export default function RestaurantsStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="restaurants" 
            component={Restaurants}
            options={{title: "Restaurantes"}} />
            
            <Stack.Screen 
            name="addrestaurant" 
            component={AddRestaurant}
            options={{
                title: "Añadir nuevo restaurante"
            }}
            />
        </Stack.Navigator>
    );
}
