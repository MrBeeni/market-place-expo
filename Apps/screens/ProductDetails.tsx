import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Button,
  Share,
} from "react-native";
import React, { FC, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ProductDetails: FC<any> = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params as { item: any };
  const sendEmailMassage = () => {
    const subject = `Regarding ${item.title}`;
    const body = `Hi ${item.userName}, I am interested in your product ${item.title}`;
    Linking.openURL(`mailto:${item.userEmail}?subject=${subject}&body=${body}`);
  };

  const shareProduct = async () => {
    try {
      await Share.share({
        message: `Hi, I found this product ${item.title} on this app. Check it out.`,
      });
    } catch (error) {
      console.log("Error sharing product: ", error);
    }
  };
  const shareButton = () => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          style={{ marginRight: 16 }}
          onPress={() => shareProduct()}
          name="share-social-sharp"
          size={24}
          color="white"
        />
      ),
    });
  };

  useEffect(() => {
    navigation && shareButton();
  }, [navigation]);
  return (
    <ScrollView className="h-full w-full bg-white">
      <Image source={{ uri: item?.image }} className="h-[320px] w-full " />
      <View className="px-6 pt-2">
        <Text className="text-[24px] font-bold">{item.title}</Text>
        <View className="flex flex-row mt-1">
          <Text className="text-[12px]  bg-blue-50 rounded-md p-1">
            {item.category}
          </Text>
        </View>
        <Text className="text-[20px] mt-3 font-bold">Description</Text>
        <Text className="text-[17px] text-gray-500">{item.description}</Text>
        {/* <Text className="text-[20px] font-bold text-blue-500">
          $ {item.price}
        </Text> */}
      </View>
      {/* user info */}
      <View className="px-6 py-4 mt-4 flex flex-row items-center bg-blue-100">
        <Image
          source={{ uri: item?.userImage }}
          className="h-12 w-12 rounded-full "
        />
        <View className="ml-2">
          <Text className="font-bold text-[18px]">{item.userName}</Text>
          <Text className="text-gray-500">{item.userEmail}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => sendEmailMassage()}
        className=" bg-blue-600 p-3 m-2 rounded-full"
      >
        <Text className="text-white text-center text-[14px]">Send message</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProductDetails;
