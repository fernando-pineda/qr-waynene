import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Dialog } from "react-native-simple-dialogs";
import * as Speech from "expo-speech";
import { Image } from "react-native-elements";

const InformationModal = ({
  setDialogVisible,
  dialogVisible,
  name,
  info,
  imgUrl,
}) => {
  const speechOptions = {
    language: "es-419",
    pitch: 1,
  };

  return (
    <Dialog
      onShow={() => Speech.speak(info, speechOptions)}
      visible={dialogVisible}
      onTouchOutside={() => {
        setDialogVisible(false);
        console.log(imgUrl);
        Speech.stop();
      }}
      //   animationType={"slide"}
      title={"Información del lugar"}
    >
      <Text>{name}</Text>

      <Image
        style={{
          alignSelf: "center",
          borderRadius: 10,
          //   aspectRatio: 1.5,
          //   resizeMode: "contain",
          width: 100,
          height: 100,
        }}
        source={{ uri: imgUrl }}
      />

      <Text style={{ marginBottom: 10 }}>{info}</Text>
    </Dialog>
  );
};

export default InformationModal;
