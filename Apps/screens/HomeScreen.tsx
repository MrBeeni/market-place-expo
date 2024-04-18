import { View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/homeScreen/Header";
import Categories from "../components/homeScreen/Categories";
import LatestItemList from "../components/homeScreen/LatestItemList";
import Slider from "../components/homeScreen/Slider";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const [sliderList, setSliderList] = useState<any[]>([]);
  const [categoryList, setCategoryList] = useState<any[]>([]);

  // Get slider List From Firebase
  const getSliderList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Sliders"));
      let data: any = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setSliderList(data);
    } catch (error) {
      console.log("Error getting slider ", error);
    }
  };

  // Get Category List From Firebase
  const getCategoryList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Category"));
      let data: any = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setCategoryList(data);
    } catch (error) {
      console.log("Error getting categories: ", error);
    }
  };

  useEffect(() => {
    getSliderList();
    getCategoryList();
  }, []);

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-6">
        <Header />
        <Slider sliderList={sliderList} />
        <Categories categoryList={categoryList} />
        <LatestItemList />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
