import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import MyProducts from "../screens/MyProducts";

const Stack = createStackNavigator();

const ProfileScreenStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="stack-profile"
        options={{ headerShown: false }}
        component={ProfileScreen}
      />

      <Stack.Screen
        name="my-products"
        component={MyProducts}
        options={{
          headerTitle: "My Products",

          headerStyle: {
            backgroundColor: "#3b82f6",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileScreenStackNavigator;
