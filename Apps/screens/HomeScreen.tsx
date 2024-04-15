import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/homeScreen/Header";
import Categories from "../components/homeScreen/Categories";
import LatestItemList from "../components/homeScreen/LatestItemList";
import Slider from "../components/homeScreen/Slider";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const HomeScreen = () => {
  const [sliderList, setSliderList] = useState<any[]>([]);
  const [categoryList, setCategoryList] = useState<any[]>([]);

  // Get slider List From Firebase
  const getSliderList = async () => {
    try {
      setSliderList([]);
      const querySnapshot = await getDocs(collection(db, "Sliders"));
      querySnapshot.forEach((doc) => {
        setSliderList((prevState) => [...prevState, doc.data()]);
      });
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
  };

  // Get Category List From Firebase
  const getCategoryList = async () => {
    try {
      setCategoryList([]);
      const querySnapshot = await getDocs(collection(db, "Category"));
      querySnapshot.forEach((doc) => {
        setCategoryList((prevState) => [...prevState, doc.data()]);
      });
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
  };

  useEffect(() => {
    getSliderList();
    getCategoryList();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View className="px-6 h-full">
          <Header />
          <Slider sliderList={sliderList} />
          <Categories categoryList={categoryList} />
          <LatestItemList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
