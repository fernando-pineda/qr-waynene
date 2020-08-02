import { AsyncStorage } from "react-native";
import { showMessage } from "react-native-flash-message";

export const savePlace = async (place) => {
  try {
    let oldPlacesArray = await AsyncStorage.getItem("PLACES");
    let oldPlacesKeys = [];
    let newPlacesArray = JSON.parse(oldPlacesArray);

    if (!newPlacesArray || newPlacesArray == null) {
      newPlacesArray = [];
    }

    newPlacesArray.map((e) => {
      oldPlacesKeys.push(e.title);
    });
    let match = oldPlacesKeys.includes(place.title);

    if (match) {
      return showMessage({
        message: "¡Este lugar ya se encuentra guardado!",
        type: "info",
      });
    } else {
      // If the place doesn't exist, we push the place (which contains movie data) to the new movies array

      newPlacesArray.push(place);

      // Finally, we convert the new places array to a string, and save

      await AsyncStorage.setItem("PLACES", JSON.stringify(newPlacesArray));

      // console.log(`${place.title} successfully added to the user library`);

      return showMessage({
        message: `Se ha añadido ${place.title} exitosamente a tu biblioteca`,
        type: "info",
      });
    }
  } catch (error) {
    console.log("Something went wrong!", error);
  }
};

export const removePlace = async (place) => {
  try {
    let oldPlacesArray = await AsyncStorage.getItem("PLACES");
    let newPlacesArray = [];
    let newPlacesArrayParsed = JSON.parse(oldPlacesArray);

    newPlacesArrayParsed.map((e) => {
      // Filling the newPlacesArray with the objects who ARE NOT the item to be "removed"
      if (e.title !== place.title) {
        newPlacesArray.push(e);
      }
    });

    // console.log(`Old array of objects count: ${newPlacesArrayParsed.length}, new array of objects count ${newPlacesArray.length}`);

    if (newPlacesArray.length < oldPlacesArray.length) {
      // Finally, we convert the new movies array to a string, and save
      await AsyncStorage.setItem("PLACES", JSON.stringify(newPlacesArray));

      console.log(`${place.title} successfully removed from the library`);

      return showMessage({
        message: `Se ha eliminado ${place.title} de la biblioteca`,
        type: "info",
      });
    }
  } catch (error) {
    console.log("Something went wrong!", error);
  }
};
