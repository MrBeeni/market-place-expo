import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  LayoutChangeEvent,
  TouchableOpacity,
} from "react-native";
import React, { FC } from "react";
import PostItem from "./PostItem";

interface LatestItemListProps {
  userPost: any[];
}

const LatestItemList: FC<LatestItemListProps> = ({ userPost }) => {
  return (
    <View className="mt-5">
      <Text className="font-bold text-[20px]">Latest item</Text>

      <FlatList
        data={userPost}
        numColumns={2}
        contentContainerStyle={{ gap: 8 }}
        columnWrapperStyle={{ gap: 8 }}
        renderItem={({ item, index }) => <PostItem item={item} />}
      />
    </View>
  );
};

export default LatestItemList;
