import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ItemList from "../screens/ItemList";
import ProductDetails from "../screens/ProductDetails";

const Stack = createStackNavigator();

const HomeScreenStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="stack-home"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="item-list"
        component={ItemList}
        options={({ route }) => ({
          title: (route.params as { category: string })?.category,

          headerStyle: {
            backgroundColor: "#3b82f6",
          },
          headerTintColor: "#fff",
        })}
      />
      <Stack.Screen
        name="product-details"
        component={ProductDetails}
        options={{
          headerTitle: "Details",

          headerStyle: {
            backgroundColor: "#3b82f6",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreenStackNavigator;
