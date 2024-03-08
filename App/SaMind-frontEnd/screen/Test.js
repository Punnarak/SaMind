import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
// import axios from "./axios.js";
import { axios, axiospython } from "./axios.js";

export default function Notification({ route }) {
  const { patientId } = route.params || {};
  const [disabled, setDisabled] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    console.log("Test Screen", patientId);
    const onFocus = navigation.addListener("focus", () => {
      axios
      .post("/refreshToken")
      .then((response) => {
        console.log("refresh Token success", response.data);
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
      console.log("Screen is focused");
    });
    return onFocus
  }, []);
  const param = {
    patient_id: patientId,
  };
  axios
    .post("/assignment_status_wait", param)
    .then((response) => {
      if (response.data.length != 0) {
        console.log("in");
        setDisabled(false);
      } else {
        setDisabled(true);
      }
      console.log(response.data, response.data.length);
    })
    .catch((error) => {
      console.error("Axios error:", error);
    });
  return (
    // <View style={styles.container1}>
    <ImageBackground
      source={require("../assets/Game.png")}
      style={{
        alignItems: "center",
        flex: 1,
        zIndex: 2,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          // alignItems: "center",
          // marginTop: "15%",
          marginTop: 58.5,
        }}
      >
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color="#3987FD"
          style={{
            // position: "absolute",
            marginRight: "80%",
            // marginTop: "20%",
          }}
          onPress={() => navigation.goBack()}
        />
      </View>
      <Text style={styles.header}>Test</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      ></View>

      <View style={styles.container2}>
        <View style={styles.container3}>
          <TouchableOpacity
            style={styles.box}
            onPress={() =>
              navigation.navigate("Generaltestscreen", { patientId })
            }
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#569AFF",
                fontStyle: "italic",
              }}
            >
              General Test
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={disabled ? styles.disabledindibox : styles.indibox}
            disabled={disabled}
            onPress={() =>
              navigation.navigate("IndividualTestListScreen", { patientId })
            }
          >
            <Text
              style={
                disabled
                  ? {
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "rgba(0,194,54, 0.2)",
                      fontStyle: "italic",
                    }
                  : {
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#00C236",
                      fontStyle: "italic",
                    }
              }
            >
              Individual Test
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.undertag}>
          <Feather
            name="bell"
            style={styles.picul}
            size={25}
            color="#222222"
            onPress={() => navigation.navigate("NotiScreen", { patientId })}
          />
          <Feather
            name="smile"
            style={styles.picur}
            size={25}
            color="#222222"
            onPress={() => navigation.navigate("Avatarscreen")}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: "flex-end",
    // backgroundColor: "#BED8FF",
    alignItems: "center",
    // fontFamily: "poppins-bold",
  },
  container2: {
    marginTop: "30%",
    backgroundColor: "white",
    alignItems: "center",
    width: "100%",
    height: "77%",
    paddingTop: 25,
    flex: 1,
    paddingHorizontal: 30,
    borderRadius: 25,
    zIndex: 0,
  },
  container3: {
    backgroundColor: "white",
    alignItems: "center",
    width: "100%",
    height: "77%",
    paddingTop: 25,
    flex: 1,
    zIndex: 0,
  },
  box: {
    borderWidth: 5,
    borderColor: "#569AFF",
    borderRadius: 8,
    marginTop: "5%",
    width: "100%",
    paddingHorizontal: "3%",
    paddingVertical: "10%",
  },
  indibox: {
    borderWidth: 5,
    borderColor: "#00C236",
    borderRadius: 8,
    marginTop: "5%",
    width: "100%",
    paddingHorizontal: "3%",
    paddingVertical: "10%",
  },
  disabledindibox: {
    borderWidth: 5,
    borderColor: "rgba(0,194,54, 0.1)",
    borderRadius: 8,
    marginTop: "5%",
    width: "100%",
    paddingHorizontal: "3%",
    paddingVertical: "10%",
  },

  header: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#25271C",
    // marginTop: "-7%",
    marginTop: -27.5,
  },

  noti: {
    marginTop: "100%",
  },

  undertag: {
    width: "120%",
    height: 69.8,
    marginBottom: 0,
    // paddingHorizontal: 25,
    backgroundColor: "white",
    shadowColor: "rgba(0,0,0, 0.3)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 10,
    // position: "absolute",
  },
  picur: {
    marginLeft: "70%",
  },
  picul: {
    marginLeft: "9%",
  },
});
