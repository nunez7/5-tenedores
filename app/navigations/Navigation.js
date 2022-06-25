import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import RestaurantsStack from "./RestaurantsStack";
import FavoritesStack from "./FavoritesStack";
import TopRestaurantsStack from "./TopRestaurantsStack";
import SearchStack from "./SearchStack";
import AccountStack from "./AccountStack";

const Tab = createBottomTabNavigator();

export default function Navigation(){
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="restaurantsn" 
                component={RestaurantsStack} 
                options={{title: "Restaurantes", headerShown: false}} />

                <Tab.Screen name="favoritesn" 
                component={FavoritesStack}
                options={{title: "Favoritos", headerShown: false}} />

                <Tab.Screen name="top-restaurantsn" 
                component={TopRestaurantsStack}
                options={{title: "Top 5", headerShown: false}} />

                <Tab.Screen name="searchn" 
                component={SearchStack}
                options={{title: "Buscar", headerShown: false}} />

                <Tab.Screen name="accountn" 
                component={AccountStack}
                options={{title: "Cuenta", headerShown: false}} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}