import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddPostScreen from "../screens/AddPostScreen";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreenStackNavigator from "./HomeScreenStackNavigator";
import ExploreScreenStackNavigator from "./ExploreScreenStackNavigator";
import ProfileScreenStackNavigator from "./ProfileScreenStackNavigator";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="home"
        component={HomeScreenStackNavigator}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, paddingBottom: 3, fontSize: 14 }}>
              Home
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="explore"
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, paddingBottom: 3, fontSize: 14 }}>
              Explore
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
        component={ExploreScreenStackNavigator}
      />
      <Tab.Screen
        name="addpost"
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, paddingBottom: 3, fontSize: 14 }}>
              Add Post
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="camera" size={size} color={color} />
          ),
        }}
        component={AddPostScreen}
      />
      <Tab.Screen
        name="profile"
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, paddingBottom: 3, fontSize: 14 }}>
              Profile
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }}
        component={ProfileScreenStackNavigator}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
