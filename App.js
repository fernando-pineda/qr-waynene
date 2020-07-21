import React, { useState, useEffect } from "react";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/components/StackNavigator";
import FirstBootScreen from "./src/components/FirstBootScreen";
import LoadingScreen from "./src/components/LoadingScreen";
import { AsyncStorage } from "react-native";

export default function App() {
  const [isFirstBoot, setFirstBoot] = useState(true);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    checkFirstBoot();

    setTimeout(() => setLoading(false), 4000);
  }, []);

  const checkFirstBoot = async () => {
    try {
      const value = await AsyncStorage.getItem("isFirstBoot");
      value == null || value == undefined
        ? setFirstBoot(true)
        : setFirstBoot(false);
    } catch (e) {
      console.log(`Something went wrong. ${e}`);
    }
  };

  if (isFirstBoot) {
    return <FirstBootScreen setFirstBoot={setFirstBoot} />;
  } else if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <StackNavigator />
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
