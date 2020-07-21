import React, { Component } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.container}
        source={require("../assets/fondo.jpg")}
      >
        <Text style={styles.textTop}>¡HOLA!</Text>

        <Text style={styles.textBottom}>
          ¡Te damos la bienvenida a Way Nene, informacion y cultura!
        </Text>

        <ActivityIndicator
          size="large"
          color="#c70039"
          style={{ marginTop: 50 }}
        />

        <Image
          resizeMode="contain"
          source={require("../assets/imageMerida.png")}
          style={{
            position: "absolute",
            bottom: 0,
            width: 250,
            height: 250,
            left: 100,
          }}
        ></Image>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp("100%"),
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
    backgroundColor: "#898989",
  },
  textBottom: {
    fontWeight: "bold",
    paddingTop: 1,
    alignItems: "center",
    fontSize: 25,
    paddingTop: 10,
    color: "#f7f7f7",
    position: "relative",
    textAlign: "center",
  },
  textTop: {
    textAlign: "left",
    fontWeight: "bold",
    paddingBottom: 50,
    alignItems: "center",
    fontSize: 100,
    color: "white",
  },
  img: {
    width: "50%",
    position: "absolute",
    left: 0,
  },
});

export default LoadingScreen;
