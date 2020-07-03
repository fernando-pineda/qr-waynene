import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { firebase } from "./src/firebase/config";
import AsyncStorage from "@react-native-community/async-storage";
import FirstBootScreen from "./src/components/FirstBootScreen";
import InformationModal from "./src/components/InformationModal";
import LoadingScreen from "./src/components/LoadingScreen";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isFirstBoot, setFirstBoot] = useState();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [placeName, setPlaceName] = useState("");
  const [placeInfo, setPlaceInfo] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    checkFirstBoot();

    setTimeout(() => setLoading(false), 4000);
  }, []);

  const checkFirstBoot = async () => {
    try {
      const value = await AsyncStorage.getItem("isFirstBoot");
      console.log(value);
      value == null || value == undefined
        ? setFirstBoot(true)
        : setFirstBoot(false);
    } catch (e) {
      console.log(`Something went wrong. ${e}`);
    }
  };

  const fetchFirebase = (name) => {
    firebase
      .database()
      .ref(`/places/${name}`)
      .once("value")
      .then((snapshot) => {
        let data = snapshot.val();
        // console.log(data.title);
        setPlaceName(data.title);
        setPlaceInfo(data.info);
        setImgUrl(data.imgUrl);
        setDialogVisible(true);
      });
  };

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    console.log("Scanned", data);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    fetchFirebase(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (isFirstBoot) {
    return <FirstBootScreen setFirstBoot={setFirstBoot} />;
  } else if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundColor: "white",
      }}
    >
      <InformationModal
        setDialogVisible={setDialogVisible}
        dialogVisible={dialogVisible}
        name={placeName}
        info={placeInfo}
        imgUrl={imgUrl}
      />

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}
