import { View, Text, FlatList, Image } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
interface SliderProps {
  sliderList: any[];
}
const Slider: FC<SliderProps> = ({ sliderList }) => {
  return (
    <View className="mt-5">
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={sliderList}
        renderItem={({ item, index }) => (
          <View>
            <Image
              key={index}
              source={{ uri: item?.image }}
              className="h-[150px] w-[330px] mr-2 rounded-md object-contain "
            />
          </View>
        )}
      />
    </View>
  );
};

export default Slider;
