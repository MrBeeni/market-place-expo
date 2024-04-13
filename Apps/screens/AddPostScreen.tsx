import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { useFormik } from "formik";
import { TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const AddPostScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [categoryList, setCategoryList] = useState<any[]>([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      address: "",
      image: "",
      price: "",
    },
    // validate: (value) => {
    //   const errors: any = {};
    //   if (!value.title) {
    //     ToastAndroid.show("Title is required", ToastAndroid.SHORT);
    //     errors.title = "Title is required";
    //   }
    //   if (!value.description) {
    //     ToastAndroid.show("Description is required", ToastAndroid.SHORT);
    //     errors.description = "Description is required";
    //   }
    //   if (!value.category) {
    //     ToastAndroid.show("Category is required", ToastAndroid.SHORT);
    //     errors.category = "Category is required";
    //   }
    //   if (!value.address) {
    //     ToastAndroid.show("Address is required", ToastAndroid.SHORT);
    //     errors.address = "Address is required";
    //   }
    // if (!value.image) {
    //   ToastAndroid.show("Image is required", ToastAndroid.SHORT);
    //   errors.image = "Image is required";
    // }
    //   if (!value.price) {
    //     ToastAndroid.show("Price is required", ToastAndroid.SHORT);
    //     errors.price = "Price is required";
    //   }
    // return errors;
    // },
    onSubmit: async (values, { resetForm }) => {
      const res = await fetch(values.image);
      const blobFile = await res.blob();
      const imageRef = ref(storage, `communityPost/${Date.now()}.jpg`);
      uploadBytes(imageRef, blobFile).then(async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        values["image"] = downloadURL as string;
        const docRef = await addDoc(collection(db, "UserPost"), values);
        if (docRef.id)
          ToastAndroid.show("Post Added Successfully", ToastAndroid.SHORT);
        else ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      });
      resetForm();
      setImage(null);
    },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      formik.setFieldValue("image", result.assets[0].uri);
      setImage(result.assets[0].uri);
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
    getCategoryList();
  }, []);
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View className="px-8 py-14">
        <Text className="text-3xl font-bold">Add new post</Text>
        <Text className="text-lg text-gray-500">
          Create new post and start selling
        </Text>
        <View className="flex flex-col gap-5 pt-8">
          <TouchableOpacity onPress={pickImage}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />
            ) : (
              <Image
                source={require("../../assets/image/imagePlaceholder.jpg")}
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />
            )}
          </TouchableOpacity>
          <TextInput
            placeholder="Title"
            style={styles.input}
            value={formik.values.title}
            onChangeText={formik.handleChange("title")}
          />
          <TextInput
            placeholder="Description"
            style={styles.input}
            numberOfLines={4}
            multiline={true}
            textAlignVertical="top"
            value={formik.values.description}
            onChangeText={formik.handleChange("description")}
          />
          <TextInput
            placeholder="Price"
            style={styles.input}
            value={formik.values.price}
            keyboardType="number-pad"
            onChangeText={formik.handleChange("price")}
          />
          <TextInput
            placeholder="Address"
            style={styles.input}
            numberOfLines={3}
            multiline={true}
            textAlignVertical="top"
            value={formik.values.address}
            onChangeText={formik.handleChange("address")}
          />
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
            }}
          >
            <Picker
              selectedValue={formik.values.category}
              onValueChange={(itemValue) =>
                formik.setFieldValue("category", itemValue)
              }
            >
              {categoryList?.map((category, index) => (
                <Picker.Item
                  key={`${category.name}-${index}`}
                  label={category.name}
                  value={category.name}
                />
              ))}
            </Picker>
          </View>

          <TouchableOpacity
            onPress={() => formik.handleSubmit()}
            className="flex items-center justify-center   bg-blue-700 p-3 rounded-[10px]"
          >
            <Text className="text-white text-[17px]">Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 17,
    fontSize: 17,
  },
});
