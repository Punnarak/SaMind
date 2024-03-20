import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { axios, axiospython } from "./axios.js";
export default function Notification({ route }) {
  const { patientId } = route.params || {};
  const navigation = useNavigation();

  useEffect(() => {
    console.log("General Test Screen", patientId);
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

  return (
    <ImageBackground
      source={require("../assets/Game.png")}
      style={{ alignItems: "center", flex: 1 }}
    >
      <View
        style={{
          flexDirection: "row",
          marginTop: "15%",
        }}
      >
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color="#3987FD"
          style={{
            marginRight: "80%",
          }}
          onPress={() => navigation.goBack()}
        />
      </View>
      <Text style={styles.header}>General Test</Text>

      <View style={styles.container2}>
        <View style={styles.container3}>
          <View style={styles.box}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#569AFF",
                    fontStyle: "italic",
                  }}
                >
                  แบบทดสอบ PHQ9
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: "#569AFF",
                    fontStyle: "italic",
                  }}
                >
                  detail: แบบคัดกรองโรคซึมเศร้าแบบ 9 คำถาม
                </Text>
              </View>
              <Ionicons
                name="chevron-back-outline"
                size={30}
                color="#3987FD"
                style={{
                  position: "absolute",
                  marginLeft: "80%",
                  transform: [{ rotate: "180deg" }],
                }}
                onPress={() =>
                  navigation.navigate("Phq9testscreen", { patientId })
                }
              />
            </View>
          </View>
          <View style={styles.box}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#569AFF",
                    fontStyle: "italic",
                  }}
                >
                  แบบทดสอบ 2Q
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: "#569AFF",
                    fontStyle: "italic",
                  }}
                >
                  detail: แบบคัดกรองโรคซึมเศร้าแบบ 2 คำถาม
                </Text>
              </View>
              <Ionicons
                name="chevron-back-outline"
                size={30}
                color="#3987FD"
                style={{
                  position: "absolute",
                  marginLeft: "80%",
                  transform: [{ rotate: "180deg" }],
                }}
                onPress={() =>
                  navigation.navigate("Q2testscreen", { patientId })
                }
              />
            </View>
          </View>
        </View>
        <View style={styles.undertag}>
          <Feather
            name="bell"
            style={styles.picul}
            size={25}
            color="#222222"
            onPress={() => navigation.goBack()}
          />
          <Feather
            name="smile"
            style={styles.picur}
            size={25}
            color="#222222"
            onPress={() => navigation.navigate("Loginscreen")}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
    paddingTop: 10,
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
  header: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#569AFF",
    marginTop: "-7%",
  },
  undertag: {
    width: "120%",
    height: 69.8,
    marginBottom: 0,
    backgroundColor: "white",
    shadowColor: "rgba(0,0,0, 0.3)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    flexDirection: "row",
    alignItems: "center",
  },
  picur: {
    marginLeft: "70%",
  },
  picul: {
    marginLeft: "9%",
  },
});
