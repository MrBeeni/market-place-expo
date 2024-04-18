import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import PostItem from "../components/homeScreen/PostItem";
import { SafeAreaView } from "react-native-safe-area-context";

const ExploreScreen = () => {
  const [itemList, setItemList] = useState<any[]>([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const getAllProducts = async () => {
    const q = query(collection(db, "UserPost"));
    const querySnapshot = await getDocs(q);
    let data: any = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    setIsRefresh(false);
    setItemList(data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <SafeAreaView className="flex-1 h-full w-full">
      <Text className="text-2xl font-bold text-center">Explore more</Text>
      <FlatList
        data={itemList}
        numColumns={2}
        contentContainerStyle={{ gap: 8 }}
        columnWrapperStyle={{ gap: 8 }}
        renderItem={({ item, index }) => <PostItem item={item} />}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        refreshing={isRefresh}
        onRefresh={() => {
          setIsRefresh(true);
          getAllProducts();
        }}
        ListEmptyComponent={() => (
          <View className="flex justify-center items-center h-[80vh]">
            <Text className="text-[20px] font-bold">No item found</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ExploreScreen;
