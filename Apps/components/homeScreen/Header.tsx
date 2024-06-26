import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  const { user } = useUser();

  return (
    <View>
      {/* user info section */}
      <View className="flex-row items-center gap-2">
        <Image
          source={{ uri: user?.imageUrl }}
          className="rounded-full h-10 w-10"
        />
        <View>
          <Text className="text-[16px]">Welcome</Text>
          <Text className="text-[20px] font-bold">{user?.fullName}</Text>
        </View>
      </View>
      {/* search bar */}
      <View className="bg-blue-50 p-2 px-5  mt-5 flex-row items-center rounded-full border-[1px]  border-blue-300">
        <Ionicons name="search" size={24} color="gray" />
        <TextInput placeholder="Search" className="ml-2 text-[18px]" />
      </View>
    </View>
  );
};

export default Header;
