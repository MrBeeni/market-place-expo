import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
const diary = require("../../assets/image/diary.png");
const search = require("../../assets/image/search.png");
const link = require("../../assets/image/www.png");
const logout = require("../../assets/image/logout.png");

const ProfileScreen = () => {
  const { user } = useUser();
  const navigation = useNavigation<any>();
  const menuList = [
    { id: "1", path: "my-products", name: "My product", image: diary },
    { id: "2", path: "explore", name: "Explore", image: search },
    { id: "3", name: "Portfolio", image: link },
    { id: "4", name: "Logout", image: logout },
  ];
  return (
    <SafeAreaView className="h-full w-full bg-white">
      <View className="flex items-center">
        <Image
          className="w-[150px] h-[150px] rounded-full"
          source={{ uri: user?.imageUrl }}
        />
        <Text className="font-bold text-[25px]">{user?.fullName}</Text>
        <Text className="text-[18px] text-gray-500">
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
      <FlatList
        className="mt-4"
        data={menuList}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              if (item.path) {
                navigation.navigate(item.path);
              }
            }}
            className=" flex-1 items-center p-5 border-[1px] mx-2 mt-4 rounded-lg border-blue-400 bg-blue-50"
          >
            <Image source={item.image} className="w-[60px] h-[60px]" />
            <Text className="text-center mt-1">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
