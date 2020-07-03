import React from "react";
import { Image, Text, View, StyleSheet, ActivityIndicator } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTop}>BIENVENIDO A MÉRIDA</Text>

      {/* <Image
        style={{ marginLeft: 50 }}
        source={require("./Img/logo.png")}
      ></Image> */}

      <Text style={styles.textBottom}>¡Hay mucho por ver 📌🗿!</Text>

      <ActivityIndicator size="large" color="#c70039" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ECCE51",
    alignSelf: "center",
  },
  textBottom: {
    fontWeight: "bold",
    paddingTop: 1,
    alignItems: "center",
    fontSize: 30,
    paddingTop: 10,
    color: "white",
  },
  textTop: {
    fontWeight: "bold",
    paddingBottom: 50,
    alignItems: "center",
    fontSize: 35,
    color: "white",
  },
});

export default LoadingScreen;
