import React, { useState, useEffect } from "react";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/components/StackNavigator";
import LoadingScreen from "./src/components/LoadingScreen";

export default function App() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 4000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <StackNavigator />
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
