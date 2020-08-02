import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  AsyncStorage,
  Dimensions,
  RefreshControl,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Header, Card, CheckBox } from "react-native-elements";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { firebase } from "../firebase/config";
import InformationModal from "./InformationModal";
import { showMessage } from "react-native-flash-message";
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
      // console.log("Refresh done");
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

  if (places === null) {
    places = [];
  }

  const renderPlaces = () => {
    if (places.length == 0) {
      return (
        <View
          style={{
            width: screenWidth,
            height: screenHeight - 110,
            flexDirection: "row",
            display: "flex",
          }}
        >
          <View
            style={{
              alignSelf: "center",
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                alignSelf: "center",
                fontSize: 45,
              }}
            >
              ¡Uay!
            </Text>

            <Text
              style={{
                // fontWeight: "bold",
                alignSelf: "center",
                fontSize: 17,
              }}
            >
              ¿Por qué no visitas y escaneas algún sitio?
            </Text>
          </View>
        </View>
      );
    } else {
      return places.map((element, index) => {
        return (
          <Card
            key={index}
            title={element.title}
            containerStyle={{
              width: screenWidth - 25,
              // height: 450,
              borderRadius: 20,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 2 }}>
              <ImageBackground
                source={{ uri: element.imgUrl }}
                style={{ height: 150 }}
              />
            </View>

            <View style={{ flex: 2 }}>
              <Text style={{ margin: 10, textAlign: "justify" }}>
                {element.info}
              </Text>
            </View>

            <View style={{ flex: 0 }}>
              <Button
                icon={<Icon name="trash" size={30} color="#0490CB" />}
                onPress={() => deletePlace(element)}
                type="outline"
                // style={{ alignSelf: "flex-end", }}
              />
            </View>
          </Card>
        );
      });
    }
  };

  return (
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
  );
}

function Configuration() {
  const [isTTSEnabled, setTTSvalue] = useState(true);

  const handleTTS = async (value) => {
    setTTSvalue(value);
    await AsyncStorage.setItem("isTTSEnabled", JSON.stringify(value));
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <CheckBox
        title="Habilitar Text-To-Speech"
        checked={isTTSEnabled}
        onPress={() => handleTTS(!isTTSEnabled)}
      />
    </View>
  );
}

function Camera({ navigation }) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [place, setPlace] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [color, setColor] = useState("gray");
  const [easter, setEaster] = useState(0);
  const [isTTSEnabled, setTTSvalue] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    navigation.addListener("focus", async () => {
      getTTSvalue().then((value) => {
        setTTSvalue(JSON.parse(value));
        console.log(isTTSEnabled);
      });
    });
  }, []);

  const getTTSvalue = async () => {
    try {
      const data = await AsyncStorage.getItem("isTTSEnabled");
      const parsedData = JSON.parse(data);
      return parsedData;
    } catch (e) {
      console.log(`Something happened: ${e}`);
    }
  };

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
        description: "Código QR inválido",
        type: "info",
      });
    }
  };

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setColor("gray");
    // console.log("Scanned", data);
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
          height: screenHeight - 110,
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
          setEaster(easter + 1);
          switch (easter) {
            case 25:
              showMessage({
                message: "¡Hey! 😳",
                description: "¿Por qué me estás tocando así?",
                type: "info",
              });
              break;
            case 35:
              showMessage({
                message: "¡BASTA! 😠",
                description: "¡Esto es ABUSO!",
                type: "info",
              });
              break;
            case 45:
              showMessage({
                message: "😠😠😠😠",
                description: "¡SE ACABÓ!",
                type: "info",
              });
              setEaster(0);
          }
        }}
        floatingIcon={<Feather name="circle" color={color} size={25} />}
      />

      <InformationModal
        setDialogVisible={setDialogVisible}
        dialogVisible={dialogVisible}
        place={place}
        isTTSEnabled={isTTSEnabled}
      />
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

function StackNavigator() {
  return (
    <>
      <Header
        centerComponent={{
          text: "WayNené - Escáner Turístico",
          style: { fontWeight: "bold", fontSize: 15, color: "#0490CB" },
        }}
        backgroundColor={"#F0F0F0"}
      />

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
    </>
  );
}

export default StackNavigator;
