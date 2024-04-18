import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import LatestItemList from "../components/homeScreen/LatestItemList";
import { FlatList } from "react-native-gesture-handler";
import PostItem from "../components/homeScreen/PostItem";

const ItemList = () => {
  const route = useRoute();
  const { category } = route.params as { category: string };
  const [itemList, setItemList] = useState<any[]>([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const getItemsListByCategory = async () => {
    const q = query(
      collection(db, "UserPost"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    let data: any = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    console.log(data);
    setItemList(data);
  };

  useEffect(() => {
    category && getItemsListByCategory();
  }, [category]);
  return (
    <View>
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
          getItemsListByCategory();
        }}
        ListEmptyComponent={() => (
          <View className="flex justify-center items-center h-[80vh]">
            <Text className="text-[20px] font-bold">No item found</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ItemList;
