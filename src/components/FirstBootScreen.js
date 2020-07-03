import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-community/async-storage";

const FirstBootScreen = ({ isFirstBoot, setFirstBoot }) => {
  const [step, setStep] = useState(0);

  const stepsArray = [
    "Imagina que estás dando un paseo por Mérida, y de repente te encuentras un lugar que te asombra pero no sabes nada de él. La curiosidad te gana pero no tienes un guia que te diga la respuesta...",
    "Entonces recuerdas que tienes instalada tu aplicacion de Waynené para poder explorar los puntos más icónicos de todo Mérida",
    "Al ingresar te das cuenta que cuenta solamente con tres botones",
    "Este boton al presionarlo podras observar los lugares que haz visitado",
    "Este sirve para escanear el código QR",
    "Y este boton sirve para ver las configuraciones que tienes disponible",
    "Ahora que ya eres un experto en la aplicación, solo indica el idioma en el que quieres tu aplicación, ¡y listo, A explorar todo Mérida con Waynené!",
  ];

  const handleFirstBoot = async () => {
    try {
      await AsyncStorage.setItem("isFirstBoot", JSON.stringify(false));
      console.log("Set firstBoot value to false");
    } catch (e) {
      console.log("Something happened on FirstBootScreen.js", e);
    }
  };

  return (
    <Modal
      visible={isFirstBoot}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View style={styles.primerPaso}>
        <View>
          <Text style={styles.textoComencemos}>{stepsArray[step]}</Text>
          {/* <Image
            source={require(this.state.imagenPasoActual)}
            style={{
              maxWidth: 350,
              maxHeight: 280,
              alignSelf: "center",
              borderRadius: 20,
            }}
          ></Image> */}
          {step == 7 ? (
            <RNPickerSelect
              onValueChange={(idioma) => {
                console.log(idioma);
                setFirstBoot(false);
                handleFirstBoot();
              }}
              items={[
                { label: "Español", value: "spanish" },
                { label: "English", value: "english" },
              ]}
              style={styles.select}
            />
          ) : (
            <TouchableOpacity
              onPress={() => {
                setStep(step + 1);
                // console.log(step, stepsArray[step]);
              }}
              title="Continuar"
              style={styles.botonComencemos}
            >
              <Text>Continuar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textoComencemos: {
    fontSize: 25,
    fontStyle: "italic",
    margin: 30,
    padding: 10,
    textAlign: "center",
  },
  containerComencemos: {
    width: 400,
    height: 400,
    backgroundColor: "rgba(0,146,204,.5)",
    borderRadius: 30,
  },
  botonComencemos: {
    alignSelf: "center",
    backgroundColor: "rgb(116, 186, 214)",
    padding: 10,
    margin: 30,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  fondo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  primerPaso: {
    width: 500,
    height: 750,
    backgroundColor: "rgba(0,146,204,.5)",
    borderRadius: 30,
  },
  select: {
    borderColor: "black",
  },
});

export default FirstBootScreen;
