import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";

interface PostItemProps {
  item: any;
}

const PostItem: FC<PostItemProps> = ({ item }) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("product-details", { item });
      }}
      className="flex-1 p-2 border-slate-200 border-[1px] rounded-md "
    >
      <Image
        source={{ uri: item?.image }}
        className="h-[150px] w-full rounded-md"
      />
      <View className="flex flex-row mt-1">
        <Text className="text-[12px]  bg-blue-50 rounded-md p-1">
          {item.category}
        </Text>
      </View>
      <Text className="text-[15px] font-bold">{item.title}</Text>
      <Text className="text-[20px] font-bold text-blue-500">
        $ {item.price}
      </Text>
    </TouchableOpacity>
  );
};

export default PostItem;
