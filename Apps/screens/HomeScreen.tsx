import { View, Text, ScrollView, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/homeScreen/Header";
import Categories from "../components/homeScreen/Categories";
import LatestItemList from "../components/homeScreen/LatestItemList";
import Slider from "../components/homeScreen/Slider";
import { collection, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const [sliderList, setSliderList] = useState<any[]>([]);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [userPost, setUserPost] = useState<any[]>([]);

  // Get slider List From Firebase
  const getSliderList = async () => {
    try {
      setSliderList([]);
      const querySnapshot = await getDocs(collection(db, "Sliders"));
      querySnapshot.forEach((doc) => {
        setSliderList((prevState) => [...prevState, doc.data()]);
      });
    } catch (error) {
      console.log("Error getting slider ", error);
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
      console.log("Error getting categories: ", error);
    }
  };

  // Get latest post From Firebase
  const getLatestPostList = async () => {
    try {
      setUserPost([]);
      const querySnapshot = await getDocs(collection(db, "UserPost"));
      querySnapshot.forEach((doc) => {
        setUserPost((prevState) => [...prevState, doc.data()]);
      });
    } catch (error) {
      console.log("Error getting latest post ", error);
    }
  };

  useEffect(() => {
    getSliderList();
    getCategoryList();
    getLatestPostList();
  }, []);

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className="px-6">
        <Header />
        <Slider sliderList={sliderList} />
        <Categories categoryList={categoryList} />
        <LatestItemList userPost={userPost} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
