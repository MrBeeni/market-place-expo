import { View, Text, FlatList } from "react-native";
import React, { FC, useEffect, useState } from "react";
import PostItem from "./PostItem";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface LatestItemListProps {}

const LatestItemList: FC<LatestItemListProps> = () => {
  const [isRefresh, setIsRefresh] = useState(false);
  const [userPost, setUserPost] = useState<any[]>([]);

  // Get latest post From Firebase
  const getLatestPostList = async () => {
    try {
      const q = query(collection(db, "UserPost"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      let data: any = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setUserPost(data);
      setIsRefresh(false);
    } catch (error) {
      console.log("Error getting latest post ", error);
    }
  };

  useEffect(() => {
    getLatestPostList();
  }, []);
  return (
    <View className="mt-5 h-[270px]">
      <Text className="font-bold text-[20px]">Latest item</Text>

      <FlatList
        data={userPost}
        numColumns={2}
        contentContainerStyle={{ gap: 8 }}
        columnWrapperStyle={{ gap: 8 }}
        renderItem={({ item, index }) => <PostItem item={item} />}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        refreshing={isRefresh}
        onRefresh={() => {
          setIsRefresh(true);
          getLatestPostList();
        }}
      />
    </View>
  );
};

export default LatestItemList;
