import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Dialog } from "react-native-simple-dialogs";
import * as Speech from "expo-speech";
import { Image } from "react-native-elements";
import { savePlace } from "../library/storage/storageFunctions";

const InformationModal = ({ setDialogVisible, dialogVisible, place }) => {
  const speechOptions = {
    language: "es-419",
    pitch: 1,
  };

  if (place.length == 0) {
    return <></>;
  }

  const handleSavePlace = () => {
    savePlace(place);
    setDialogVisible(false);
    Speech.stop();
  };
  return (
    <Dialog
      onShow={() => Speech.speak(place.info, speechOptions)}
      visible={dialogVisible}
      onTouchOutside={() => {
        setDialogVisible(false);
        Speech.stop();
      }}
      //   animationType={"slide"}
      title={"Información del lugar"}
    >
      <Text>{place.title}</Text>

      <Image
        style={{
          alignSelf: "center",
          borderRadius: 10,
          aspectRatio: 1.5,
          resizeMode: "contain",
          width: 100,
          height: 100,
        }}
        source={{ uri: place.imgUrl }}
      />

      <Text style={{ marginBottom: 10 }}>{place.info}</Text>
      <Button title="SAVE" onPress={() => handleSavePlace()} />
    </Dialog>
  );
};

export default InformationModal;
