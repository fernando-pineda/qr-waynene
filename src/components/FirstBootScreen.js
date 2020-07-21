// import {
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   Modal,
//   StyleSheet,
// } from "react-native";
// import React, { useState } from "react";
// import RNPickerSelect from "react-native-picker-select";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";

// const FirstBootScreen = ({ isFirstBoot, setFirstBoot }) => {
//   const [step, setStep] = useState(0);

//   const stepsArray = [
//     "Imagina que estás dando un paseo por Mérida, y de repente te encuentras un lugar que te asombra pero no sabes nada de él. La curiosidad te gana pero no tienes un guia que te diga la respuesta...",
//     "Entonces recuerdas que tienes instalada tu aplicacion de Waynené para poder explorar los puntos más icónicos de todo Mérida",
//     "Al ingresar te das cuenta que cuenta solamente con tres botones",
//     "Este boton al presionarlo podras observar los lugares que haz visitado",
//     "Este sirve para escanear el código QR",
//     "Y este boton sirve para ver las configuraciones que tienes disponible",
//     "Ahora que ya eres un experto en la aplicación, solo indica el idioma en el que quieres tu aplicación, ¡y listo, A explorar todo Mérida con Waynené!",
//   ];

//   const handleFirstBoot = async () => {
//     try {
//       await AsyncStorage.setItem("isFirstBoot", JSON.stringify(false));
//       console.log("Set firstBoot value to false");
//     } catch (e) {
//       console.log("Something happened on FirstBootScreen.js", e);
//     }
//   };

//   return (
//     <Modal
//       visible={isFirstBoot}
//       style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
//     >
//       <View style={styles.primerPaso}>
//         <Text style={styles.textoComencemos}>{stepsArray[step]}</Text>
//         {/* <Image
//             source={require(this.state.imagenPasoActual)}
//             style={{
//               maxWidth: 350,
//               maxHeight: 280,
//               alignSelf: "center",
//               borderRadius: 20,
//             }}
//           ></Image> */}
//         {step == 7 ? (
//           <RNPickerSelect
//             onValueChange={(idioma) => {
//               console.log(idioma);
//               setFirstBoot(false);
//               handleFirstBoot();
//             }}
//             items={[
//               { label: "Español", value: "spanish" },
//               { label: "English", value: "english" },
//             ]}
//             style={styles.select}
//           />
//         ) : (
//           <TouchableOpacity
//             onPress={() => {
//               setStep(step + 1);
//               // console.log(step, stepsArray[step]);
//             }}
//             title="Continuar"
//             style={styles.botonComencemos}
//           >
//             <Text>Cuentame más 😯</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   textoComencemos: {
//     fontSize: 25,
//     fontStyle: "italic",
//     margin: 30,
//     padding: 10,
//     textAlign: "center",
//   },
//   botonComencemos: {
//     alignSelf: "center",
//     backgroundColor: "#a6dcef",
//     padding: 10,
//     margin: 30,
//     width: 250,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 30,
//   },
//   fondo: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   primerPaso: {
//     height: hp("100%"),
//     width: wp("100%"),
//     flex: 1,
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F9D423",
//     borderRadius: 5,
//   },
//   select: {
//     borderColor: "black",
//   },
// });

// export default FirstBootScreen;

import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
    <Modal visible={isFirstBoot} style={styles.firstContainer}>
      <ImageBackground
        source={require("../assets/imageBackground.jpg")}
        style={styles.steps}
      >
        <View style={styles.shadow}>
          <View style={styles.divText}>
            <Text style={styles.textoComencemos}>{stepsArray[step]}</Text>
          </View>
          <View style={styles.imageMerida}>
            <Image source={require("../assets/imageMerida.png")}></Image>
          </View>
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
              <Text>Cuentame más 😯</Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  firstContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textoComencemos: {
    fontSize: 18,
    fontStyle: "italic",
    margin: 25,
    padding: 10,
    textAlign: "left",
  },
  botonComencemos: {
    alignSelf: "center",
    backgroundColor: "#a6dcef",
    padding: 10,
    margin: 30,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  fondo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  steps: {
    height: hp("100%"),
    width: wp("100%"),
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 5,
  },
  select: {
    borderColor: "black",
  },
  shadow: {
    height: hp("100%"),
    width: wp("100%"),
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 5,
    backgroundColor: "rgba(224,226,189,.3)",
  },
  divText: {
    backgroundColor: "rgba(240,243,189,.8)",
    borderBottomEndRadius: 400,
    borderTopEndRadius: 400,
  },
  imageMerida: {
    alignSelf: "center",
    padding: 10,
    margin: 30,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
});

export default FirstBootScreen;
