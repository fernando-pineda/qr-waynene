import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import { Dialog } from "react-native-simple-dialogs";
import * as Speech from "expo-speech";
import { Image } from "react-native-elements";
import { savePlace } from "../library/storage/storageFunctions";
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const InformationModal = ({
  setDialogVisible,
  dialogVisible,
  place,
  isTTSEnabled,
}) => {
  const speechOptions = {
    language: "es-419",
    pitch: 1,
  };

  const handleSavePlace = () => {
    savePlace(place);
    setDialogVisible(false);
    Speech.stop();
  };
  return (
    <Dialog
      animationType={"slide"}
      dialogStyle={{
        borderRadius: 15,
        width: screenWidth - 20,
        alignSelf: "center",
      }}
      overlayStyle={{
        display: "flex",
        // flexDirection: "row-reverse",
        padding: 0,
        backgroundColor: "transparent",
      }}
      onShow={() => {
        if (isTTSEnabled) {
          Speech.speak(place.info, speechOptions);
        }
      }}
      visible={dialogVisible}
      onTouchOutside={() => {
        setDialogVisible(false);
        Speech.stop();
      }}
    >
      <Text style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold" }}>
        {place.title}
      </Text>

      <View
        style={{
          alignSelf: "center",
          width: 250,
          height: 200,
        }}
      >
        <Image
          style={{
            borderRadius: 5,
            aspectRatio: 1.5,
            resizeMode: "contain",
            alignSelf: "center",
            width: 250,
            height: 200,
          }}
          source={{ uri: place.imgUrl }}
        />
      </View>

      <Text style={{ marginBottom: 10, fontSize: 18, textAlign: "justify" }}>
        {place.info}
      </Text>
      <Button
        color="#0490CB"
        style={{
          marginBottom: 10,
          borderRadius: 20,
          width: 50,
        }}
        title="GUARDAR EN LA BIBLIOTECA"
        onPress={() => handleSavePlace()}
      />
    </Dialog>
  );
};

export default InformationModal;
