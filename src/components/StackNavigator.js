import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  AsyncStorage,
  Dimensions,
  RefreshControl,
} from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { firebase } from "../firebase/config";
import InformationModal from "./InformationModal";
import { showMessage } from "react-native-flash-message";
import { Image, Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { removePlace } from "../library/storage/storageFunctions";
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
import { FloatingAction } from "react-native-floating-action";

function Places({ navigation }) {
  const [places, setPlaces] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getPlaces();

    navigation.addListener("focus", () => {
      onRefresh();
      console.log("Refresh done");
    });
  }, []);

  const onRefresh = () => {
    setRefresh(true);
    getPlaces();
    setTimeout(() => {
      setRefresh(false);
    }, 150);
  };

  const getPlaces = async () => {
    let data = await AsyncStorage.getItem("PLACES");
    let parsedData = JSON.parse(data);
    setPlaces(parsedData);
  };

  const deletePlace = (place) => {
    removePlace(place);
    setTimeout(() => {
      onRefresh();
    }, 150);
  };

  const renderPlaces = () => {
    return places.map((element, index) => {
      return (
        <View key={index} style={{ flex: 1, alignSelf: "center" }}>
          <Card
            containerStyle={{
              width: screenWidth - 25,
              height: 300,
            }}
          >
            <View style={{ flexDirection: "column", display: "flex" }}>
              <Text>{element.title}</Text>
              <Image
                style={{
                  alignSelf: "center",
                  borderRadius: 10,
                  aspectRatio: 1.5,
                  resizeMode: "contain",
                  width: 100,
                  height: 100,
                }}
                source={{ uri: element.imgUrl }}
              />

              <Text>{element.info}</Text>
              <Button title="REMOVE" onPress={() => deletePlace(element)} />
            </View>
          </Card>
        </View>
      );
    });
  };

  return (
    <View style={{ paddingTop: 50 }}>
      <ScrollView
        style={{
          flexDirection: "column",
          display: "flex",
        }}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => onRefresh()}
            tintColor="red"
          />
        }
      >
        {renderPlaces()}
      </ScrollView>
    </View>
  );
}

function Configuration() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Configuration!</Text>
    </View>
  );
}

function Camera() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [place, setPlace] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [color, setColor] = useState("gray");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const fetchFirebase = (name) => {
    if (name.charAt(0) == "_") {
      firebase
        .database()
        .ref(`/places/${name}`)
        .once("value")
        .then((snapshot) => {
          let data = snapshot.val();
          setPlace(data);
          setDialogVisible(true);
        })
        .catch((e) => console.log(e, "Something went wrong"));
    } else {
      showMessage({
        message: "ERROR",
        description: "Invalid QR code. Please, try again",
        type: "info",
      });
    }
  };

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setColor("gray");
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

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundColor: "white",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        // style={StyleSheet.absoluteFillObject}
        style={{
          height: screenHeight - 115,
          width: screenWidth,
        }}
      />

      <FloatingAction
        color="white"
        showBackground={false}
        position="center"
        animated={false}
        onPressMain={() => {
          setScanned(false);
          setColor("#0490CB");
        }}
        floatingIcon={<Feather name="circle" color={color} size={25} />}
      />

      <InformationModal
        setDialogVisible={setDialogVisible}
        dialogVisible={dialogVisible}
        place={place}
      />
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

function StackNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Camera"
      activeColor="#0490CB"
      inactiveColor="#8FDEFE"
      barStyle={{ backgroundColor: "#F0F0F0" }}
    >
      <Tab.Screen
        name="Places"
        component={Places}
        options={{
          tabBarLabel: "Places",
          tabBarColor: "",
          tabBarIcon: ({ color }) => (
            <EvilIcons name="image" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={Camera}
        options={{
          tabBarLabel: "Camera",
          tabBarIcon: ({ color }) => (
            <Feather name="circle" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Configuration"
        component={Configuration}
        options={{
          tabBarLabel: "Configuration",
          tabBarIcon: ({ color }) => (
            <EvilIcons name="gear" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default StackNavigator;
