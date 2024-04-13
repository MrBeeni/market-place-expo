import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleLogin = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive && setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View className="">
      <Image
        className="w-full h-[400px] object-cover"
        source={require("../../assets/image/login.jpg")}
      />
      <View className="p-4 mt-[-20px] bg-white rounded-t-3xl">
        <Text className="text-[28px] ">Community Marketplace</Text>
        <Text className="text-[18px] text-slate-500 mt-8">
          Buy sell Marketplace where you can sell old stuff and buy new stuff
        </Text>
        <TouchableOpacity
          onPress={handleGoogleLogin}
          className="mt-14 bg-blue-500 rounded-full p-3"
        >
          <Text className="text-white text-center text-[18px]">
            Get started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
