import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { FC } from "react";

interface CategoriesProps {
  categoryList: any[];
}

const Categories: FC<CategoriesProps> = ({ categoryList }) => {
  return (
    <View className="mt-5">
      <Text className="font-bold text-[20px]">Categories</Text>
      <FlatList
        className="mt-2"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={categoryList}
        renderItem={({ item, index }) => (
          <TouchableOpacity className=" border-[1px] border-gray-300 bg-blue-50 p-3 mr-2 rounded-md flex items-center justify-center ">
            <Image
              key={index}
              source={{ uri: item?.icon }}
              className="h-[40px] w-[40px] rounded-md object-contain "
            />
            <Text className="text-center  mt-2">{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Categories;
