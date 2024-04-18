import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductDetails from "../screens/ProductDetails";
import ExploreScreen from "../screens/ExploreScreen";

const Stack = createStackNavigator();

const ExploreScreenStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="stack-explore"
        options={{ headerShown: false }}
        component={ExploreScreen}
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

export default ExploreScreenStackNavigator;
